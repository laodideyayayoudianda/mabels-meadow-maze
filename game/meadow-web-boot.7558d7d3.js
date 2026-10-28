/* Applied to a real Creator Web export by finalize-web.cjs. No game UI lives here. */
(function () {
  'use strict';
  var downloadedBytes = 0;
  var settings, generation = 0, phase = 'entry', lastProgress = Date.now(), lastTick = Date.now();
  var progress = 0, failed = false, complete = false, engineStarted = false, engineReady = false;
  var retryHandler, bundleNames, readyWaiters = [], scriptCache = {};
  function ui() { return { panel: document.getElementById('splash'), message: document.getElementById('cocos-message'), retry: document.getElementById('cocos-retry'), bar: document.querySelector('#splash .progress-bar span') }; }
  function stage(name) { phase = name; lastProgress = Date.now(); progress = 0; }
  function fail(error) {
    if (complete || failed) return; failed = true; generation++;
    var u = ui(); u.panel.style.display = 'flex'; u.message.textContent = 'Unable to load. Please retry.'; u.retry.hidden = false;
    console.error('Startup failed at ' + phase, error && error.message || error);
  }
  function update(finish, total) {
    if (failed || complete || !total) return;
    var p = finish / total; if (p > progress) { progress = p; lastProgress = Date.now(); }
    var b = ui().bar; if (b) b.style.width = Math.min(100, p * 100) + '%';
  }
  function watchdog() {
    var now = Date.now(), elapsed = now - lastTick; lastTick = now;
    if (document.hidden) lastProgress += elapsed;
    else if (!failed && !complete && now - lastProgress >= 30000) fail(Error('No loading progress'));
  }
  function frame() { watchdog(); requestAnimationFrame(frame); }
  requestAnimationFrame(frame); setInterval(watchdog, 250);
  document.addEventListener('visibilitychange', function () { lastTick = Date.now(); lastProgress = Date.now(); });
  window.MeadowStartup = {
    stage: stage, progress: update, fail: fail,
    lastActivity: function() { return lastProgress; },
    artProgress: function(done, total) { if (failed || complete) return; lastProgress = Date.now(); ui().message.textContent = 'Loading artwork... ' + done + ' / ' + total; ui().bar.style.width = (done / total * 100) + '%'; },
    onRetry: function (f) { retryHandler = f; },
    ready: function () { if (failed || complete) return; complete = true; ui().panel.style.display = 'none'; },
    state: function () { return { generation: generation, phase: phase, failed: failed, ready: complete }; }
  };
  window.addEventListener('error', function (e) { if (!complete) fail(e.error || e.message); });
  window.addEventListener('unhandledrejection', function (e) { if (!complete) fail(e.reason); });
  function loadScript(path, token) {
    if (scriptCache[path]) return Promise.resolve();
    return new Promise(function (resolve, reject) {
      var s = document.createElement('script'); s.src = path + (path.indexOf('?') < 0 ? '?' : '&') + 'bootAttempt=' + token;
      s.onload = function () { s.remove(); scriptCache[path] = true; resolve(); };
      s.onerror = function () { s.remove(); reject(Error('Required script unavailable')); };
      document.body.appendChild(s);
    });
  }
  function loadBundle(name, token) {
    return new Promise(function (resolve, reject) {
      var cached = cc.assetManager.getBundle(name); if (cached) { resolve(cached); return; }
      cc.assetManager.loadBundle(name + '?meadowAttempt=' + token, { version: settings.bundleVers[name], reload: true, maxRetryCount: 0 }, function (e, b) { e ? reject(e) : resolve(b); });
    });
  }
  function scene(token) {
    stage('scene');
    var bundle = cc.assetManager.bundles.find(function (b) { return b.getSceneInfo(settings.launchScene); });
    if (!bundle) { fail(Error('Launch scene missing')); return; }
    bundle.loadScene(settings.launchScene, { reload: true }, update, function (e, asset) {
      if (token !== generation || failed) return;
      if (e) { fail(e); return; }
      stage('home_resources'); cc.director.runSceneImmediate(asset);
      document.getElementById('GameCanvas').style.visibility = '';
    });
  }
  function run(token) {
    if (engineReady) { scene(token); return; }
    readyWaiters = [function () { if (!failed) scene(generation); }];
    if (engineStarted) return;
    engineStarted = true; stage('engine');
    cc.game.run({ id: 'GameCanvas', debugMode: cc.debug.DebugMode.ERROR, showFPS: false, frameRate: 60, groupList: settings.groupList, collisionMatrix: settings.collisionMatrix }, function () {
      engineReady = true; cc.view.enableRetina(true); cc.view.resizeWithBrowserSize(true);
      if (settings.orientation === 'portrait') cc.view.setOrientation(cc.macro.ORIENTATION_PORTRAIT);
      var callbacks = readyWaiters.slice(); readyWaiters = []; callbacks.forEach(function (f) { f(); });
    });
  }
  // Keep original PNG pixels; add byte progress and bounded retries through Cocos.
  function installImageTransport() {
    cc.assetManager.downloader.maxConcurrency = 4;
    cc.assetManager.downloader.maxRequestsPerFrame = 4;
    cc.assetManager.downloader.maxRetryCount = 1;
    cc.assetManager.downloader.register('.png', function(url, options, done) {
      var xhr = new XMLHttpRequest(), finished = false, objectURL = null, image = null, idleTimer;
      var lastBytes = 0;
      function armTimeout(ms) { clearTimeout(idleTimer); idleTimer = setTimeout(function() { finish(new Error('Artwork download stalled')); xhr.abort(); }, ms); }
      function finish(error, value) {
        if (finished) return; finished = true;
        clearTimeout(idleTimer);
        if (objectURL) URL.revokeObjectURL(objectURL);
        if (image) { image.onload = null; image.onerror = null; }
        done(error, value);
      }
      xhr.open('GET', url, true); xhr.responseType = 'blob'; xhr.timeout = 0;
      xhr.onprogress = function(event) {
        if (finished) return;
        if (event.loaded > lastBytes) {
          downloadedBytes += event.loaded - lastBytes; lastBytes = event.loaded;
          armTimeout(120000);
          lastProgress = Date.now();
          if (!failed && !complete) {
            ui().message.textContent = 'Loading artwork... ' + (downloadedBytes / 1048576).toFixed(1) + ' MB';
          }
        }
      };
      xhr.onerror = function() { finish(new Error('Artwork download failed')); };
      xhr.ontimeout = function() { finish(new Error('Artwork download timed out')); };
      xhr.onabort = function() { finish(new Error('Artwork download cancelled')); };
      xhr.onload = function() {
        if (finished) return;
        if (xhr.status < 200 || xhr.status >= 300) { finish(new Error('Artwork HTTP ' + xhr.status)); return; }
        armTimeout(30000);
        image = new Image(); objectURL = URL.createObjectURL(xhr.response);
        image.onload = function() { lastProgress = Date.now(); finish(null, image); };
        image.onerror = function() { finish(new Error('Artwork could not decode')); };
        image.src = objectURL;
      };
      armTimeout(120000); xhr.send();
    });
  }

  function attempt() {
    var token = ++generation, u = ui(); failed = false; complete = false; progress = 0;
    u.panel.style.display = 'flex'; u.retry.hidden = true; u.message.textContent = 'Loading...'; stage('scripts');
    var files = window.MeadowExportFiles;
    loadScript(files.settings, token).then(function () {
      if (token !== generation) return;
      settings = settings || window._CCSettings;
      return loadScript(files.engine, token);
    }).then(function () {
      if (token !== generation) return;
      return files.physics ? loadScript(files.physics, token) : null;
    }).then(function () {
      if (token !== generation) return;
      cc.assetManager.init({ bundleVers: settings.bundleVers, remoteBundles: settings.remoteBundles, server: settings.server });
      installImageTransport();
      stage('bundles'); bundleNames = ['internal'].concat(settings.hasResourcesBundle ? ['resources'] : []);
      var done = 0;
      return Promise.all(bundleNames.map(function (n) { return loadBundle(n, token).then(function () { if (token === generation) update(++done, bundleNames.length + 1); }); })).then(function () { return loadBundle('main', token); });
    }).then(function () { if (token === generation && !failed) run(token); }).catch(function (e) { if (token === generation) fail(e); });
  }
  ui().retry.onclick = function () {
    // If the active scene owns only a failed resource task, retry that task rather than rerun the engine.
    if (retryHandler && engineReady) { failed = false; complete = false; generation++; stage('home_resources'); ui().retry.hidden = true; ui().message.textContent = 'Loading...'; retryHandler(); }
    else attempt();
  };
  attempt();
}());
