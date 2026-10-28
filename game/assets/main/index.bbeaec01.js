window.__require = function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var b = o.split("/");
        b = b[b.length - 1];
        if (!t[b]) {
          var a = "function" == typeof __require && __require;
          if (!u && a) return a(b, !0);
          if (i) return i(b, !0);
          throw new Error("Cannot find module '" + o + "'");
        }
        o = b;
      }
      var f = n[o] = {
        exports: {}
      };
      t[o][0].call(f.exports, function(e) {
        var n = t[o][1][e];
        return s(n || e);
      }, f, f.exports, e, t, n, r);
    }
    return n[o].exports;
  }
  var i = "function" == typeof __require && __require;
  for (var o = 0; o < r.length; o++) s(r[o]);
  return s;
}({
  AdRewards: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "386ce/Gf5ONTIsKB94M6hYi", "AdRewards");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.curvePrices = exports.adGateFinish = exports.adGateStart = exports.createAdGate = exports.claimGift = exports.onRoundEnd = exports.giftAvailable = exports.createGift = exports.giftReward = exports.nextPrice = exports.resultReward = exports.bonusPct = exports.round5 = exports.GIFT_PER_10_LEVELS = exports.GIFT_SHARE = exports.FIRST_PRICE_R = exports.PRICE_STEPS = exports.BONUS_LEVEL_MULTIPLIER = exports.RESULT_AD_MULTIPLIER = exports.AD_REWARDS_VERSION = void 0;
    exports.AD_REWARDS_VERSION = 2;
    exports.RESULT_AD_MULTIPLIER = 2;
    exports.BONUS_LEVEL_MULTIPLIER = 3;
    exports.PRICE_STEPS = [ 1, 4, 10, 20 ];
    exports.FIRST_PRICE_R = 2;
    exports.GIFT_SHARE = .1;
    exports.GIFT_PER_10_LEVELS = .5;
    function isNum(v) {
      return "number" === typeof v && isFinite(v);
    }
    function round5(x) {
      return Math.max(5, 5 * Math.round(x / 5));
    }
    exports.round5 = round5;
    function itemsOf(table) {
      return table && Array.isArray(table.items) ? table.items : Array.isArray(table) ? table : [];
    }
    function bonusPct(table, equippedIds) {
      var on = {};
      (equippedIds || []).forEach(function(id) {
        on[id] = true;
      });
      var pct = 0;
      var seen = {};
      itemsOf(table).forEach(function(it) {
        if (!on[it.id] || seen[it.group] || !it.bonus || "coins" !== it.bonus.type || !isNum(it.bonus.pct)) return;
        seen[it.group] = true;
        pct += it.bonus.pct;
      });
      return pct;
    }
    exports.bonusPct = bonusPct;
    function resultReward(levelCoins, pct) {
      var base = Math.max(0, Math.round(levelCoins || 0));
      var total = Math.round(base * (1 + (pct || 0) / 100));
      return {
        base: base,
        skin_bonus: total - base,
        total: total,
        doubled: total * exports.RESULT_AD_MULTIPLIER
      };
    }
    exports.resultReward = resultReward;
    function nextPrice(table, ownedIds) {
      var own = {};
      (ownedIds || []).forEach(function(id) {
        own[id] = true;
      });
      var priced = itemsOf(table).filter(function(it) {
        return "coins" === it.unlock && isNum(it.coins) && it.coins > 0;
      });
      if (!priced.length) return 0;
      var left = priced.filter(function(it) {
        return !own[it.id];
      }).map(function(it) {
        return it.coins;
      });
      return left.length ? Math.min.apply(null, left) : Math.max.apply(null, priced.map(function(it) {
        return it.coins;
      }));
    }
    exports.nextPrice = nextPrice;
    function giftReward(R, table, ownedIds, cleared) {
      var p = nextPrice(table, ownedIds);
      return round5(Math.max(R, exports.GIFT_SHARE * p) + exports.GIFT_PER_10_LEVELS * R * Math.floor(Math.max(0, cleared || 0) / 10));
    }
    exports.giftReward = giftReward;
    function createGift() {
      return {
        charges: 1
      };
    }
    exports.createGift = createGift;
    function giftAvailable(state) {
      return !!state && state.charges > 0;
    }
    exports.giftAvailable = giftAvailable;
    function onRoundEnd(state) {
      return {
        charges: 1
      };
    }
    exports.onRoundEnd = onRoundEnd;
    function claimGift(state, R, table, ownedIds, cleared) {
      if (!giftAvailable(state)) return {
        coins: 0,
        state: {
          charges: 0
        }
      };
      return {
        coins: giftReward(R, table, ownedIds, cleared),
        state: {
          charges: 0
        }
      };
    }
    exports.claimGift = claimGift;
    function createAdGate() {
      return {
        busy: false,
        paid: 0,
        sequence: 0,
        active: null
      };
    }
    exports.createAdGate = createAdGate;
    function adGateStart(g) {
      if (g.busy) return false;
      var token = Object.freeze({
        request: ++g.sequence
      });
      g.busy = true;
      g.active = token;
      return token;
    }
    exports.adGateStart = adGateStart;
    function adGateFinish(g, token, completed) {
      if (!g.busy || !token || g.active !== token) return false;
      g.active = null;
      g.busy = false;
      if (true !== completed) return false;
      g.paid += 1;
      return true;
    }
    exports.adGateFinish = adGateFinish;
    function curvePrices(R, rarities) {
      var rank = {
        common: 0,
        rare: 1,
        epic: 2,
        legendary: 3
      };
      var out = [];
      rarities.forEach(function(r, i) {
        out.push(0 === i ? exports.FIRST_PRICE_R * R : out[i - 1] + exports.PRICE_STEPS[rank[r]] * R);
      });
      return out;
    }
    exports.curvePrices = curvePrices;
    cc._RF.pop();
  }, {} ],
  GameAudioConfig: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "e1647a9trlMiaBELoCU17gd", "GameAudioConfig");
    "use strict";
    module.exports = {
      BGM: {
        bgm_menu: {
          path: "audio/bgm/bgm_menu",
          volume: .85
        },
        bgm_game: {
          path: "audio/bgm/bgm_game",
          volume: .72
        },
        jingle_win: {
          path: "audio/bgm/jingle_win",
          volume: .9
        },
        jingle_lose: {
          path: "audio/bgm/jingle_lose",
          volume: .7
        }
      },
      SFX: {
        sfx_ui_click: {
          path: "audio/sfx/sfx_ui_click",
          volume: .65
        },
        sfx_ui_back: {
          path: "audio/sfx/sfx_ui_back",
          volume: .6
        },
        sfx_ui_popup_open: {
          path: "audio/sfx/sfx_ui_popup_open",
          volume: .6
        },
        sfx_ui_popup_close: {
          path: "audio/sfx/sfx_ui_popup_close",
          volume: .55
        },
        sfx_ui_toggle: {
          path: "audio/sfx/sfx_ui_toggle",
          volume: .6
        },
        sfx_invalid: {
          path: "audio/sfx/sfx_invalid",
          volume: .5
        },
        sfx_tile_slide: {
          path: "audio/sfx/sfx_tile_slide",
          variants: 3,
          volume: .65
        },
        sfx_tile_snap: {
          path: "audio/sfx/sfx_tile_snap",
          variants: 3,
          volume: .65
        },
        sfx_water_flow: {
          path: "audio/sfx/sfx_water_flow",
          volume: .55
        },
        sfx_deflector_bounce: {
          path: "audio/sfx/sfx_deflector_bounce",
          volume: .45
        },
        sfx_sluice_open: {
          path: "audio/sfx/sfx_sluice_open",
          volume: .65
        },
        sfx_combo_1: {
          path: "audio/sfx/sfx_combo_1",
          volume: .65
        },
        sfx_combo_2: {
          path: "audio/sfx/sfx_combo_2",
          volume: .65
        },
        sfx_combo_3: {
          path: "audio/sfx/sfx_combo_3",
          volume: .65
        },
        sfx_combo_4: {
          path: "audio/sfx/sfx_combo_4",
          volume: .65
        },
        sfx_combo_5: {
          path: "audio/sfx/sfx_combo_5",
          volume: .65
        },
        sfx_coin: {
          path: "audio/sfx/sfx_coin",
          variants: 3,
          volume: .65
        },
        sfx_star_1: {
          path: "audio/sfx/sfx_star_1",
          volume: .7
        },
        sfx_star_2: {
          path: "audio/sfx/sfx_star_2",
          volume: .7
        },
        sfx_star_3: {
          path: "audio/sfx/sfx_star_3",
          volume: .7
        },
        sfx_reward: {
          path: "audio/sfx/sfx_reward",
          volume: .7
        },
        sfx_level_start: {
          path: "audio/sfx/sfx_level_start",
          volume: .5
        }
      }
    };
    cc._RF.pop();
  }, {} ],
  GameAudioManager: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f9184Rh/xlWOq/+a4rmjPrv", "GameAudioManager");
    "use strict";
    var CONFIG = require("GameAudioConfig");
    var BGM = CONFIG.BGM || {};
    var SFX = CONFIG.SFX || {};
    var BGM_BASE = .5;
    var SFX_BASE = .8;
    var JINGLE_BASE = .8;
    var SFX_MIN_INTERVAL = 50;
    var SFX_MAX_CONCURRENT = 6;
    var DUCK_LEVEL = .25;
    var FALLBACK = {
      sfx_ui_back: "sfx_ui_click",
      sfx_ui_toggle: "sfx_ui_click",
      sfx_ui_locked: "sfx_invalid",
      sfx_ui_popup_close: "sfx_ui_popup_open",
      sfx_ui_popup_open: "sfx_ui_click",
      sfx_swap: "sfx_select",
      sfx_hint: "sfx_reward",
      sfx_shuffle: "sfx_swap",
      sfx_booster: "sfx_reward",
      sfx_clear_big: "sfx_match",
      sfx_reward_ad: "sfx_reward",
      sfx_unlock: "sfx_reward",
      sfx_time_up: "sfx_invalid",
      sfx_heart_lose: "sfx_invalid",
      sfx_level_start: "sfx_ui_popup_open",
      sfx_spin: "sfx_coin",
      sfx_select: "sfx_ui_click",
      sfx_place: "sfx_select"
    };
    function clampLevel(v, def) {
      var n = Math.round(Number(v));
      return isFinite(n) ? Math.max(0, Math.min(10, n)) : def;
    }
    var GameAudioManager = cc.Class({
      extends: cc.Component,
      statics: {
        instance: null,
        init: function init() {
          if (GameAudioManager.instance) return GameAudioManager.instance;
          var node = new cc.Node("GameAudioManager");
          cc.director.getScene().addChild(node);
          return node.addComponent(GameAudioManager);
        }
      },
      onLoad: function onLoad() {
        if (GameAudioManager.instance && GameAudioManager.instance !== this) {
          this.node.destroy();
          return;
        }
        GameAudioManager.instance = this;
        cc.game.addPersistRootNode(this.node);
        this._clips = {};
        this._lastPlay = {};
        this._lastVariant = {};
        this._activeSfx = 0;
        this._transients = [];
        this._musicEpoch = 0;
        this._jingleEpoch = 0;
        this._sfxEpoch = 0;
        this._alive = true;
        this._settingsSaved = true;
        this._loadedBgm = "";
        this._currentBgm = "";
        this._pendingBgm = "";
        this._bgmAudioId = -1;
        this._bgmVolume = 0;
        this._fadeTask = null;
        this._pauseReasons = {};
        this._settings = {
          musicOn: true,
          sfxOn: true,
          musicLevel: 10,
          sfxLevel: 10,
          lastMusicLevel: 10,
          lastSFXLevel: 10
        };
        this._loadSettings();
        this._unlocked = !cc.sys.isBrowser;
        cc.game.on(cc.game.EVENT_HIDE, this._onHide, this);
        cc.game.on(cc.game.EVENT_SHOW, this._onShow, this);
        cc.director.on(cc.Director.EVENT_AFTER_SCENE_LAUNCH, this._hookFirstTouch, this);
        this._hookFirstTouch();
      },
      onDestroy: function onDestroy() {
        if (!this._alive) return;
        this._alive = false;
        this._musicEpoch++;
        this._jingleEpoch++;
        this._sfxEpoch++;
        this._stopFade();
        this._stopBgmAudio();
        this._stopTransients();
        GameAudioManager.instance === this && (GameAudioManager.instance = null);
        cc.game.off(cc.game.EVENT_HIDE, this._onHide, this);
        cc.game.off(cc.game.EVENT_SHOW, this._onShow, this);
        cc.director.off(cc.Director.EVENT_AFTER_SCENE_LAUNCH, this._hookFirstTouch, this);
      },
      _hookFirstTouch: function _hookFirstTouch() {
        if (this._unlocked) return;
        var canvas = cc.Canvas.instance;
        canvas && canvas.node && canvas.node.once(cc.Node.EventType.TOUCH_START, this.unlock, this);
      },
      unlock: function unlock() {
        if (this._unlocked) return;
        this._unlocked = true;
        if (this._pendingBgm) {
          var id = this._pendingBgm;
          this._pendingBgm = "";
          this.playBGM(id);
        }
      },
      _loadSettings: function _loadSettings() {},
      _saveSettings: function _saveSettings() {
        this._settingsSaved = true;
        return true;
      },
      isSettingsSaved: function isSettingsSaved() {
        return this._settingsSaved;
      },
      retrySaveSettings: function retrySaveSettings() {
        return this._saveSettings();
      },
      isMusicOn: function isMusicOn() {
        return this._settings.musicOn;
      },
      isSFXOn: function isSFXOn() {
        return this._settings.sfxOn;
      },
      getMusicLevel: function getMusicLevel() {
        return this._settings.musicLevel;
      },
      getSFXLevel: function getSFXLevel() {
        return this._settings.sfxLevel;
      },
      setMusic: function setMusic(on) {
        this._settings.musicOn = !!on;
        this._settings.musicLevel = on ? this._settings.lastMusicLevel : 0;
        this._applyMusicSettings();
      },
      setSFX: function setSFX(on) {
        this._settings.sfxOn = !!on;
        this._settings.sfxLevel = on ? this._settings.lastSFXLevel : 0;
        this._applySFXSettings();
      },
      setMusicLevel: function setMusicLevel(level) {
        var value = clampLevel(level, this._settings.musicLevel);
        this._settings.musicLevel = value;
        this._settings.musicOn = value > 0;
        value > 0 && (this._settings.lastMusicLevel = value);
        this._applyMusicSettings();
      },
      setSFXLevel: function setSFXLevel(level) {
        var value = clampLevel(level, this._settings.sfxLevel);
        this._settings.sfxLevel = value;
        this._settings.sfxOn = value > 0;
        value > 0 && (this._settings.lastSFXLevel = value);
        this._applySFXSettings();
      },
      increaseMusicLevel: function increaseMusicLevel() {
        this.setMusicLevel(this.getMusicLevel() + 1);
      },
      decreaseMusicLevel: function decreaseMusicLevel() {
        this.setMusicLevel(this.getMusicLevel() - 1);
      },
      increaseSFXLevel: function increaseSFXLevel() {
        this.setSFXLevel(this.getSFXLevel() + 1);
      },
      decreaseSFXLevel: function decreaseSFXLevel() {
        this.setSFXLevel(this.getSFXLevel() - 1);
      },
      _applyMusicSettings: function _applyMusicSettings() {
        this._saveSettings();
        this._musicEpoch++;
        this._stopFade();
        this._refreshTransients("music");
        if (!this._musicScale()) {
          this._jingleEpoch++;
          this._setBgmVolume(0);
          this._stopBgmAudio();
          return;
        }
        if (this._paused()) {
          this._currentBgm = this._currentBgm || this._pendingBgm || "bgm_menu";
          return;
        }
        this._bgmPlaying() && this._loadedBgm === this._currentBgm ? this._setBgmVolume(this._bgmTarget(BGM[this._currentBgm])) : this.playBGM(this._currentBgm || this._pendingBgm || "bgm_menu");
      },
      _applySFXSettings: function _applySFXSettings() {
        this._saveSettings();
        this._sfxEpoch++;
        this._refreshTransients("sfx");
      },
      _musicScale: function _musicScale() {
        return this._settings.musicOn ? this._settings.musicLevel / 10 : 0;
      },
      _sfxScale: function _sfxScale() {
        return this._settings.sfxOn ? this._settings.sfxLevel / 10 : 0;
      },
      _paused: function _paused() {
        return Object.keys(this._pauseReasons).length > 0;
      },
      _pathsOf: function _pathsOf(e) {
        if (e.variants && e.variants > 1) {
          var list = [];
          for (var i = 1; i <= e.variants; i++) list.push(e.path + "_" + i);
          return list;
        }
        return [ e.path ];
      },
      preload: function preload(onDone) {
        var self = this, paths = [];
        Object.keys(SFX).forEach(function(k) {
          paths = paths.concat(self._pathsOf(SFX[k]));
        });
        BGM.bgm_menu && paths.push(BGM.bgm_menu.path);
        if (!paths.length) {
          onDone && onDone();
          return;
        }
        var left = paths.length;
        paths.forEach(function(path) {
          self._getClip(path, function() {
            left--;
            !left && onDone && onDone();
          });
        });
      },
      _getClip: function _getClip(path, cb) {
        var self = this;
        if (this._clips[path]) {
          cb(this._clips[path]);
          return;
        }
        cc.resources.load(path, cc.AudioClip, function(err, clip) {
          if (err || !clip) {
            cc.warn("[Audio] \u52a0\u8f7d\u5931\u8d25", path);
            cb(null);
            return;
          }
          self._clips[path] = clip;
          cb(clip);
        });
      },
      _pickVariant: function _pickVariant(id, e) {
        if (!e.variants || e.variants <= 1) return e.path;
        var i = 1 + Math.floor(Math.random() * e.variants);
        i === this._lastVariant[id] && (i = i % e.variants + 1);
        this._lastVariant[id] = i;
        return e.path + "_" + i;
      },
      _setBgmVolume: function _setBgmVolume(v) {
        v = this._musicScale() ? v : 0;
        this._bgmVolume = v;
        this._bgmAudioId >= 0 && cc.audioEngine.setVolume(this._bgmAudioId, v);
      },
      _stopBgmAudio: function _stopBgmAudio() {
        this._bgmAudioId >= 0 && cc.audioEngine.stop(this._bgmAudioId);
        this._bgmAudioId = -1;
      },
      _bgmPlaying: function _bgmPlaying() {
        return this._bgmAudioId >= 0 && cc.audioEngine.getState(this._bgmAudioId) === cc.audioEngine.AudioState.PLAYING;
      },
      _bgmTarget: function _bgmTarget(e) {
        return BGM_BASE * this._musicScale() * (e && e.volume || 1);
      },
      _stopFade: function _stopFade() {
        if (this._fadeTask) {
          this.unschedule(this._fadeTask);
          this._fadeTask = null;
        }
      },
      _fadeTo: function _fadeTo(to, duration, done) {
        var self = this;
        this._stopFade();
        var from = this._bgmVolume, t = 0;
        if (duration <= 0) {
          this._setBgmVolume(to);
          done && done();
          return;
        }
        this._fadeTask = function(dt) {
          t += dt;
          var k = Math.min(t / duration, 1);
          self._setBgmVolume(from + (to - from) * k);
          if (k >= 1) {
            self._stopFade();
            done && done();
          }
        };
        this.schedule(this._fadeTask, 0);
      },
      playBGM: function playBGM(id, fadeIn) {
        var self = this, e = BGM[id];
        void 0 === fadeIn && (fadeIn = .5);
        if (!e) {
          cc.warn("[Audio] \u672a\u77e5 BGM", id);
          return;
        }
        if (!this._unlocked) {
          this._pendingBgm = id;
          return;
        }
        var ticket = ++this._musicEpoch;
        this._jingleEpoch++;
        if (!this._musicScale() || this._paused()) {
          this._currentBgm = id;
          return;
        }
        if (this._currentBgm === id && this._loadedBgm === id && this._bgmPlaying()) {
          this._fadeTo(this._bgmTarget(e), .3);
          return;
        }
        this._currentBgm = id;
        if (!this._settings.musicOn || this._paused()) return;
        var start = function start() {
          self._getClip(e.path, function(clip) {
            if (!clip || !self._alive || ticket !== self._musicEpoch || self._currentBgm !== id || !self._musicScale() || self._paused()) return;
            self._stopBgmAudio();
            self._loadedBgm = id;
            self._bgmVolume = 0;
            self._bgmAudioId = cc.audioEngine.play(clip, true, 0);
            self._fadeTo(self._bgmTarget(e), fadeIn);
          });
        };
        this._bgmPlaying() ? this._fadeTo(0, .3, start) : start();
      },
      playLevelBGM: function playLevelBGM(level) {
        var id = BGM.bgm_game_2 && level % 2 === 0 ? "bgm_game_2" : "bgm_game";
        this.playBGM(BGM[id] ? id : "bgm_menu");
      },
      stopBGM: function stopBGM(fadeOut) {
        var self = this;
        this._musicEpoch++;
        this._jingleEpoch++;
        this._currentBgm = "";
        this._pendingBgm = "";
        this._fadeTo(0, void 0 === fadeOut ? .3 : fadeOut, function() {
          self._stopBgmAudio();
        });
      },
      playJingle: function playJingle(id) {
        var self = this, e = BGM[id];
        if (!e) {
          cc.warn("[Audio] \u672a\u77e5 jingle", id);
          return;
        }
        if (!this._musicScale() || this._paused() || !this._unlocked) return;
        var ticket = ++this._musicEpoch, jingleTicket = ++this._jingleEpoch;
        this._fadeTo(this._bgmTarget(BGM[this._currentBgm]) * DUCK_LEVEL, .15);
        this._getClip(e.path, function(clip) {
          if (!clip || !self._alive || ticket !== self._musicEpoch || !self._musicScale() || self._paused()) return;
          self._playTransient(clip, "music", JINGLE_BASE * (e.volume || 1));
          self.scheduleOnce(function() {
            if (!self._alive || jingleTicket !== self._jingleEpoch || !self._musicScale() || self._paused()) return;
            self._fadeTo(0, .4, function() {
              self._stopBgmAudio();
              self._currentBgm = "";
            });
          }, .6 * (clip.duration || 1));
        });
      },
      _removeTransient: function _removeTransient(entry) {
        var index = this._transients.indexOf(entry);
        if (index < 0) return;
        cc.audioEngine.setVolume(entry.id, 0);
        cc.audioEngine.stop(entry.id);
        this.unschedule(entry.cleanup);
        this._transients.splice(index, 1);
        "sfx" === entry.kind && this._activeSfx--;
      },
      _stopTransients: function _stopTransients(kind) {
        var self = this;
        this._transients.slice().forEach(function(entry) {
          kind && entry.kind !== kind || self._removeTransient(entry);
        });
      },
      _refreshTransients: function _refreshTransients(kind) {
        var scale = "music" === kind ? this._musicScale() : this._sfxScale();
        if (!scale) {
          this._stopTransients(kind);
          return;
        }
        this._transients.forEach(function(entry) {
          entry.kind === kind && cc.audioEngine.setVolume(entry.id, entry.gain * scale);
        });
      },
      _playTransient: function _playTransient(clip, kind, gain) {
        var self = this, scale = "music" === kind ? this._musicScale() : this._sfxScale();
        if (!this._alive || !scale || this._paused()) return;
        var entry = {
          id: cc.audioEngine.play(clip, false, gain * scale),
          kind: kind,
          gain: gain
        };
        entry.cleanup = function() {
          self._removeTransient(entry);
        };
        this._transients.push(entry);
        "sfx" === kind && this._activeSfx++;
        this.scheduleOnce(entry.cleanup, Math.max(clip.duration || .1, .1));
      },
      playSFX: function playSFX(id, volumeScale) {
        var self = this;
        void 0 === volumeScale && (volumeScale = 1);
        if (!this._sfxScale() || !this._unlocked || this._paused()) return;
        var ticket = this._sfxEpoch;
        var guard = 0;
        while (!SFX[id] && FALLBACK[id] && guard++ < 4) id = FALLBACK[id];
        var e = SFX[id];
        if (!e) {
          cc.warn("[Audio] \u672a\u77e5\u97f3\u6548", id);
          return;
        }
        var now = Date.now();
        if (now - (this._lastPlay[id] || 0) < SFX_MIN_INTERVAL) return;
        if (this._activeSfx >= SFX_MAX_CONCURRENT) return;
        this._lastPlay[id] = now;
        this._getClip(this._pickVariant(id, e), function(clip) {
          if (!clip || !self._alive || ticket !== self._sfxEpoch || !self._sfxScale() || self._paused() || self._activeSfx >= SFX_MAX_CONCURRENT) return;
          self._playTransient(clip, "sfx", SFX_BASE * (e.volume || 1) * volumeScale);
        });
      },
      playCombo: function playCombo(level) {
        var max = 0;
        while (SFX["sfx_combo_" + (max + 1)]) max++;
        if (0 === max) {
          this.playSFX("sfx_match");
          return;
        }
        this.playSFX("sfx_combo_" + Math.min(Math.max(level, 1), max));
      },
      playStar: function playStar(index) {
        this.playSFX(SFX["sfx_star_" + index] ? "sfx_star_" + index : "sfx_star_1");
      },
      playCoins: function playCoins(count) {
        var self = this, n = Math.min(count, 8), ticket = this._sfxEpoch;
        for (var i = 0; i < n; i++) (function(k) {
          self.scheduleOnce(function() {
            self._alive && ticket === self._sfxEpoch && self.playSFX("sfx_coin", 1 - .05 * k);
          }, .06 * k);
        })(i);
      },
      pause: function pause(reason) {
        this._pauseReasons[reason] = true;
        this._musicEpoch++;
        this._jingleEpoch++;
        this._sfxEpoch++;
        this._stopFade();
        this._stopTransients();
        this._setBgmVolume(0);
        this._bgmAudioId >= 0 && cc.audioEngine.pause(this._bgmAudioId);
      },
      resume: function resume(reason) {
        delete this._pauseReasons[reason];
        if (this._paused()) return;
        if (this._musicScale() && this._currentBgm && this._unlocked) {
          if (this._bgmAudioId < 0 || this._loadedBgm !== this._currentBgm) {
            var id = this._currentBgm;
            this._currentBgm = "";
            this.playBGM(id);
            return;
          }
          cc.audioEngine.resume(this._bgmAudioId);
          this._fadeTo(this._bgmTarget(BGM[this._currentBgm]), .3);
        }
      },
      pauseAll: function pauseAll() {
        this.pause("ad");
      },
      resumeAll: function resumeAll() {
        this.resume("ad");
      },
      _onHide: function _onHide() {
        this.pause("hide");
      },
      _onShow: function _onShow() {
        this.resume("hide");
      }
    });
    module.exports = GameAudioManager;
    cc._RF.pop();
  }, {
    GameAudioConfig: "GameAudioConfig"
  } ],
  MeadowAudioHooks: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "d7254WfMsVc3piexz3Mpj5Y", "MeadowAudioHooks");
    "use strict";
    var Audio = require("./MeadowAudio");
    function safe(fn) {
      try {
        return fn();
      } catch (e) {
        "undefined" !== typeof cc && cc.warn("[Audio] Optional playback unavailable", e && e.message);
      }
    }
    function snapshot(game) {
      var run = game.run;
      return {
        page: game.page,
        run: run,
        runId: game.runId,
        animating: !!game.animating,
        moves: run ? run.moves : 0,
        flow: run && run.waterFlow,
        valve: run && run.valveOpen,
        combo: run ? run.combo : 0,
        score: run ? run.score : 0,
        bounces: run && run.waterFlow ? run.waterFlow.deflectionCount : 0,
        state: run && run.state,
        coins: game.wallet ? game.wallet.data.coins : 0,
        sound: game.wallet ? JSON.stringify(game.wallet.data.sound) : ""
      };
    }
    function wireAds(game) {
      var ads = game.ads;
      if (!ads || ads._meadowAudioHooked) return;
      ads._meadowAudioHooked = true;
      var request = ads.request;
      ads.request = function(owner, done, placement) {
        var paused = !!game.audio && !(ads.gate && ads.gate.busy);
        paused && safe(function() {
          game.audio.pause("ad");
        });
        function finish() {
          if (paused) {
            paused = false;
            safe(function() {
              game.audio.resume("ad");
            });
          }
          var result = done.apply(this, arguments);
          observe(game);
          return result;
        }
        var result;
        try {
          result = request.call(this, owner, finish, placement);
        } catch (error) {
          paused && safe(function() {
            game.audio.resume("ad");
          });
          throw error;
        }
        if (false === result && paused) {
          paused = false;
          safe(function() {
            game.audio.resume("ad");
          });
        }
        return result;
      };
    }
    function ensure(game) {
      if (game._audioDisposed || !game.wallet) return;
      if (!game.audio) {
        game.audio = Audio.create(game.wallet.data.sound);
        game.audio.preload();
        game._audioObserved = null;
      }
      wireAds(game);
    }
    function observe(game) {
      safe(function() {
        ensure(game);
        if (!game.audio || game._audioDisposed) return;
        var next = snapshot(game), prev = game._audioObserved;
        game._audioObserved = next;
        prev && prev.sound === next.sound || game.audio.applySound(game.wallet.data.sound);
        prev && prev.page === next.page || game.audio.page(next.page);
        if (prev && next.run && prev.run === next.run) {
          next.moves > prev.moves && game.audio.sfx("sfx_tile_slide");
          prev.animating && !next.animating && "game" === next.page && game.audio.sfx("sfx_tile_snap");
          next.flow && next.flow !== prev.flow && game.audio.sfx("sfx_water_flow");
          next.run.level.valve && next.valve && !prev.valve && game.audio.sfx("sfx_sluice_open");
          next.bounces > prev.bounces && game.audio.sfx("sfx_deflector_bounce", .6);
          next.run.level.combo && next.combo > 1 && next.combo > prev.combo && next.score > prev.score && game.audio.combo(next.combo);
        }
        prev && next.coins > prev.coins && game.audio.coins(Math.min(4, next.coins - prev.coins));
        "game" !== next.page || prev && prev.run === next.run || game.audio.sfx("sfx_level_start");
        if ("won" !== next.page && "lost" !== next.page) game._audioResult = ""; else {
          var key = next.runId + ":" + next.page;
          if (game._audioResult !== key) {
            game._audioResult = key;
            "won" === next.page ? game.audio.win() : game.audio.lose();
          }
        }
      });
    }
    function install(Game) {
      var proto = Game.prototype;
      if (proto._meadowAudioInstalled) return;
      proto._meadowAudioInstalled = true;
      var button = proto.button;
      proto.button = function() {
        var args = Array.prototype.slice.call(arguments), game = this, action = args[6], label = args[0];
        "function" === typeof action && (args[6] = function() {
          safe(function() {
            game.audio && game.audio.ui(label);
          });
          var result = action.apply(this, arguments);
          observe(game);
          return result;
        });
        return button.apply(this, args);
      };
      [ "home", "navigate", "startLevel", "drawGame", "help", "pause", "result", "settings", "setting", "map", "wardrobe", "gift", "recoverSave", "saveEarned", "load", "loading", "loadingError", "touchStart", "touchEnd", "update", "ad" ].forEach(function(name) {
        var original = proto[name];
        if ("function" !== typeof original) return;
        proto[name] = function() {
          "home" === name && safe(function() {
            ensure(this);
          }.bind(this));
          "touchStart" === name && safe(function() {
            this.audio && this.audio.unlock();
          }.bind(this));
          var beforeMoves = this.run && this.run.moves;
          var event = arguments[0], hadTouch = "touchEnd" === name && false !== this.enabled && "game" === this.page && !this.animating && this.run && "playing" === this.run.state && this.touch && event && "function" === typeof event.getID && this.touch.id === event.getID();
          var result = original.apply(this, arguments);
          observe(this);
          hadTouch && this.run && "game" === this.page && "playing" === this.run.state && this.run.moves === beforeMoves && safe(function() {
            this.audio && this.audio.sfx("sfx_invalid");
          }.bind(this));
          return result;
        };
      });
      var destroy = proto.onDestroy;
      proto.onDestroy = function() {
        var result;
        try {
          destroy && (result = destroy.apply(this, arguments));
        } finally {
          this._audioDisposed = true;
          safe(function() {
            this.audio && this.audio.dispose();
          }.bind(this));
        }
        return result;
      };
    }
    module.exports = {
      install: install
    };
    cc._RF.pop();
  }, {
    "./MeadowAudio": "MeadowAudio"
  } ],
  MeadowAudio: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "7d932J9TShYXqPHd0I7gbt4", "MeadowAudio");
    "use strict";
    var Manager = require("./audio/GameAudioManager");
    function level(value, fallback) {
      var n = Number(value);
      return isFinite(n) ? Math.max(0, Math.min(10, Math.round(n))) : fallback;
    }
    function create(sound) {
      var engine = Manager.init();
      var last = null, context = "home";
      var api = {
        manager: engine,
        applySound: function applySound(value) {
          value = value || {};
          var next = {
            music: false !== value.music,
            sfx: false !== value.sfx,
            musicVolume: level(value.musicVolume, 7),
            sfxVolume: level(value.sfxVolume, 8)
          };
          var old = last;
          last = next;
          engine._settings.musicOn = next.music;
          engine._settings.sfxOn = next.sfx;
          engine._settings.musicLevel = next.musicVolume;
          engine._settings.sfxLevel = next.sfxVolume;
          next.musicVolume > 0 && (engine._settings.lastMusicLevel = next.musicVolume);
          next.sfxVolume > 0 && (engine._settings.lastSFXLevel = next.sfxVolume);
          old && old.music === next.music && old.musicVolume === next.musicVolume || engine._applyMusicSettings();
          old && old.sfx === next.sfx && old.sfxVolume === next.sfxVolume || engine._applySFXSettings();
        },
        unlock: function unlock() {
          engine.unlock();
        },
        preload: function preload(done) {
          engine.preload(done);
        },
        page: function page(name) {
          context = name;
          if ("loading" === name) return;
          if ("pause" === name || "help" === name) {
            engine.pause("menu");
            return;
          }
          engine.resume("menu");
          if ("won" === name || "lost" === name) return;
          engine.playBGM("game" === name ? "bgm_game" : "bgm_menu");
        },
        ui: function ui(label) {
          engine.unlock();
          var id = /back|close|cancel|resume/i.test(label || "") ? "sfx_ui_back" : "sfx_ui_click";
          engine.playSFX(id);
        },
        sfx: function sfx(id, gain) {
          engine.playSFX(id, gain);
        },
        combo: function combo(count) {
          engine.playCombo(count);
        },
        coins: function coins(count) {
          engine.playCoins(count);
        },
        star: function star(index) {
          engine.playStar(index);
        },
        win: function win() {
          engine.resume("menu");
          context = "won";
          engine.playJingle("jingle_win");
        },
        lose: function lose() {
          engine.resume("menu");
          context = "lost";
          engine.playJingle("jingle_lose");
        },
        pause: function pause(reason) {
          engine.pause(reason || "game");
        },
        resume: function resume(reason) {
          engine.resume(reason || "game");
        },
        snapshot: function snapshot() {
          return {
            context: context,
            unlocked: engine._unlocked,
            settings: Object.assign({}, last),
            pauses: Object.keys(engine._pauseReasons),
            bgm: engine._currentBgm,
            bgmId: engine._bgmAudioId,
            sfxActive: engine._activeSfx,
            clips: Object.keys(engine._clips)
          };
        },
        dispose: function dispose() {
          engine && engine.node && cc.isValid(engine.node) && engine.node.destroy();
        }
      };
      api.applySound(sound);
      return api;
    }
    module.exports = {
      create: create
    };
    cc._RF.pop();
  }, {
    "./audio/GameAudioManager": "GameAudioManager"
  } ],
  MeadowBootstrap: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "d236fSFTpJ4Oa5M9Gmpn4yw", "MeadowBootstrap");
    "use strict";
    var MeadowGame = require("./MeadowGame");
    require("./MeadowPresentation").install(MeadowGame);
    require("./MeadowAudioHooks").install(MeadowGame);
    cc.Class({
      extends: cc.Component,
      properties: {
        officialLogo: {
          default: null,
          type: cc.SpriteFrame
        }
      },
      onLoad: function onLoad() {
        var canvas = this.node.getComponent(cc.Canvas);
        if (canvas) {
          canvas.fitHeight = false;
          canvas.fitWidth = true;
        }
        cc.view.setDesignResolutionSize(720, 1280, cc.ResolutionPolicy.FIXED_WIDTH);
        MeadowGame.officialLogo = this.officialLogo;
        this.node.addComponent(MeadowGame);
      }
    });
    cc._RF.pop();
  }, {
    "./MeadowAudioHooks": "MeadowAudioHooks",
    "./MeadowGame": "MeadowGame",
    "./MeadowPresentation": "MeadowPresentation"
  } ],
  MeadowFlow: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "e4dbdm3bt3BylQrd+OK4R3K", "MeadowFlow");
    "use strict";
    (function(root, factory) {
      var api = factory();
      "undefined" !== typeof module && module.exports ? module.exports = api : root.MeadowFlow = api;
    })("undefined" !== typeof window ? window : globalThis, function() {
      var DIRECTIONS = [ {
        x: 0,
        y: -1,
        bit: 1,
        opposite: 4
      }, {
        x: 1,
        y: 0,
        bit: 2,
        opposite: 8
      }, {
        x: 0,
        y: 1,
        bit: 4,
        opposite: 1
      }, {
        x: -1,
        y: 0,
        bit: 8,
        opposite: 2
      } ];
      var STEP = 1 / 120, EPS = 1e-8;
      function dot(a, b) {
        return a.x * b.x + a.y * b.y;
      }
      function unit(x, y) {
        var m = Math.sqrt(x * x + y * y);
        return m > EPS ? {
          x: x / m,
          y: y / m
        } : {
          x: 0,
          y: 0
        };
      }
      function neighbor(index, d, n) {
        var x = index % n + d.x, y = Math.floor(index / n) + d.y;
        return x >= 0 && x < n && y >= 0 && y < n ? y * n + x : -1;
      }
      function center(flow, index) {
        return {
          x: (index % flow.size + .5) * flow.cell,
          y: (Math.floor(index / flow.size) + .5) * flow.cell
        };
      }
      function direction(a, b, n) {
        var dx = b % n - a % n, dy = Math.floor(b / n) - Math.floor(a / n);
        return DIRECTIONS.find(function(d) {
          return d.x === dx && d.y === dy;
        });
      }
      function clone(value) {
        return JSON.parse(JSON.stringify(value));
      }
      function intersectSegment(a, b, body) {
        var tangent = body.tangent, normal = body.normal, q = {
          x: a.x - body.x,
          y: a.y - body.y
        };
        var delta = {
          x: b.x - a.x,
          y: b.y - a.y
        }, enter = 0, exit = 1, hitNormal = null;
        var axes = [ {
          axis: tangent,
          extent: body.halfLength
        }, {
          axis: normal,
          extent: body.thickness / 2
        } ];
        for (var k = 0; k < axes.length; k++) {
          var axis = axes[k].axis, extent = axes[k].extent, origin = dot(q, axis), velocity = dot(delta, axis);
          if (Math.abs(velocity) < EPS) {
            if (origin < -extent - EPS || origin > extent + EPS) return null;
            continue;
          }
          var near = (-extent - origin) / velocity, far = (extent - origin) / velocity;
          var sign = -1;
          if (near > far) {
            var swap = near;
            near = far;
            far = swap;
            sign = 1;
          }
          if (near >= enter - EPS) {
            enter = near;
            hitNormal = {
              x: axis.x * sign,
              y: axis.y * sign
            };
          }
          exit = Math.min(exit, far);
          if (enter > exit + EPS) return null;
        }
        if (!hitNormal || enter < -EPS || enter > 1 + EPS || exit < 0) return null;
        enter = Math.max(0, Math.min(1, enter));
        return {
          t: enter,
          x: a.x + delta.x * enter,
          y: a.y + delta.y * enter,
          normal: hitNormal
        };
      }
      function reflect(velocity, normal) {
        var projection = 2 * dot(velocity, normal);
        return {
          x: velocity.x - projection * normal.x,
          y: velocity.y - projection * normal.y
        };
      }
      function deflectorBody(flow, index) {
        var tile = flow.board[index], ports = DIRECTIONS.filter(function(d) {
          return tile.ports & d.bit;
        });
        if (2 !== ports.length || Math.abs(dot(ports[0], ports[1])) > EPS) return null;
        var normal = unit(-ports[0].x - ports[1].x, -ports[0].y - ports[1].y), angle = (tile.deflectorAngle || 0) * Math.PI / 180;
        angle && (normal = {
          x: normal.x * Math.cos(angle) - normal.y * Math.sin(angle),
          y: normal.x * Math.sin(angle) + normal.y * Math.cos(angle)
        });
        var thickness = "number" === typeof tile.deflectorThickness ? tile.deflectorThickness : 12, p = center(flow, index);
        return {
          index: index,
          x: p.x + normal.x * thickness / 2,
          y: p.y + normal.y * thickness / 2,
          normal: normal,
          tangent: {
            x: -normal.y,
            y: normal.x
          },
          halfLength: .32 * flow.cell,
          thickness: thickness
        };
      }
      function buildNetwork(flow) {
        var queue = [ flow.start ], parent = {}, visited = {}, leaks = [], adjacency = {};
        visited[flow.start] = true;
        parent[flow.start] = -1;
        for (var q = 0; q < queue.length; q++) {
          var i = queue[q], tile = flow.board[i];
          adjacency[i] = [];
          if (!tile) continue;
          DIRECTIONS.forEach(function(d) {
            if (!(tile.ports & d.bit)) return;
            var j = neighbor(i, d, flow.size);
            if (j < 0 || !flow.board[j] || !(flow.board[j].ports & d.opposite)) {
              leaks.push({
                from: i,
                to: j,
                dir: d
              });
              return;
            }
            adjacency[i].push(j);
            if (!visited[j]) {
              visited[j] = true;
              parent[j] = i;
              queue.push(j);
            }
          });
        }
        function pathTo(i) {
          var path = [];
          while (i >= 0) {
            path.push(i);
            i = parent[i];
          }
          return path.reverse();
        }
        var routes = [], expansions = 0, limit = 2e4;
        function visit(i, path, seen) {
          if (++expansions > limit || routes.length >= 64) return;
          if (i === flow.goal) {
            routes.push({
              path: path.slice(),
              outcome: "goal"
            });
            return;
          }
          (adjacency[i] || []).forEach(function(j) {
            if (!seen[j]) {
              seen[j] = true;
              path.push(j);
              visit(j, path, seen);
              path.pop();
              delete seen[j];
            }
          });
        }
        var initialSeen = {};
        initialSeen[flow.start] = true;
        visit(flow.start, [ flow.start ], initialSeen);
        flow.routeSearchTruncated = expansions > limit || routes.length >= 64;
        return {
          cells: queue,
          routes: routes,
          leaks: leaks.map(function(leak) {
            return {
              path: pathTo(leak.from),
              exit: leak.dir,
              outcome: "spill",
              leak: leak
            };
          }),
          fallback: pathTo(queue[queue.length - 1])
        };
      }
      function create(level, board, trace) {
        var flow = {
          level: level,
          board: clone(board),
          size: level.size,
          cell: level.cellSize || 64,
          start: level.start,
          goal: level.goal,
          supply: 36,
          speed: 160,
          emissionRate: 12,
          time: 0,
          accumulator: 0,
          emitted: 0,
          delivered: 0,
          spilled: 0,
          particles: [],
          valves: {},
          sensors: {},
          deflectors: {},
          events: [],
          deflectionCount: 0,
          sensorFailed: false,
          finished: false,
          won: false,
          trace: trace || null,
          maxAge: level.size * level.size * (level.cellSize || 64) / 160 + 8
        };
        flow.board.forEach(function(tile, index) {
          if (!tile) return;
          "valve" === tile.kind && (flow.valves[index] = {
            index: index,
            pressure: 0,
            open: false,
            arrivals: {}
          });
          "sensor" === tile.kind && (flow.sensors[index] = {
            index: index,
            firstArrival: null,
            lit: false
          });
          if ("deflector" === tile.kind) {
            var body = deflectorBody(flow, index);
            body && (flow.deflectors[index] = body);
          }
        });
        flow.network = buildNetwork(flow);
        return flow;
      }
      function settle(flow, particle, state, reason) {
        if ("delivered" === particle.state || "spilled" === particle.state) return;
        particle.state = state;
        particle.reason = reason || "";
        "delivered" === state ? flow.delivered++ : flow.spilled++;
      }
      function goalOpen(flow) {
        if (flow.level.deflector && 0 === flow.deflectionCount) return false;
        var gates = Object.keys(flow.valves);
        if (flow.level.valve && (!gates.length || gates.some(function(key) {
          return !flow.valves[key].open;
        }))) return false;
        if (flow.level.dual) {
          var pads = Object.keys(flow.sensors).map(function(key) {
            return flow.sensors[key];
          });
          if (2 !== pads.length || pads.some(function(pad) {
            return null === pad.firstArrival;
          }) || flow.sensorFailed) return false;
        }
        return true;
      }
      function nextTarget(flow, particle) {
        if (particle.pos + 1 < particle.route.path.length) return center(flow, particle.route.path[particle.pos + 1]);
        if ("spill" === particle.route.outcome && particle.route.exit) {
          var p = center(flow, particle.route.path[particle.pos]);
          return {
            x: p.x + particle.route.exit.x * flow.cell / 2,
            y: p.y + particle.route.exit.y * flow.cell / 2
          };
        }
        return null;
      }
      function arrive(flow, particle) {
        var index = particle.route.path[particle.pos], gate = flow.valves[index], sensor = flow.sensors[index];
        particle.tile = index;
        if (sensor && null === sensor.firstArrival) {
          sensor.firstArrival = flow.time;
          sensor.lit = true;
          flow.events.push({
            type: "sensor-hit",
            index: index,
            time: flow.time,
            particle: particle.id
          });
          var pads = Object.keys(flow.sensors).map(function(key) {
            return flow.sensors[key];
          });
          2 === pads.length && pads.every(function(p) {
            return null !== p.firstArrival;
          }) && Math.abs(pads[0].firstArrival - pads[1].firstArrival) > 1.2 + EPS && (flow.sensorFailed = true);
        }
        if (gate && !gate.open) {
          if (!gate.arrivals[particle.id]) {
            gate.arrivals[particle.id] = true;
            gate.pressure++;
          }
          if (gate.pressure < 10) {
            particle.state = "gate";
            return;
          }
          gate.open = true;
          flow.events.push({
            type: "valve-open",
            index: index,
            time: flow.time,
            pressure: gate.pressure
          });
        }
        if (index === flow.goal && "goal" === particle.route.outcome && particle.pos === particle.route.path.length - 1) {
          goalOpen(flow) ? settle(flow, particle, "delivered") : flow.sensorFailed ? settle(flow, particle, "spilled", "sensor-window") : particle.state = "goal";
          return;
        }
        nextTarget(flow, particle) || (particle.state = "stalled");
      }
      function emit(flow) {
        var id = flow.emitted++, leaks = flow.network.leaks, routes = flow.network.routes, route;
        route = id < 6 * leaks.length && leaks.length ? leaks[Math.floor(id / 6) % leaks.length] : routes.length ? routes[(id - Math.min(36, 6 * leaks.length)) % routes.length] : leaks.length ? leaks[id % leaks.length] : {
          path: flow.network.fallback,
          outcome: "stalled"
        };
        var p = center(flow, flow.start), particle = {
          id: id,
          route: route,
          pos: 0,
          tile: flow.start,
          x: p.x,
          y: p.y,
          vx: 0,
          vy: 0,
          state: "moving",
          born: flow.time,
          mirrorsHit: {},
          bounces: 0
        };
        flow.particles.push(particle);
        arrive(flow, particle);
      }
      function advance(flow, particle, distance) {
        var loops = 0;
        while (distance > EPS && "moving" === particle.state && ++loops < 8) {
          var target = nextTarget(flow, particle);
          if (!target) {
            particle.state = "stalled";
            return;
          }
          var dx = target.x - particle.x, dy = target.y - particle.y, length = Math.sqrt(dx * dx + dy * dy);
          if (length < EPS) {
            particle.pos++;
            arrive(flow, particle);
            continue;
          }
          var velocity = unit(dx, dy), travel = Math.min(distance, length), end = {
            x: particle.x + velocity.x * travel,
            y: particle.y + velocity.y * travel
          };
          particle.vx = velocity.x * flow.speed;
          particle.vy = velocity.y * flow.speed;
          var nextIndex = particle.route.path[particle.pos + 1], mirror = flow.deflectors[nextIndex];
          if (mirror && !particle.mirrorsHit[nextIndex]) {
            var hit = intersectSegment(particle, end, mirror);
            if (hit) {
              var reflected = reflect(velocity, hit.normal), afterIndex = particle.route.path[particle.pos + 2];
              var desired = void 0 !== afterIndex ? direction(nextIndex, afterIndex, flow.size) : particle.route.exit || null;
              particle.x = hit.x;
              particle.y = hit.y;
              particle.vx = reflected.x * flow.speed;
              particle.vy = reflected.y * flow.speed;
              particle.mirrorsHit[nextIndex] = true;
              particle.bounces++;
              flow.deflectionCount++;
              flow.events.push({
                type: "deflect",
                index: nextIndex,
                particle: particle.id,
                time: flow.time,
                x: hit.x,
                y: hit.y,
                incoming: velocity,
                outgoing: reflected,
                thickness: mirror.thickness
              });
              distance -= travel * hit.t;
              if (!desired || dot(reflected, desired) < 1 - 1e-6) {
                particle.state = "misdirected";
                particle.badDirection = reflected;
                particle.badDistance = flow.cell / 2;
                return;
              }
              particle.pos++;
              arrive(flow, particle);
              continue;
            }
          }
          particle.x = end.x;
          particle.y = end.y;
          distance -= travel;
          if (travel >= length - EPS) if (particle.pos + 1 < particle.route.path.length) {
            particle.pos++;
            arrive(flow, particle);
          } else settle(flow, particle, "spilled", "open-canal-end");
        }
      }
      function step(flow) {
        flow.time += STEP;
        while (flow.emitted < flow.supply && flow.time + EPS >= flow.emitted / flow.emissionRate) emit(flow);
        flow.particles.forEach(function(particle) {
          if ("delivered" === particle.state || "spilled" === particle.state) return;
          if (flow.time - particle.born > flow.maxAge) {
            settle(flow, particle, "spilled", "lifetime");
            return;
          }
          "gate" === particle.state && flow.valves[particle.tile].open && (particle.state = "moving");
          "goal" === particle.state && (goalOpen(flow) ? settle(flow, particle, "delivered") : flow.sensorFailed && settle(flow, particle, "spilled", "sensor-window"));
          if ("misdirected" === particle.state) {
            var travel = Math.min(flow.speed * STEP, particle.badDistance);
            particle.x += particle.badDirection.x * travel;
            particle.y += particle.badDirection.y * travel;
            particle.badDistance -= travel;
            particle.badDistance < EPS && settle(flow, particle, "spilled", "wrong-deflector-angle");
          } else "moving" === particle.state && advance(flow, particle, flow.speed * STEP);
        });
        flow.won = flow.delivered >= (flow.level.target || 24);
        flow.finished = flow.emitted === flow.supply && flow.delivered + flow.spilled === flow.supply;
      }
      function tick(flow, dt) {
        if (flow.finished || !Number.isFinite(dt) || dt <= 0) return flow;
        flow.accumulator += Math.min(dt, 5);
        while (flow.accumulator + EPS >= STEP && !flow.finished) {
          flow.accumulator -= STEP;
          step(flow);
        }
        return flow;
      }
      function snapshot(flow) {
        var live = flow.particles.filter(function(p) {
          return "delivered" !== p.state && "spilled" !== p.state;
        });
        var unemitted = flow.supply - flow.emitted;
        return {
          time: flow.time,
          supply: flow.supply,
          emitted: flow.emitted,
          delivered: flow.delivered,
          spilled: flow.spilled,
          live: live.length,
          unemitted: unemitted,
          conserved: flow.delivered + flow.spilled + live.length + unemitted === flow.supply,
          won: flow.won,
          finished: flow.finished,
          state: flow.won ? "won" : flow.finished ? "lost" : "flowing",
          goalOpen: goalOpen(flow),
          sensorFailed: flow.sensorFailed,
          deflectionCount: flow.deflectionCount,
          routeSearchTruncated: flow.routeSearchTruncated,
          droplets: live.map(function(p) {
            return {
              id: p.id,
              x: p.x,
              y: p.y,
              vx: p.vx,
              vy: p.vy,
              tile: p.tile,
              state: p.state,
              bounces: p.bounces
            };
          }),
          valves: Object.keys(flow.valves).map(function(key) {
            var v = flow.valves[key];
            return {
              index: v.index,
              pressure: v.pressure,
              open: v.open
            };
          }),
          sensors: Object.keys(flow.sensors).map(function(key) {
            return clone(flow.sensors[key]);
          }),
          deflectors: Object.keys(flow.deflectors).map(function(key) {
            return clone(flow.deflectors[key]);
          })
        };
      }
      return {
        create: create,
        tick: tick,
        snapshot: snapshot,
        intersectSegment: intersectSegment,
        reflect: reflect,
        fixedStep: STEP
      };
    });
    cc._RF.pop();
  }, {} ],
  MeadowGame: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f6ad97mVN9Us4njMyXK+V2I", "MeadowGame");
    "use strict";
    (function(root, factory) {
      "undefined" !== typeof module && module.exports ? module.exports = factory(require("./MeadowRules"), require("./MeadowServices"), require("../modules/AdRewards"), require("./MeadowPlatform"), require("./MeadowLoader"), require("./MeadowFlow")) : root.MeadowGame = factory(root.MeadowRules, root.MeadowServices, root.MeadowRewards, root.MeadowPlatform, root.MeadowLoader, root.MeadowFlow);
    })("undefined" !== typeof window ? window : globalThis, function(R, S, Rewards, Platform, Loader, Flow) {
      var C = {
        ink: "#416050",
        paper: "#fffdf1",
        blue: "#74cfe3",
        green: "#aad59a",
        pink: "#edabb5",
        gold: "#edce83"
      };
      var CHAPTERS = [ "Clover Meadow", "Sunflower Slopes", "Bluebell Brook", "Poppy Plateau", "Lavender Lowlands", "Daisy Highlands", "Golden Blossom Vale" ];
      function color(hex) {
        return new cc.Color().fromHEX(hex);
      }
      function environment() {
        return "undefined" !== typeof GameGlobal ? GameGlobal : "undefined" !== typeof window ? window : globalThis;
      }
      var Game = cc.Class({
        extends: cc.Component,
        properties: {},
        onLoad: function onLoad() {
          this.page = "loading";
          this.owner = 0;
          this.alive = true;
          this.buttons = [];
          this.tiles = [];
          this.root = this.node;
          this.root.setContentSize(720, 1280);
          this.pendingAds = {};
          this.ads = new S.Ads(Rewards, Platform.createHost(environment()));
          this.node.on(cc.Node.EventType.TOUCH_START, this.touchStart, this);
          this.node.on(cc.Node.EventType.TOUCH_END, this.touchEnd, this);
          this.node.on(cc.Node.EventType.TOUCH_CANCEL, function(e) {
            this.touch && this.touch.id === e.getID() && (this.touch = null);
          }, this);
          cc.game.on(cc.game.EVENT_HIDE, this.onHide, this);
          cc.game.on(cc.game.EVENT_SHOW, this.onShow, this);
          this.load();
        },
        load: function load() {
          var generation = ++this.owner, self = this;
          this.loadTask && this.loadTask.cancel();
          this.page = "loading";
          this.error = "";
          this.loadStart = Date.now();
          this.clear();
          this.loading();
          this.loadDeadline = Date.now() + 180000;
          var host = environment();
          this.startup = host.MeadowStartup;
          if (this.startup) {
            this.startup.stage("home_resources");
            this.startup.onRetry(this.load.bind(this));
          }
          this.loadTask = Loader.load(host, generation, function(done, total) {
            if (!self.alive || self.owner !== generation || "loading" !== self.page) return;
            self.loadDeadline = Date.now() + 180000;
            self.startup && self.startup.progress(done, total);
          });
          var promise = Promise.all([ this.loadTask.promise, require("./MeadowPresentation").prepare() ]).then(function(parts) {
            return parts[0];
          });
          promise.then(function(configs) {
            if (!self.alive || self.owner !== generation || "loading" !== self.page) return;
            if (!configs[0] || 70 !== configs[0].levels.length || !configs[2].items) throw Error("Incomplete game data");
            self.levels = configs[0].levels;
            self.plan = configs[1];
            self.table = configs[2];
            self.wallet = new S.Wallet(cc.sys.localStorage, self.table);
            self.loadDeadline = Date.now() + 180000;
            return require("./MeadowPresentation").ensureItems(self.table.items.filter(function(item) {
              return self.wallet.data.equipped.indexOf(item.id) >= 0;
            })).then(function() {
              if (!self.alive || self.owner !== generation || "loading" !== self.page) return;
              self.loadDeadline = 0;
              self.home();
            });
          })["catch"](function() {
            self.alive && self.owner === generation && self.loadingError();
          });
        },
        loading: function loading() {
          this.shape("official-loading-background", 0, 0, 720, 1280, "#171717");
          if (Game.officialLogo) {
            var logo = new cc.Node("Official Cocos Logo");
            this.root.addChild(logo);
            logo.setPosition(0, 115);
            var sprite = logo.addComponent(cc.Sprite);
            sprite.spriteFrame = Game.officialLogo;
            var original = Game.officialLogo.getOriginalSize();
            logo.setContentSize(330, 330 * original.height / original.width);
          }
          var label = this.text("Loading...", 0, -15, 26);
          label.node.color = color("#ffffff");
        },
        loadingError: function loadingError() {
          this.loadDeadline = 0;
          this.loadTask && this.loadTask.cancel();
          this.clear();
          this.loading();
          this.text("Unable to load. Please retry.", 0, -30, 25);
          this.button("Retry", 0, -125, 320, 90, C.blue, this.load.bind(this));
          this.startup && this.startup.fail(Error("Game configuration unavailable"));
        },
        clear: function clear() {
          this.root.children.slice().forEach(function(n) {
            n.getComponent(cc.Camera) || n.destroy();
          });
          this.buttons = [];
          this.tiles = [];
          this.toastLabel = null;
          this.background();
        },
        shape: function shape(name, x, y, w, h, fill, radius, parent) {
          var node = new cc.Node(name);
          node.setContentSize(w, h);
          node.setPosition(x, y);
          (parent || this.root).addChild(node);
          var g = node.addComponent(cc.Graphics);
          g.fillColor = color(fill);
          g.roundRect(-w / 2, -h / 2, w, h, radius || 1);
          g.fill();
          return node;
        },
        text: function text(value, x, y, size, parent, width) {
          var node = new cc.Node("text-" + String(value).slice(0, 25));
          node.setPosition(x, y);
          node.setContentSize(width || 650, 1.6 * size);
          (parent || this.root).addChild(node);
          var label = node.addComponent(cc.Label);
          label.string = String(value);
          label.fontSize = size;
          label.lineHeight = 1.25 * size;
          label.horizontalAlign = cc.Label.HorizontalAlign.CENTER;
          label.verticalAlign = cc.Label.VerticalAlign.CENTER;
          label.overflow = cc.Label.Overflow.SHRINK;
          label.enableWrapText = true;
          label.useSystemFont = true;
          label.fontFamily = "Arial";
          label.setMaterial(0, cc.Material.getBuiltinMaterial("2d-sprite"));
          node.setContentSize(width || 650, 1.6 * size);
          node.color = color(C.ink);
          return label;
        },
        button: function button(label, x, y, w, h, fill, action, parent) {
          var n = this.shape("btn-" + label, x, y, w, h, fill || C.green, 22, parent);
          this.text(label, 0, 0, 27, n, w - 18);
          n.addComponent(cc.Button);
          this.buttons.push({
            node: n,
            label: label,
            action: action
          });
          n.on("click", function() {
            if (this.animating) return;
            if (this.ads.gate.busy && "Home" !== label && "Pause" !== label) {
              this.toast("Checking video... You can return Home to cancel.");
              return;
            }
            action();
          }, this);
          return n;
        },
        background: function background() {
          var scene = this.wallet && this.table.items.find(function(i) {
            return "background" === i.group && this.wallet.data.equipped.indexOf(i.id) >= 0;
          }, this);
          var palettes = [ [ "#e1f1ec", "#d1e3bd" ], [ "#fff1cb", "#dfdda9" ], [ "#dbecf8", "#c4d8d2" ], [ "#fce4df", "#d9ddb9" ], [ "#eae2f6", "#d5cbe0" ] ];
          var palette = palettes[scene ? (scene.order - 1) % palettes.length : 0];
          this.shape("sky", 0, 0, 720, 1280, palette[0]);
          this.shape("ground", 0, -370, 720, 540, palette[1], 70);
          [ [ -260, 350 ], [ 260, 460 ], [ -220, -420 ], [ 260, -510 ] ].forEach(function(p, i) {
            var n = new cc.Node("meadow-mark");
            this.root.addChild(n);
            n.setPosition(p[0], p[1]);
            var g = n.addComponent(cc.Graphics);
            g.fillColor = color(i % 2 ? "#cfdfd0" : "#f7f5df");
            g.circle(0, 0, 70);
            g.fill();
          }, this);
        },
        topbar: function topbar() {
          this.shape("nectar-bar", -155, 530, 300, 70, C.paper, 30);
          this.text("Nectar  " + this.wallet.data.coins, -155, 530, 29);
          this.shape("progress-bar", 175, 530, 230, 70, C.paper, 30);
          this.text(Math.min(70, this.wallet.data.highest - 1) + " / 70", 175, 530, 29);
        },
        navigate: function navigate(page) {
          this.ads.cancelOwner(this.owner);
          this.owner++;
          this.touch = null;
          this.run = null;
          this.animating = false;
          this.page = page;
          this.clear();
        },
        bunny: function bunny(x, y, scale) {
          var n = new cc.Node("Mabel");
          n.setPosition(x, y);
          n.scale = scale || 1;
          this.root.addChild(n);
          var skin = this.table && this.table.items.find(function(i) {
            return this.wallet.data.equipped.indexOf(i.id) >= 0 && "skin" === i.group;
          }, this);
          var colors = [ C.green, C.pink, C.blue, C.gold ], accent = colors[skin ? skin.order % colors.length : 0];
          this.shape("ear-left", -35, 110, 38, 130, C.paper, 20, n);
          this.shape("ear-right", 35, 110, 38, 130, C.paper, 20, n);
          this.shape("body", 0, -60, 130, 150, accent, 60, n);
          this.shape("head", 0, 40, 160, 130, C.paper, 60, n);
          this.shape("eye-l", -32, 48, 10, 17, C.ink, 5, n);
          this.shape("eye-r", 32, 48, 10, 17, C.ink, 5, n);
          this.shape("nose", 0, 25, 14, 10, C.pink, 5, n);
          return n;
        },
        home: function home() {
          this.navigate("home");
          this.topbar();
          var self = this;
          this.button("Settings", -240, 420, 180, 76, C.blue, function() {
            self.settings("general");
          });
          this.text("Mabel's", 0, 270, 60);
          this.text("MEADOW MAZE", 0, 200, 45);
          this.bunny(0, -20, 1.15);
          this.text("A little water. A meadow in bloom.", 0, -230, 24);
          this.button(this.wallet.data.highest > 70 ? "VIEW GARDENS" : "PLAY", 0, -340, 480, 108, C.green, function() {
            self.wallet.data.highest > 70 ? self.map(6) : self.startLevel(self.wallet.data.highest);
          });
          this.button("Map", -200, -480, 175, 90, C.gold, function() {
            self.map(0);
          });
          this.button("Wardrobe", 0, -480, 190, 90, C.pink, function() {
            self.wardrobe("skin", 0);
          });
          this.button("Gift", 200, -480, 175, 90, C.blue, function() {
            self.gift();
          });
          this.wallet.readFailed ? this.button("RECOVER SAVE", 0, -575, 350, 70, C.pink, this.recoverSave.bind(this)) : Object.keys(this.pendingAds).length && this.button("SAVE EARNED REWARD", 0, -575, 430, 70, C.gold, this.saveEarned.bind(this));
          this.wallet.error && this.toast(this.wallet.error);
          this.scheduleOnce(function() {
            self.alive && "home" === self.page && self.startup && self.startup.ready();
          }, 0);
        },
        map: function map(chapter) {
          this.navigate("map");
          this.chapter = chapter;
          this.topbar();
          var self = this;
          this.text("CHAPTER " + (chapter + 1), 0, 405, 27);
          this.text(CHAPTERS[chapter], 0, 345, 37);
          for (var k = 0; k < 10; k++) (function(level, k) {
            var x = k % 2 ? 140 : -140, y = 235 - 140 * Math.floor(k / 2);
            var entry = self.plan.levels[level - 1], unlocked = level <= self.wallet.data.highest;
            var stars = self.wallet.data.stars[level] || 0;
            self.button(("bonus" === entry.type ? "+ " : "") + level + (stars ? "  " + Array(stars + 1).join("*") : unlocked ? "" : "  Locked"), x, y, 235, 100, unlocked ? "milestone" === entry.type ? C.gold : C.paper : "#c9d6c9", function() {
              unlocked ? self.startLevel(level) : self.toast("Clear the previous garden first.");
            });
          })(10 * chapter + k + 1, k);
          this.button("<", -235, -505, 100, 76, C.blue, function() {
            0 === chapter ? self.toast("This is the first chapter.") : self.map(chapter - 1);
          });
          this.button("Home", 0, -505, 220, 76, C.gold, this.home.bind(this));
          this.button(">", 235, -505, 100, 76, C.blue, function() {
            6 === chapter ? self.toast("This is the final chapter.") : self.map(chapter + 1);
          });
        },
        startLevel: function startLevel(id) {
          if (id < 1 || id > 70 || id > this.wallet.data.highest) return;
          this.navigate("game");
          this.run = R.create(this.levels[id - 1]);
          this.runId = Date.now() + ":" + this.owner + ":" + Math.random().toString(36).slice(2);
          this.rewardCommitted = false;
          this.drawGame();
        },
        drawGame: function drawGame() {
          this.clear();
          var self = this, run = this.run, n = run.level.size;
          this.text("LEVEL " + run.level.id, -180, 540, 33);
          this.button("Pause", 235, 535, 155, 72, C.blue, this.pause.bind(this));
          this.movesLabel = this.text("Moves  " + run.remaining, -180, 445, 31);
          this.waterLabel = this.text("Water  " + run.water + " / 24", 165, 445, 31);
          this.statusLabel = this.text(this.guide(), 0, 350, 25);
          this.cell = 630 / n;
          this.boardLeft = -315;
          this.boardTop = 260;
          this.shape("board", 0, -55, 658, 658, "#c0d1b7", 25);
          for (var i = 0; i < n * n; i++) {
            var x = this.boardLeft + (i % n + .5) * this.cell, y = this.boardTop - (Math.floor(i / n) + .5) * this.cell;
            this.shape("socket-" + i, x, y, this.cell - 8, this.cell - 8, "#b0c2a6", 14);
            (run.level.thorns || []).indexOf(i) >= 0 && this.text(run.hazards.indexOf(i) >= 0 ? "THORNS" : "bush", x, y, 18, null, this.cell - 12);
            run.board[i] && this.drawTile(i, x, y);
          }
          this.flowLayer = new cc.Node("water-particles");
          this.flowLayer.zIndex = 5;
          this.root.addChild(this.flowLayer);
          this.flowG = this.flowLayer.addComponent(cc.Graphics);
          this.button("WATER", 0, -465, 390, 95, C.blue, function() {
            R.release(self.run) && self.drawGame();
          });
          this.button("?", -270, -465, 90, 90, C.paper, function() {
            self.help();
          });
          this.button("Home", 265, -465, 110, 90, C.gold, this.home.bind(this));
          this.text("3 stars: clear in " + run.level.parMoves + " moves or fewer, without revive.", 0, -550, 23);
          this.comboLabel = run.level.combo ? this.text("Blossom score  " + run.score, 0, -585, 21) : null;
          this.sync();
        },
        guide: function guide() {
          var id = this.run.level.id;
          if (1 === id) return "Move the canal beside the gap. Then tap WATER.";
          if (2 === id) return "Swipe a tile toward the gap. The ends stay fixed.";
          if (id >= 35) return "Feed both flower sensors within 1.2 seconds.";
          if (id >= 24) return "The gate opens after pooling 10 droplets.";
          if (id >= 15) return "Connect quickly for blossom combos.";
          if (id >= 8) return "The wooden elbow redirects your stream.";
          return "Connect the spring to the basin. Deliver 24 droplets.";
        },
        help: function help() {
          if ("game" !== this.page) return;
          this.previousState = this.run.state;
          this.run.state = "paused";
          this.page = "help";
          this.touch = null;
          this.modal("How to water");
          var lines = [ "Slide a tile into the adjacent gap. S and G stay fixed.", "Connect S to G, then WATER. Deliver at least 24 droplets." ];
          this.run.level.deflector && lines.push("Wooden deflectors turn the stream by 90 degrees.");
          (this.run.level.thorns || []).length && lines.push("Water spilled into an empty bush socket grows thorns.");
          this.run.level.combo && lines.push("Link canals within 1.5 seconds: combo n gives n x n x 5 points.");
          this.run.level.valve && lines.push("The wooden gate opens after 10 droplets gather behind it.");
          this.run.level.dual && lines.push("Reach both flower pads within 1.2 seconds to unlock G.");
          lines.forEach(function(s, i) {
            this.text(s, 0, 155 - 60 * i, 23, null, 540);
          }, this);
          this.button("BACK TO GARDEN", 0, -300, 420, 85, C.green, function() {
            this.run.state = this.previousState;
            this.page = "game";
            this.drawGame();
          }.bind(this));
        },
        drawTile: function drawTile(index, x, y) {
          var tile = this.run.board[index], size = this.cell - 10;
          var fill = "start" === tile.kind ? "#bee5ed" : "goal" === tile.kind ? "#f4d7df" : tile.fixed ? "#bfbdaf" : "#f7f4e7";
          var node = this.shape("tile-" + tile.id, x, y, size, size, fill, 15);
          node.zIndex = 2;
          var g = node.getComponent(cc.Graphics);
          g.lineCap = cc.Graphics.LineCap.ROUND;
          g.lineWidth = 24;
          g.strokeColor = color("#c1cbb6");
          R.DIRS.forEach(function(d) {
            if (tile.ports & d.bit) {
              g.moveTo(0, 0);
              g.lineTo(d.dx * size / 2, -d.dy * size / 2);
              g.stroke();
            }
          });
          g.lineWidth = 12;
          g.strokeColor = color("#90bfc3");
          R.DIRS.forEach(function(d) {
            if (tile.ports & d.bit) {
              g.moveTo(0, 0);
              g.lineTo(d.dx * size / 2, -d.dy * size / 2);
              g.stroke();
            }
          });
          var feature = new cc.Node("feature-" + tile.id);
          node.addChild(feature);
          var fg = feature.addComponent(cc.Graphics);
          this.drawFeature(fg, index);
          "start" !== tile.kind && "goal" !== tile.kind || this.text("start" === tile.kind ? "S" : "G", 0, 0, 35, node, 65);
          this.tiles.push({
            index: index,
            node: node,
            feature: fg
          });
        },
        drawFeature: function drawFeature(g, index) {
          var tile = this.run.board[index], view = this.run.waterView, scale = this.cell / this.run.level.cellSize;
          g.clear();
          g.lineWidth = 12 * scale;
          g.strokeColor = color("#a16e36");
          if ("deflector" === tile.kind) {
            var body = view && view.deflectors.find(function(b) {
              return b.index === index;
            });
            body || (body = Flow.snapshot(Flow.create(this.run.level, this.run.board)).deflectors.find(function(b) {
              return b.index === index;
            }));
            if (body) {
              var cx = (index % this.run.level.size + .5) * this.run.level.cellSize, cy = (Math.floor(index / this.run.level.size) + .5) * this.run.level.cellSize;
              g.moveTo((body.x - cx - body.tangent.x * body.halfLength) * scale, -(body.y - cy - body.tangent.y * body.halfLength) * scale);
              g.lineTo((body.x - cx + body.tangent.x * body.halfLength) * scale, -(body.y - cy + body.tangent.y * body.halfLength) * scale);
              g.stroke();
            }
          }
          if ("valve" === tile.kind) {
            var gate = view && view.valves.find(function(v) {
              return v.index === index;
            });
            g.strokeColor = color(gate && gate.open ? "#7fbe71" : "#a16e36");
            g.moveTo(.25 * -this.cell, gate && gate.open ? 25 : 0);
            g.lineTo(.25 * this.cell, gate && gate.open ? 25 : 0);
            g.stroke();
          }
          if ("sensor" === tile.kind) {
            var pad = view && view.sensors.find(function(v) {
              return v.index === index;
            });
            g.fillColor = color(pad && pad.lit ? "#f3cc50" : C.pink);
            g.circle(0, 0, .11 * this.cell);
            g.fill();
          }
        },
        location: function location(event) {
          return this.root.convertToNodeSpaceAR(event.getLocation());
        },
        touchStart: function touchStart(e) {
          if (false === this.enabled) return;
          if (this.touch && this.touch.id !== e.getID()) return;
          this.touch = null;
          if ("game" !== this.page || !this.run || "playing" !== this.run.state || this.animating) return;
          var p = this.location(e), n = this.run.level.size, col = Math.floor((p.x - this.boardLeft) / this.cell), row = Math.floor((this.boardTop - p.y) / this.cell);
          this.touch = col >= 0 && col < n && row >= 0 && row < n ? {
            p: p,
            index: row * n + col,
            id: e.getID()
          } : null;
        },
        touchEnd: function touchEnd(e) {
          if (false === this.enabled) {
            this.touch = null;
            return;
          }
          var touch = this.touch;
          if (!touch || touch.id !== e.getID()) return;
          this.touch = null;
          if ("game" !== this.page || !this.run || this.animating) return;
          var p = this.location(e), dx = p.x - touch.p.x, dy = p.y - touch.p.y, dir = null;
          dx * dx + dy * dy > 500 && (dir = Math.abs(dx) > Math.abs(dy) ? R.DIRS[dx > 0 ? 1 : 3] : R.DIRS[dy > 0 ? 0 : 2]);
          var hole = this.run.board.indexOf(null), item = this.tiles.find(function(t) {
            return t.index === touch.index;
          });
          if (R.slide(this.run, touch.index, dir)) {
            this.animating = true;
            var self = this, owner = this.owner;
            this.haptic();
            if (item) cc.tween(item.node).to(this.wallet.data.sound.reducedMotion ? 0 : .2, {
              x: this.boardLeft + (hole % this.run.level.size + .5) * this.cell,
              y: this.boardTop - (Math.floor(hole / this.run.level.size) + .5) * this.cell
            }, {
              easing: "cubicOut"
            }).call(function() {
              if (self.alive && self.owner === owner && "game" === self.page) {
                self.animating = false;
                self.drawGame();
                "lost" === self.run.state && self.result();
              }
            }).start(); else {
              this.animating = false;
              this.drawGame();
            }
          } else this.toast("Slide a movable tile into the adjacent empty space.");
        },
        sync: function sync() {
          if (!this.run || !this.movesLabel) return;
          this.movesLabel.string = "Moves  " + this.run.remaining;
          this.waterLabel.string = "Water  " + this.run.water + " / 24";
          if ("flowing" === this.run.state) {
            var view = this.run.waterView;
            this.statusLabel.string = this.run.level.valve && !this.run.valveOpen ? "Gate pressure  " + this.run.valvePressure + " / 10" : this.run.level.dual ? "Flower pads " + view.sensors.filter(function(p) {
              return p.lit;
            }).length + " / 2  |  Lost " + view.spilled : "Watering the meadow...  Lost " + view.spilled;
          }
          this.comboLabel && this.run.level.combo && (this.comboLabel.string = "Blossom score  " + this.run.score);
        },
        pause: function pause() {
          if ("game" !== this.page) return;
          this.touch = null;
          this.previousState = this.run.state;
          this.run.state = "paused";
          this.tiles.forEach(function(t) {
            cc.Tween.stopAllByTarget(t.node);
          });
          this.animating = false;
          this.page = "pause";
          this.modal("Take a breath");
          var self = this;
          this.button("RESUME", 0, 65, 400, 90, C.green, function() {
            self.run.state = self.previousState;
            self.page = "game";
            self.animating = false;
            self.drawGame();
          });
          this.button("RETRY", 0, -55, 400, 90, C.pink, function() {
            self.startLevel(self.run.level.id);
          });
          this.button("Home", 0, -175, 230, 80, C.gold, this.home.bind(this));
        },
        modal: function modal(title) {
          this.clear();
          this.topbar();
          this.shape("modal", 0, 0, 620, 740, C.paper, 40);
          this.text(title, 0, 245, 43);
        },
        result: function result() {
          var self = this, won = "won" === this.run.state;
          this.page = won ? "won" : "lost";
          this.touch = null;
          var entry = this.plan.levels[this.run.level.id - 1];
          won || this.run.roundClosed || (this.run.roundClosed = this.wallet.commit(function(d) {
            d.gift = Rewards.onRoundEnd(d.gift);
          }));
          var reward = Rewards.resultReward(entry.coins, Rewards.bonusPct(this.table, this.wallet.data.equipped));
          if (won && !this.rewardCommitted) {
            var milestone = entry.reward && "coins" === entry.reward.type ? entry.reward.amount : 0;
            this.rewardCommitted = this.wallet.win(this.runId, this.run.level.id, R.rating(this.run), reward.total, milestone, this.table);
          }
          this.modal(won ? "Garden Blossomed!" : "A thirsty little garden");
          if (won) {
            this.text(Array(R.rating(this.run) + 1).join("*  "), 0, 145, 55);
            this.text(reward.total + " Nectar Coins", 0, 60, 32);
            if (this.rewardCommitted) {
              var doubled = this.wallet.data.settled.indexOf(this.runId + ":double") >= 0;
              this.button(doubled ? "REWARD DOUBLED" : this.pendingAds[this.owner + ":double"] ? "RETRY SAVE" : "WATCH AD x2", 0, -50, 420, 90, C.green, function() {
                if (doubled) {
                  self.toast("This reward has already been doubled.");
                  return;
                }
                var earnedRun = self.runId;
                self.ad(function() {
                  if (self.wallet.commit(function(d) {
                    if (d.settled.indexOf(earnedRun + ":double") >= 0) return false;
                    d.coins += reward.total;
                    d.settled.push(earnedRun + ":double");
                  })) {
                    "won" === self.page && self.runId === earnedRun && self.result();
                    return true;
                  }
                  self.toast(self.wallet.error || "Already claimed.");
                  return false;
                }, "double");
              });
            } else this.button("Retry save", 0, -50, 420, 90, C.pink, this.result.bind(this));
            this.button(70 === this.run.level.id ? "FINISH" : "NEXT", 0, -175, 330, 90, C.gold, function() {
              self.rewardCommitted ? 70 === self.run.level.id ? self.home() : self.startLevel(self.run.level.id + 1) : self.toast(self.wallet.error);
            });
          } else {
            this.text(this.run.water + " / 24 droplets reached the flowers.", 0, 130, 26);
            this.button("RETRY - FREE", 0, 5, 410, 90, C.pink, function() {
              self.startLevel(self.run.level.id);
            });
            this.button("REVIVE +3 MOVES", 0, -120, 430, 85, C.green, function() {
              if (self.run.revived) {
                self.toast("One revive per garden. Retry is always free.");
                return;
              }
              self.ad(function() {
                if (R.revive(self.run)) {
                  self.page = "game";
                  self.drawGame();
                  return true;
                }
                return false;
              }, "revive");
            });
          }
          this.button("Home", 0, -290, 230, 75, C.blue, this.home.bind(this));
          this.wallet.error && this.toast(this.wallet.error);
        },
        ad: function ad(grant, placement) {
          var self = this, owner = this.owner, key = owner + ":" + placement;
          function settle() {
            if (false !== grant()) {
              delete self.pendingAds[key];
              return;
            }
            self.pendingAds[key] = {
              grant: grant,
              placement: placement
            };
            "double" === placement && "won" === self.page && self.result();
            self.toast("Reward earned. Keep this game open and retry saving from Home.");
          }
          if (this.pendingAds[key]) {
            settle();
            return;
          }
          if (Object.keys(this.pendingAds).length) {
            this.toast("Save your earned reward from Home before watching another video.");
            return;
          }
          this.toast("Checking video... You can return Home to cancel.");
          this.ads.request(owner, function(completed, reason) {
            if (!self.alive || self.owner !== owner) return;
            completed ? settle() : self.toast(Platform.playerMessage(reason));
          }, placement);
        },
        saveEarned: function saveEarned() {
          var keys = Object.keys(this.pendingAds), self = this;
          if (!keys.length) return;
          var receipt = this.pendingAds[keys[0]];
          if (false !== receipt.grant()) {
            delete this.pendingAds[keys[0]];
            this.home();
            this.toast("Your earned reward has been saved.");
          } else {
            this.home();
            this.toast(this.wallet.error || "Save is still unavailable. Your earned reward is kept for this session.");
          }
        },
        recoverSave: function recoverSave() {
          this.navigate("recovery");
          this.modal("Recover local save");
          var self = this;
          this.text("Your saved data could not be read.", 0, 130, 28);
          var explanation = this.text("Keep an exact backup on this device, then start with fresh progress. Nothing is reset until the backup is verified.", 0, 20, 25, null, 530);
          explanation.node.height = 110;
          this.button("RETRY READ", 0, -80, 420, 80, C.blue, this.load.bind(this));
          this.button("BACK UP & START FRESH", 0, -180, 510, 80, C.pink, function() {
            self.wallet.recoverFresh() ? self.home() : self.toast(self.wallet.error);
          });
          this.button("Cancel", 0, -280, 240, 70, C.gold, this.home.bind(this));
        },
        gift: function gift() {
          this.navigate("gift");
          this.modal("A basket of nectar");
          var self = this;
          var amount = Rewards.giftReward(30, this.table, this.wallet.data.owned, this.wallet.data.highest - 1);
          this.text(amount + " Nectar Coins", 0, 105, 35);
          this.text(this.wallet.data.gift.charges ? "A little boost for your next outfit." : "Finish a round to refill this basket.", 0, 15, 25);
          this.button("WATCH AD", 0, -100, 400, 90, C.green, function() {
            if (!Rewards.giftAvailable(self.wallet.data.gift)) {
              self.toast("Finish a round to refresh this basket.");
              return;
            }
            var earnedId = "gift:" + Date.now() + ":" + self.owner, beforeSettled = self.wallet.data.settled.slice();
            self.ad(function() {
              if (self.wallet.commit(function(d) {
                if (d.settled.indexOf(earnedId) >= 0) return false;
                var refilled = d.settled.some(function(id) {
                  return beforeSettled.indexOf(id) < 0;
                });
                d.coins += amount;
                refilled || (d.gift = {
                  charges: 0
                });
                d.settled.push(earnedId);
                d.settled = d.settled.slice(-300);
              })) {
                "gift" === self.page && self.gift();
                return true;
              }
              self.toast(self.wallet.error);
              return false;
            }, "gift");
          });
          this.button("Home", 0, -260, 230, 80, C.gold, this.home.bind(this));
        },
        wardrobe: function wardrobe(group, page) {
          this.navigate("wardrobe");
          this.topbar();
          var self = this;
          this.text("Mabel's Wardrobe", 0, 410, 40);
          this.button("Outfits", -155, 315, 270, 75, "skin" === group ? C.pink : C.paper, function() {
            self.wardrobe("skin", 0);
          });
          this.button("Scenes", 155, 315, 270, 75, "background" === group ? C.blue : C.paper, function() {
            self.wardrobe("background", 0);
          });
          var items = this.table.items.filter(function(i) {
            return i.group === group;
          });
          items.slice(4 * page, 4 * page + 4).forEach(function(item, k) {
            var owned = self.wallet.data.owned.indexOf(item.id) >= 0, equipped = self.wallet.data.equipped.indexOf(item.id) >= 0;
            var x = k % 2 ? 155 : -155, y = k < 2 ? 125 : -135;
            self.shape("item-" + item.id, x, y, 280, 225, C.paper, 24);
            self.text(item.name, x, y + 65, 27, null, 255);
            self.text("+" + (item.bonus ? item.bonus.pct : 0) + "% nectar", x, y + 15, 25);
            self.button(equipped ? "Equipped" : owned ? "Equip" : "level" === item.unlock ? "Clear Lv.70" : "Buy " + item.coins, x, y - 65, 250, 65, owned ? C.green : C.gold, function() {
              self.wallet.buyOrEquip(item.id) ? self.wardrobe(group, page) : self.toast(self.wallet.error || ("level" === item.unlock ? "Complete the final garden." : "You need more Nectar Coins."));
            });
          });
          this.text(page + 1 + " / " + Math.ceil(items.length / 4), 0, -350, 26);
          this.button("<", -235, -360, 90, 75, C.blue, function() {
            0 === page ? self.toast("This is the first collection page.") : self.wardrobe(group, page - 1);
          });
          this.button(">", 235, -360, 90, 75, C.blue, function() {
            page === Math.ceil(items.length / 4) - 1 ? self.toast("This is the final collection page.") : self.wardrobe(group, page + 1);
          });
          this.button("Home", 0, -510, 250, 85, C.gold, this.home.bind(this));
        },
        settings: function settings(tab) {
          this.navigate("settings");
          this.modal("Settings");
          var self = this;
          this.button("General", -145, 150, 250, 70, "general" === tab ? C.blue : C.paper, function() {
            self.settings("general");
          });
          this.button("Sound", 145, 150, 250, 70, "sound" === tab ? C.blue : C.paper, function() {
            self.settings("sound");
          });
          if ("general" === tab) {
            this.button("How to Play", 0, 45, 470, 75, C.green, this.instructions.bind(this));
            this.button("Haptics: " + (this.wallet.data.sound.haptics ? "On" : "Off"), 0, -55, 470, 75, C.pink, function() {
              self.setting("haptics", !self.wallet.data.sound.haptics, tab);
            });
            this.button("Reduce motion: " + (this.wallet.data.sound.reducedMotion ? "On" : "Off"), 0, -155, 470, 75, C.gold, function() {
              self.setting("reducedMotion", !self.wallet.data.sound.reducedMotion, tab);
            });
            this.button("About", 0, -245, 470, 70, C.paper, this.about.bind(this));
          } else [ "music", "sfx" ].forEach(function(kind, i) {
            var y = 35 - 160 * i;
            self.button(("music" === kind ? "Music" : "Sound effects") + ": " + (self.wallet.data.sound[kind] ? "On" : "Off"), 0, y, 470, 70, C.green, function() {
              self.setting(kind, !self.wallet.data.sound[kind], tab);
            });
            self.button("-", -210, y - 75, 65, 60, C.blue, function() {
              self.setting(kind + "Volume", Math.max(0, self.wallet.data.sound[kind + "Volume"] - 1), tab);
            });
            self.text(self.wallet.data.sound[kind + "Volume"] + " / 10", 0, y - 75, 27);
            self.button("+", 210, y - 75, 65, 60, C.blue, function() {
              self.setting(kind + "Volume", Math.min(10, self.wallet.data.sound[kind + "Volume"] + 1), tab);
            });
          });
          this.button("Home", 0, -325, 250, 70, C.gold, this.home.bind(this));
        },
        instructions: function instructions() {
          this.navigate("instructions");
          this.modal("How to Play");
          [ "Slide tiles into the adjacent gap. S and G stay fixed.", "Connect S to G, then tap WATER to deliver 24 droplets.", "Wooden deflectors turn water. Gates open after 10 drops.", "Reach both flower pads within 1.2 seconds to unlock G.", "Use the shown move target for three stars. Retry is free.", "Spills into empty bush sockets grow thorns." ].forEach(function(line, i) {
            this.text(line, 0, 150 - 65 * i, 24, null, 550);
          }, this);
          this.button("Back", 0, -290, 320, 75, C.blue, this.settings.bind(this, "general"));
        },
        about: function about() {
          this.navigate("about");
          this.modal("About this garden");
          this.text("Mabel's Meadow Maze  0.1.0", 0, 140, 30);
          this.text("Built with Cocos Creator 2.4.15", 0, 65, 25);
          var credits = this.text("Original puzzle layouts and implementation, based on the supplied Meadow Maze starter design.", 0, -45, 25, null, 520);
          credits.node.height = 120;
          this.button("Back", 0, -265, 320, 80, C.blue, this.settings.bind(this, "general"));
        },
        setting: function setting(key, value, tab) {
          this.wallet.commit(function(d) {
            d.sound[key] = value;
          }) ? this.settings(tab) : this.toast(this.wallet.error);
        },
        toast: function toast(message) {
          this.toastNode && cc.isValid(this.toastNode) && this.toastNode.destroy();
          this.toastNode = this.shape("feedback", 0, -605, 680, 56, C.paper, 15);
          this.text(message, 0, 0, 21, this.toastNode, 660);
        },
        onHide: function onHide() {
          "game" === this.page && this.pause();
        },
        onDisable: function onDisable() {
          this.touch = null;
        },
        onEnable: function onEnable() {
          this.touch = null;
        },
        onShow: function onShow() {
          "loading" === this.page && this.loadDeadline && (this.loadDeadline = Date.now() + 180000);
        },
        haptic: function haptic() {
          if (!this.wallet.data.sound.haptics) return;
          var host = environment();
          var sdk = [ host.TTMinis && host.TTMinis.game, host.tt, host.wx ].find(function(s) {
            return s && "function" === typeof s.vibrateShort;
          });
          try {
            sdk ? sdk.vibrateShort({
              fail: function fail() {}
            }) : host.navigator && "function" === typeof host.navigator.vibrate && host.navigator.vibrate(12);
          } catch (e) {}
        },
        update: function update(dt) {
          this.ads.update();
          if (this.loadDeadline && Date.now() >= this.loadDeadline && (!this.startup || Date.now() - this.startup.lastActivity() >= 30000)) {
            this.owner++;
            this.loadingError();
          }
          if ("game" !== this.page || !this.run) return;
          var before = this.run.state;
          R.tick(this.run, dt);
          this.sync();
          if (this.animating) return;
          if (this.run.waterView && this.flowG) {
            var g = this.flowG, self = this, scale = this.cell / this.run.level.cellSize;
            g.clear();
            g.fillColor = color("#399fcb");
            this.run.waterView.droplets.forEach(function(p) {
              if ("delivered" === p.state || "spilled" === p.state) return;
              g.circle(self.boardLeft + p.x * scale, self.boardTop - p.y * scale, 2.5 * scale);
              g.fill();
            });
            this.tiles.forEach(function(t) {
              self.drawFeature(t.feature, t.index);
            });
          }
          before === this.run.state || "won" !== this.run.state && "lost" !== this.run.state || this.result();
        },
        onDestroy: function onDestroy() {
          this.alive = false;
          this.loadTask && this.loadTask.cancel();
          this.startup && this.startup.onRetry(null);
          this.ads.cancelOwner(this.owner);
          this.owner++;
          cc.game.off(cc.game.EVENT_HIDE, this.onHide, this);
          cc.game.off(cc.game.EVENT_SHOW, this.onShow, this);
        }
      });
      return Game;
    });
    cc._RF.pop();
  }, {
    "../modules/AdRewards": "AdRewards",
    "./MeadowFlow": "MeadowFlow",
    "./MeadowLoader": "MeadowLoader",
    "./MeadowPlatform": "MeadowPlatform",
    "./MeadowPresentation": "MeadowPresentation",
    "./MeadowRules": "MeadowRules",
    "./MeadowServices": "MeadowServices"
  } ],
  MeadowLoader: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "4b2d2Z7AFDLDerTE6hbZigw", "MeadowLoader");
    "use strict";
    (function(root, factory) {
      var api = factory();
      "undefined" !== typeof module && module.exports ? module.exports = api : root.MeadowLoader = api;
    })("undefined" !== typeof globalThis ? globalThis : "undefined" !== typeof window ? window : void 0, function() {
      var FILES = [ "meadow_levels", "level_plan", "unlock_table" ];
      var roots = [], sequence = 0;
      function rootSlot(root) {
        for (var i = 0; i < roots.length; i++) if (roots[i].root === root) return roots[i];
        var slot = {
          root: root,
          current: null
        };
        roots.push(slot);
        return slot;
      }
      function error(code, file) {
        var e = new Error("cancelled" === code || "superseded" === code || "expired" === code ? "Configuration load cancelled." : "Unable to load game configuration" + (file ? ": " + file : "") + ".");
        e.name = "cancelled" === code || "superseded" === code || "expired" === code ? "AbortError" : "ConfigurationLoadError";
        e.code = code;
        file && (e.file = file);
        return e;
      }
      function parse(value, file) {
        if ("string" === typeof value) try {
          value = JSON.parse(value.replace(/^\uFEFF/, ""));
        } catch (_) {
          throw error("invalid-json", file);
        }
        var kind = Object.prototype.toString.call(value);
        if (!value || "[object Object]" !== kind && "[object Array]" !== kind) throw error("invalid-data", file);
        return value;
      }
      function fileSystem(root) {
        if (!root) return null;
        var candidates = [ root.TTMinis && root.TTMinis.game, root.tt, root.wx ];
        for (var i = 0; i < candidates.length; i++) {
          var sdk = candidates[i];
          if (!sdk || "function" !== typeof sdk.getFileSystemManager) continue;
          try {
            var fs = sdk.getFileSystemManager.call(sdk);
            if (fs && "function" === typeof fs.readFile) return fs;
          } catch (_) {}
        }
        return null;
      }
      function load(root, generation, onProgress) {
        var slot = rootSlot(root);
        slot.current && slot.current.cancel("superseded");
        var id = "meadow-config-" + Date.now().toString(36) + "-" + ++sequence;
        var resolveLoad, rejectLoad, values = [], completed = 0, seen = {}, controller = null, settled = false;
        var promise = new Promise(function(resolve, reject) {
          resolveLoad = resolve;
          rejectLoad = reject;
        });
        function active() {
          return !settled && slot.current === operation;
        }
        function finishFailure(e) {
          if (!active()) return;
          settled = true;
          slot.current = null;
          if (controller) try {
            controller.abort();
          } catch (_) {}
          rejectLoad(e);
        }
        var operation = {
          id: id,
          promise: promise,
          cancel: function cancel(reason) {
            var code = "superseded" === reason || "expired" === reason ? reason : "cancelled";
            finishFailure(error(code));
          }
        };
        slot.current = operation;
        function failed(index, code) {
          active() && !seen[index] && finishFailure(error(code || "read-failed", "config/" + FILES[index] + ".json"));
        }
        function success(index, raw) {
          if (!active() || seen[index]) return;
          var file = "config/" + FILES[index] + ".json", data;
          try {
            data = parse(raw, file);
          } catch (e) {
            finishFailure(e);
            return;
          }
          seen[index] = true;
          values[index] = data;
          completed++;
          if ("function" === typeof onProgress) try {
            onProgress(completed, FILES.length, {
              id: id,
              generation: generation,
              file: file,
              ratio: completed / FILES.length
            });
          } catch (_) {
            finishFailure(error("progress-callback-failed", file));
            return;
          }
          if (!active()) return;
          if (completed === FILES.length) {
            settled = true;
            slot.current = null;
            resolveLoad(values);
          }
        }
        var fs = fileSystem(root);
        if (fs) FILES.forEach(function(name, index) {
          if (!active()) return;
          function receive(result) {
            if (!active() || seen[index]) return;
            if (!result || !Object.prototype.hasOwnProperty.call(result, "data")) {
              failed(index, "missing-data");
              return;
            }
            success(index, result.data);
          }
          try {
            var returned = fs.readFile.call(fs, {
              filePath: "config/" + name + ".json",
              encoding: "utf8",
              success: receive,
              fail: function fail() {
                failed(index);
              },
              complete: function complete(result) {
                if (!active() || seen[index]) return;
                result && Object.prototype.hasOwnProperty.call(result, "data") && (!result.errMsg || /:ok$/.test(result.errMsg)) ? receive(result) : failed(index, "read-incomplete");
              }
            });
            returned && "function" === typeof returned.then && returned.then(receive, function() {
              failed(index);
            });
          } catch (_) {
            failed(index, "read-threw");
          }
        }); else if (root && "function" === typeof root.fetch && "function" === typeof root.AbortController) {
          try {
            controller = new root.AbortController();
          } catch (_) {
            finishFailure(error("abort-controller-unavailable"));
          }
          FILES.forEach(function(name, index) {
            if (!active()) return;
            var file = "config/" + name + ".json";
            var url = file + "?attempt=" + encodeURIComponent(String(generation)) + "&request=" + encodeURIComponent(id);
            try {
              Promise.resolve(root.fetch.call(root, url, {
                cache: "no-store",
                signal: controller.signal
              })).then(function(response) {
                if (!active() || seen[index]) return;
                if (!response || true !== response.ok || "function" !== typeof response.text) throw error("http-failed", file);
                return response.text();
              }).then(function(text) {
                active() && success(index, text);
              }, function() {
                failed(index, "fetch-failed");
              });
            } catch (_) {
              failed(index, "fetch-threw");
            }
          });
        } else finishFailure(error("unsupported-transport"));
        return operation;
      }
      return {
        load: load
      };
    });
    cc._RF.pop();
  }, {} ],
  MeadowPictureFont: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "6f6034snJZDTpa/ajlzd1zr", "MeadowPictureFont");
    "use strict";
    var NAMED = {
      slash: "/",
      plus: "+",
      minus: "-",
      percent: "%",
      period: ".",
      comma: ",",
      colon: ":",
      exclamation: "!",
      question: "?",
      apostrophe: "'",
      ampersand: "&",
      star: "\u2605"
    };
    function normalize(value) {
      return (null === value || void 0 === value ? "" : String(value)).toUpperCase().replace(/\*/g, "\u2605");
    }
    function textureDimension(texture, name, getter) {
      var value = texture[name];
      value > 0 || "function" !== typeof texture[getter] || (value = texture[getter]());
      return "number" === typeof value && isFinite(value) && value > 0 ? value : 0;
    }
    function validRect(rect, width, height) {
      return Array.isArray(rect) && 4 === rect.length && rect.every(function(n) {
        return "number" === typeof n && isFinite(n);
      }) && rect[0] >= 0 && rect[1] >= 0 && rect[2] > 0 && rect[3] > 0 && rect[0] + rect[2] <= width && rect[1] + rect[3] <= height;
    }
    function create(manifest, textures, sheetKey, prefix) {
      if ("undefined" === typeof cc || !cc.BitmapFont || !cc.SpriteFrame) return null;
      if (!manifest || !manifest.frames || !textures || !textures[sheetKey]) return null;
      prefix = void 0 === prefix ? "glyph_" : String(prefix);
      var texture = textures[sheetKey];
      var width = textureDimension(texture, "width", "getPixelWidth");
      var height = textureDimension(texture, "height", "getPixelHeight");
      if (!width || !height) return null;
      var glyphs = [], capHeight = 0;
      Object.keys(manifest.frames).forEach(function(key) {
        if (0 !== key.indexOf(prefix)) return;
        var id = key.slice(prefix.length), character = /^[A-Z0-9]$/.test(id) ? id : NAMED[id];
        var frame = manifest.frames[key];
        if (!character || !frame || frame.sheet !== sheetKey || !validRect(frame.rect, width, height)) return;
        glyphs.push({
          id: id,
          character: character,
          rect: frame.rect.slice()
        });
        /^[A-Z0-9]$/.test(id) && (capHeight = Math.max(capHeight, frame.rect[3]));
      });
      if (!glyphs.length || !capHeight) return null;
      var baseline = capHeight, gap = Math.max(1, Math.round(.055 * capHeight));
      var spaceAdvance = Math.max(1, Math.round(.34 * capHeight));
      var dictionary = {}, bottom = baseline;
      glyphs.forEach(function(glyph) {
        var r = glyph.rect, h = r[3], y = baseline - h;
        "comma" === glyph.id ? y = baseline - .62 * h : "apostrophe" === glyph.id ? y = 0 : "plus" !== glyph.id && "minus" !== glyph.id && "colon" !== glyph.id && "star" !== glyph.id || (y = .5 * baseline - .5 * h);
        y = Math.max(0, Math.round(y));
        bottom = Math.max(bottom, y + h);
        dictionary[glyph.character.charCodeAt(0)] = {
          rect: cc.rect(r[0], r[1], r[2], h),
          xOffset: 0,
          yOffset: y,
          xAdvance: r[2] + gap
        };
      });
      dictionary[32] = {
        rect: cc.rect(0, 0, 0, 0),
        xOffset: 0,
        yOffset: baseline,
        xAdvance: spaceAdvance
      };
      var lineHeight = Math.ceil(Math.max(1.16 * capHeight, bottom + gap));
      var sprite = new cc.SpriteFrame(texture, cc.rect(0, 0, width, height));
      sprite.name = "txt_generated_lettering";
      var font = new cc.BitmapFont();
      font.name = "txt_generated_lettering";
      font.spriteFrame = sprite;
      font.fontSize = capHeight;
      font._fntConfig = {
        fontSize: capHeight,
        commonHeight: lineHeight,
        atlasName: sprite.name,
        fontDefDictionary: dictionary,
        kerningDict: {}
      };
      font._pictureMetrics = {
        baseline: baseline,
        capHeight: capHeight,
        lineHeight: lineHeight,
        letterGap: gap,
        spaceAdvance: spaceAdvance,
        sheet: sheetKey
      };
      font.onLoad();
      return font;
    }
    function canRender(font, text) {
      if (!font || !font._fntConfig || !font._fntConfig.fontDefDictionary || !font._fontDefDictionary) return false;
      text = null === text || void 0 === text ? "" : String(text);
      var dictionary = font._fntConfig.fontDefDictionary;
      for (var i = 0; i < text.length; i++) {
        var character = text.charAt(i);
        if ("\n" === character || "\r" === character) continue;
        if (!Object.prototype.hasOwnProperty.call(dictionary, character.charCodeAt(0))) return false;
      }
      return true;
    }
    module.exports = {
      create: create,
      normalize: normalize,
      canRender: canRender
    };
    cc._RF.pop();
  }, {} ],
  MeadowPlatform: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "3a2eflYA4TBbwr7aGj2u594", "MeadowPlatform");
    "use strict";
    (function(root, factory) {
      var api = factory();
      "undefined" !== typeof module && module.exports ? module.exports = api : root.MeadowPlatform = api;
    })("undefined" !== typeof globalThis ? globalThis : "undefined" !== typeof window ? window : void 0, function() {
      var CONFIG = {
        applicationMode: "shared-test",
        appId: "7683427172773644296",
        clientKey: "mgq7o8c3rbhdx2kv",
        rewardedPlacementId: "ad7683064432721709074",
        rewardedPlacements: [ "ad7683064432721709074", "ad7683076047361067016", "ad7683199506230233095" ],
        placements: {
          revive: "ad7683064432721709074",
          double: "ad7683076047361067016",
          gift: "ad7683199506230233095"
        }
      };
      var nativeActive = null, serial = 0;
      function resolveSDK(root) {
        if (!root) return null;
        var candidates = [ root.TTMinis && root.TTMinis.game, root.tt, root.wx ];
        for (var i = 0; i < candidates.length; i++) if (candidates[i] && "function" === typeof candidates[i].createRewardedVideoAd) return candidates[i];
        return null;
      }
      function playerMessage(reason) {
        var text = "string" === typeof reason ? reason.trim() : "";
        var messages = {
          completed: "Your video is complete. Your reward is ready.",
          cancelled: "The video was closed early. No reward was granted.",
          failed: "The video could not start. Please try again later.",
          unavailable: "Ads are unavailable here. You can keep playing for free.",
          unsupported: "Ads are unavailable here. You can keep playing for free.",
          timeout: "The video took too long. No reward was granted. You can keep playing.",
          busy: "A video is still open. Close it before trying again.",
          "native-session-busy": "A video is still open. Close it before trying again.",
          "placement-unavailable": "Ads are unavailable here. You can keep playing for free.",
          "sdk-error": "The video could not start. Please try again later.",
          "show-rejected": "The video could not start. Please try again later.",
          "sdk-threw": "The video could not start. Please try again later."
        };
        if (Object.prototype.hasOwnProperty.call(messages, text)) return messages[text];
        if (text.length <= 200 && /\s/.test(text) && /[.!?]$/.test(text) && !/[\r\n{}]/.test(text)) return text;
        return messages.failed;
      }
      function createHost(root, config, options) {
        config = config || CONFIG;
        options = options || {};
        var now = options.now || Date.now, requestMs = options.requestMs || 15e3, playingMs = options.playingMs || 18e4;
        var owned = null, _diagnostics = [];
        function note(record, code, error) {
          var item = {
            at: now(),
            request: record ? record.id : 0,
            placement: record ? record.placement : "",
            phase: record ? record.phase : "idle",
            code: code
          };
          error && Number.isFinite(error.errorCode) && (item.errorCode = error.errorCode);
          _diagnostics.push(item);
          _diagnostics.length > 50 && _diagnostics.shift();
          if (options.onDiagnostic) try {
            options.onDiagnostic(item);
          } catch (_) {}
        }
        function deliver(record, status) {
          if (record.businessDone) return;
          record.businessDone = true;
          var done = record.done;
          record.done = null;
          done && done(status);
        }
        function detach(record) {
          if (!record.ad) return;
          if (record.closeSubscribed && "function" === typeof record.ad.offClose) try {
            record.ad.offClose(record.onClose);
          } catch (_) {}
          if (record.errorSubscribed && "function" === typeof record.ad.offError) try {
            record.ad.offError(record.onError);
          } catch (_) {}
          record.closeSubscribed = false;
          record.errorSubscribed = false;
        }
        function terminal(record, status, code, error) {
          if (record.closed) return;
          record.closed = true;
          note(record, code, error);
          detach(record);
          nativeActive === record && (nativeActive = null);
          owned === record && (owned = null);
          record.phase = "closed";
          deliver(record, status);
        }
        function revoke(record, reason) {
          if (!record || record.closed || record.businessDone) return;
          note(record, reason);
          deliver(record, reason);
        }
        var host = {
          showRewarded: function showRewarded(done, placement) {
            var sdk = resolveSDK(root), key = placement || "revive";
            var adUnitId = config.placements && config.placements[key];
            if (!sdk || !adUnitId || !Array.isArray(config.rewardedPlacements) || config.rewardedPlacements.indexOf(adUnitId) < 0) {
              note(null, sdk ? "placement-unavailable" : "unsupported");
              done("unavailable");
              return function() {};
            }
            if (nativeActive) {
              note(nativeActive, "native-session-busy");
              done("unavailable");
              return function() {};
            }
            var record = {
              id: ++serial,
              placement: key,
              phase: "requesting",
              deadline: now() + requestMs,
              done: done,
              businessDone: false,
              closed: false,
              ad: null,
              closeSubscribed: false,
              errorSubscribed: false
            };
            nativeActive = record;
            owned = record;
            note(record, "request-start");
            record.onClose = function(result) {
              terminal(record, result && true === result.isEnded ? "completed" : "cancelled", result && true === result.isEnded ? "video-completed" : "video-cancelled");
            };
            record.onError = function(error) {
              terminal(record, "failed", "sdk-error", error);
            };
            try {
              record.ad = sdk.createRewardedVideoAd.call(sdk, {
                adUnitId: adUnitId
              });
              if (!record.ad || "function" !== typeof record.ad.onClose || "function" !== typeof record.ad.onError || "function" !== typeof record.ad.show) throw Error("Unsupported ad instance");
              record.closeSubscribed = true;
              record.ad.onClose(record.onClose);
              if (!record.closed) {
                record.errorSubscribed = true;
                record.ad.onError(record.onError);
              }
              if (!record.closed) {
                var shown = record.ad.show();
                shown && "function" === typeof shown.then && shown.then(function() {
                  if (record.closed) return;
                  record.phase = "playing";
                  record.deadline = now() + playingMs;
                  note(record, "display-started");
                }, function(error) {
                  terminal(record, "failed", "show-rejected", error);
                });
              }
            } catch (error) {
              terminal(record, "failed", "sdk-threw", error);
            }
            return function() {
              revoke(record, "cancelled");
            };
          },
          update: function update() {
            owned && !owned.closed && !owned.businessDone && now() >= owned.deadline && revoke(owned, "timeout");
          },
          status: function status() {
            var sdk = resolveSDK(root), record = nativeActive;
            return {
              available: !!sdk,
              busy: !!record,
              phase: record ? record.phase : "idle",
              abandoned: !!(record && record.businessDone)
            };
          },
          diagnostics: function diagnostics() {
            return _diagnostics.slice();
          }
        };
        return host;
      }
      return {
        config: CONFIG,
        createHost: createHost,
        resolveSDK: resolveSDK,
        playerMessage: playerMessage
      };
    });
    cc._RF.pop();
  }, {} ],
  MeadowPresentation: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "ef195/XqLZVfbS0G8Z0vv/C", "MeadowPresentation");
    "use strict";
/* Web delivery: required artwork must finish before the home scene is shown. */
var R = require('./MeadowRules');
var PictureFont = require('./MeadowPictureFont');
var frames = {}, manifest = null, font = null, pending, manifestPromise;
var sheetPromises = {}, textures = {}, pictureFont = null, numberFont = null;
function color(v) { return new cc.Color().fromHEX(v); }
function artProgress() {
  var keys = Object.keys(manifest.sheets).filter(function(k) { return manifest.sheets[k].core !== false; });
  var done = keys.filter(function(k) { return !!textures[k]; }).length;
  if (typeof window !== 'undefined') {
    window.MeadowArtStatus = { loaded: done, total: keys.length, sheets: Object.keys(textures), frames: Object.keys(frames).length };
    if (window.MeadowStartup) window.MeadowStartup.artProgress(done, keys.length);
  }
}
function loadSheet(key) {
  if (textures[key]) return Promise.resolve();
  if (sheetPromises[key]) return sheetPromises[key];
  var promise = new Promise(function(resolve, reject) {
    var settled = false;
    function checkStall() {
      if (settled) return;
      var startup = typeof window !== 'undefined' && window.MeadowStartup;
      if (startup && Date.now() - startup.lastActivity() < 30000) { timer = setTimeout(checkStall, 30000); return; }
      finish(new Error('Artwork timed out: ' + key));
    }
    var timer = setTimeout(checkStall, 180000);
    function finish(error) {
      if (settled) return;
      settled = true; clearTimeout(timer);
      if (error) { delete sheetPromises[key]; reject(error); }
      else { artProgress(); resolve(); }
    }
    cc.resources.load('art/' + manifest.sheets[key].file, cc.Texture2D, function(error, texture) {
      if (settled) return;
      if (error || !texture) { finish(error || new Error('Artwork missing: ' + key)); return; }
      try {
        Object.keys(manifest.frames).forEach(function(id) {
          var f = manifest.frames[id]; if (f.sheet !== key) return;
          var frame = new cc.SpriteFrame(texture, new cc.Rect(f.rect[0], f.rect[1], f.rect[2], f.rect[3]));
          frame.name = f.text ? 'txt_' + id : id; frames[id] = frame;
        });
        textures[key] = texture;
        if (key === 'garden-lettering') {
          pictureFont = PictureFont.create(manifest, textures, key, 'glyph_');
          if (!pictureFont) throw new Error('Lettering unavailable');
          for (var c = 65; c <= 90; c++) pictureFont._fntConfig.fontDefDictionary[c + 32] = pictureFont._fntConfig.fontDefDictionary[c];
          pictureFont.onLoad();
        }
        if (key === 'garden-numbers') numberFont = PictureFont.create(manifest, textures, key, 'digit_');
        finish();
      } catch (e) { delete textures[key]; finish(e); }
    });
  });
  sheetPromises[key] = promise; return promise;
}
function ensureIds(ids) {
  if (!manifest) return Promise.reject(new Error('Artwork manifest unavailable'));
  var keys = [];
  ids.forEach(function(id) { var f = manifest.frames[id]; if (f && keys.indexOf(f.sheet) < 0) keys.push(f.sheet); });
  return Promise.all(keys.map(loadSheet));
}
function ensureItems(items) { return ensureIds(items.map(function(i) { return (i.group === 'skin' ? 'skin_' : 'scene_') + i.order; })); }
function loadManifest() {
  if (manifest) return Promise.resolve(manifest);
  if (manifestPromise) return manifestPromise;
  manifestPromise = new Promise(function(resolve, reject) {
    var settled = false, timer = setTimeout(function() { finish(new Error('Artwork manifest timed out')); }, 60000);
    function finish(error, asset) {
      if (settled) return; settled = true; clearTimeout(timer);
      if (error || !asset || !asset.json || !asset.json.sheets || !asset.json.frames) {
        manifestPromise = null; reject(error || new Error('Invalid artwork manifest')); return;
      }
      manifest = asset.json; resolve(manifest);
    }
    cc.resources.load('art/manifest', cc.JsonAsset, finish);
  });
  return manifestPromise;
}
function prepare() {
  if (pending) return pending;
  cc.resources.load('fonts/Nunito', cc.TTFFont, function(error, asset) { if (!error) font = asset; });
  pending = loadManifest().then(function() {
    artProgress();
    return Promise.all(Object.keys(manifest.sheets).filter(function(key) { return manifest.sheets[key].core !== false; }).map(loadSheet));
  }).catch(function(error) { pending = null; throw error; });
  return pending;
}

function install(Game) {
  var p = Game.prototype, original = {};
  ['text','shape','button','background','bunny','home','update','drawTile','drawGame','settings','wardrobe'].forEach(function (key) { original[key] = p[key]; });
  p.art = function (id, x, y, w, h, parent, stretch) {
    var f = frames[id]; if (!f) return null;
    var n = new cc.Node(id); (parent || this.root).addChild(n); n.setPosition(x, y);
    var s = n.addComponent(cc.Sprite); s.spriteFrame = f; s.sizeMode = cc.Sprite.SizeMode.CUSTOM;
    var r = f.getRect(), ratio = Math.min(w / r.width, h / r.height);
    n.setContentSize(stretch ? w : r.width * ratio, stretch ? h : r.height * ratio);
    if(stretch&&['panel','card','pill','board'].indexOf(id)>=0){f.insetLeft=f.insetRight=r.width*.15;f.insetTop=f.insetBottom=r.height*.15;s.type=cc.Sprite.Type.SLICED;}
    return n;
  };
  p.text = function (value, x, y, size, parent, width) {
    value=String(value).replace(/^3 stars: clear in (\d+) moves or fewer, without revive\.$/,'3★: $1 MOVES OR FEWER / NO REVIVE');
    var label = original.text.call(this, value, x, y, size, parent, width);
    var normalized=PictureFont.normalize(value),paragraph=String(value).length>70||this.page==='loading',displayFont=/^[\d\s/+:★%.\-SG]+$/.test(normalized)&&PictureFont.canRender(numberFont,normalized)?numberFont:pictureFont;
    if(!paragraph&&PictureFont.canRender(displayFont,normalized)){
      // Cocos BMFont applies fontSize/originalFontSize to lineHeight itself.
      // Supplying an already-scaled value overlaps wrapped lines.
      label.useSystemFont=false;label.font=displayFont;label.string=normalized;label.lineHeight=displayFont._fntConfig.commonHeight;label.node.color=cc.Color.WHITE;
    }
    else if (font) { label.useSystemFont = false; label.font = font; }
    else label.fontFamily = 'Trebuchet MS';
    if(String(value).length>38)label.node.height=size*2.8;
    return label;
  };
  p.background = function () {
    var scene = this.wallet && this.table.items.find(function (i) { return i.group === 'background' && this.wallet.data.equipped.indexOf(i.id) >= 0; }, this);
    var id = scene ? 'scene_' + scene.order : 'scene_1', f = frames[id];
    if (!f) { original.background.call(this); return; }
    var visible = cc.view.getVisibleSize(), rect = f.getRect(), scale = Math.max(visible.width / rect.width, visible.height / rect.height);
    this.art(id, 0, 0, rect.width * scale, rect.height * scale, null, true);
    this.homeHero = null; this.homeTitle = null;
  };
  p.shape = function (name, x, y, w, h, fill, radius, parent) {
    var id = name === 'board' ? 'board' : name.indexOf('socket-') === 0 ? 'socket' : name === 'modal' || name.indexOf('hud-')===0 || name === 'progress-bar' || name === 'feedback' || name.indexOf('item-') === 0 || (this.page !== 'loading' && name.indexOf('btn-')===0) ? 'panel' : name === 'nectar-bar' ? 'pill' : null;
    var n = id && this.art(id, x, y, w, h, parent, true);
    // These compact surfaces are smaller than the source frame's slicing
    // borders. Nine-slicing collapses the clean center and enlarges flowers
    // behind the labels. Scale the complete existing illustration instead.
    if(n && (name.indexOf('item-') === 0 || (this.page === 'map' && name.indexOf('btn-') === 0))) {
      n.getComponent(cc.Sprite).type = cc.Sprite.Type.SIMPLE;
    }
    return n || original.shape.call(this, name, x, y, w, h, fill, radius, parent);
  };
  var buttonIds = {
    'PLAY':'play','NEXT':'next','RETRY':'retry','RETRY - FREE':'retry_free','RESUME':'resume','WATER':'water','WATCH AD x2':'watch_double',
    'FINISH':'finish','VIEW GARDENS':'view_gardens','BACK TO GARDEN':'back_garden','Settings':'settings','Map':'map','Wardrobe':'wardrobe','Gift':'gift','Home':'home','Pause':'pause','?':'help','<':'left','>':'right',
    'WATCH AD':'watch','Outfits':'outfits','Scenes':'scenes','General':'general','Sound':'sound','How to Play':'howto','Back':'back','Cancel':'cancel',
    'Equip':'equip','Equipped':'equipped','Clear Lv.70':'clear70','REWARD DOUBLED':'doubled','RETRY SAVE':'retry_save','Retry save':'retry_save','RECOVER SAVE':'recover','SAVE EARNED REWARD':'save_reward','RETRY READ':'retry_read','BACK UP & START FRESH':'backup','REVIVE +3 MOVES':'revive','-':'minus','+':'plus'
  };
  p.button = function (label, x, y, w, h, fill, action, parent) {
    var self = this, id = buttonIds[label], dynamic = null;
    if (/^Buy /.test(label)) { id = 'buy'; dynamic = label.substring(4); }
    if (/^(Haptics|Reduce motion|Music|Sound effects): /.test(label)) {
      var parts = label.split(': '); id = ({Haptics:'haptics','Reduce motion':'motion',Music:'music','Sound effects':'sfx'})[parts[0]] + '_' + parts[1].toLowerCase();
    }
    var n = id && frames[id] ? new cc.Node('btn-' + label) : null;
    if (!n) return original.button.call(this, label, x, y, w, h, fill, action, parent);
    n.setContentSize(w, h); n.setPosition(x, y); (parent || this.root).addChild(n);
    this.art(id, dynamic ? -65 : 0, 0, dynamic ? 115 : w, dynamic ? 54 : h, n, false);
    if (dynamic) this.text(dynamic, 55, 0, 24, n, 115);
    var b = n.addComponent(cc.Button); b.transition = cc.Button.Transition.SCALE; b.zoomScale = 0.96;
    this.buttons.push({node:n,label:label,action:action});
    n.on('click', function () {
      if (self.animating) return;
      if (self.ads.gate.busy && label !== 'Home' && label !== 'Pause') { self.toast('Checking video... You can return Home to cancel.'); return; }
      action();
    }); return n;
  };
  p.bunny = function (x, y, scale) {
    var skin = this.wallet && this.table.items.find(function (i) { return i.group === 'skin' && this.wallet.data.equipped.indexOf(i.id) >= 0; }, this);
    var n = this.art('skin_' + (skin ? skin.order : 2), x, y, 260 * (scale || 1), 350 * (scale || 1));
    return n || original.bunny.call(this, x, y, scale);
  };
  p.topbar = function () {
    var y=cc.view.getVisibleSize().height/2-75;
    var nectar=this.shape('nectar-bar',-145,y,340,74,'#fff8e6',30);
    var progress=this.shape('progress-bar',175,y,230,70,'#fff8e6',30);
    // Compact HUD artwork keeps its complete silhouette. Reserve the droplet
    // and floral ends rather than letting the label cover the decorated rim.
    [nectar,progress].forEach(function(n){var s=n.getComponent(cc.Sprite);if(s)s.type=cc.Sprite.Type.SIMPLE;});
    var balance=this.text('Nectar '+this.wallet.data.coins,35,0,25,nectar,220);
    balance.node.name='nectar-balance';balance.enableWrapText=false;balance.node.height=44;
    var count=this.text(Math.min(70,this.wallet.data.highest-1)+' / 70',0,0,26,progress,150);
    count.node.name='garden-progress';count.enableWrapText=false;count.node.height=44;
  };
  p.home = function () {
    this.navigate('home'); this.topbar(); var self = this;
    var extra=Math.max(0,(cc.view.getVisibleSize().height-1280)/2);this.homeTitleBase=320+extra*.5;this.homeHeroBase=-35;
    this.button('Settings', 260, 420+extra, 130, 130, null, function () { self.settings('general'); });
    this.homeTitle = this.art('title', 0, this.homeTitleBase, 630, 210);
    if (!this.homeTitle) { this.text("Mabel's",0,285,56); this.text('MEADOW MAZE',0,220,43); }
    this.homeHero = this.bunny(0, this.homeHeroBase, 1.0);
    this.button('Map', -245, -20, 148, 148, null, function () { self.map(0); });
    this.button('Wardrobe', 245, -20, 148, 148, null, function () { self.wardrobe('skin',0); });
    this.button(this.wallet.data.highest > 70 ? 'VIEW GARDENS' : 'PLAY',0,-365,470,130,null,function () { self.wallet.data.highest > 70 ? self.map(6) : self.startLevel(self.wallet.data.highest); });
    this.button('Gift',0,-525,142,142,null,function () { self.gift(); });
    if (this.wallet.readFailed) this.button('RECOVER SAVE',0,-610,350,60,null,this.recoverSave.bind(this));
    else if (Object.keys(this.pendingAds).length) this.button('SAVE EARNED REWARD',0,-610,430,60,null,this.saveEarned.bind(this));
    if (this.wallet.error) this.toast(this.wallet.error);
    this.scheduleOnce(function () { if (self.alive && self.page === 'home' && self.startup) self.startup.ready(); },0);
  };
  p.modal = function (title) {
    this.clear(); this.topbar();
    var visible = cc.view.getVisibleSize(), shade = original.shape.call(this,'modal-scrim',0,0,visible.width,visible.height,'#416050');
    var sg=shade.getComponent(cc.Graphics);sg.clear();sg.fillColor=cc.color(65,96,80,75);sg.rect(-visible.width/2,-visible.height/2,visible.width,visible.height);sg.fill();
    this.shape('modal',0,0,650,820,'#fff8e6',40);
    this.text(title,0,270,38,null,530);
  };
  p.drawTile = function (index,x,y) {
    var tile=this.run.board[index],size=this.cell-10,n=new cc.Node('tile-'+tile.id);n.setPosition(x,y);n.setContentSize(size,size);this.root.addChild(n);n.zIndex=2;
    if (!this.art(tile.kind === 'start' ? 'tile_spring' : tile.kind === 'goal' ? 'tile_flower' : tile.fixed ? 'tile_fixed' : 'tile',0,0,size,size,n,true)) {
      original.shape.call(this,'tile-surface',0,0,size,size,'#fff8e6',14,n);
    }
    var canal=new cc.Node('physical-canal');n.addChild(canal);var g=canal.addComponent(cc.Graphics);g.lineCap=cc.Graphics.LineCap.ROUND;
    function draw(width,ink) {g.lineWidth=width;g.strokeColor=color(ink);R.DIRS.forEach(function(d){if(tile.ports&d.bit){g.moveTo(0,0);g.lineTo(d.dx*size/2,-d.dy*size/2);g.stroke();}});}
    draw(27,'#b8ad8a');draw(19,'#73bac1');draw(8,'#a8e2e2');
    var feature=new cc.Node('feature-'+tile.id);n.addChild(feature);var fg=feature.addComponent(cc.Graphics);this.drawFeature(fg,index);
    if(tile.kind==='start'||tile.kind==='goal')this.text(tile.kind==='start'?'S':'G',0,0,29,n,45);
    this.tiles.push({index:index,node:n,feature:fg});
  };
  // FIXED_WIDTH extends the camera viewport on tall phones. Use the same
  // screen-to-world camera conversion as native Cocos button hit testing.
  p.location = function (event) {
    var camera=cc.Camera.findCamera(this.root),point=event.getLocation();
    return this.root.convertToNodeSpaceAR(camera?camera.getScreenToWorldPoint(point):point);
  };
  p.drawGame = function () {
    original.drawGame.call(this);
    var self=this;
    [[-180,540,280,64],[-180,445,295,70],[165,445,295,70],[0,350,665,82],[0,-550,675,58]].forEach(function(a,i){var n=self.shape('hud-'+i,a[0],a[1],a[2],a[3],'#fff8e6',20);n.zIndex=1;});
    this.root.children.forEach(function(n){if(n.getComponent(cc.Label))n.zIndex=3;});
    (this.run.level.thorns||[]).forEach(function(index){if(self.run.hazards.indexOf(index)<0)return;var n=self.art('thorns',self.boardLeft+(index%self.run.level.size+.5)*self.cell,self.boardTop-(Math.floor(index/self.run.level.size)+.5)*self.cell,self.cell-18,self.cell-18);if(n)n.zIndex=3;});
  };
  p.settings=function(tab){original.settings.call(this,tab);this.buttons=this.buttons.filter(function(b){if(b.label==='About'){b.node.destroy();return false;}return true;});};
  p.wardrobe=function(group,page){
    this.navigate('wardrobe');this.topbar();var self=this;
    this.text("Mabel's Wardrobe",0,423,40);
    this.button('Outfits',-155,330,270,75,null,function(){self.wardrobe('skin',0);});this.button('Scenes',155,330,270,75,null,function(){self.wardrobe('background',0);});
    var items=this.table.items.filter(function(i){return i.group===group;}),visibleItems=items.slice(page*4,page*4+4),ticket=this.owner;
    if(!this._artCollectionFallback&&visibleItems.some(function(item){return !frames[(group==='skin'?'skin_':'scene_')+item.order];})){
      this.shape('item-loading',0,-10,580,450,'#fff8e6',24);this.text('Opening your collection...',0,0,26);
      ensureItems(visibleItems).then(function(){if(self.alive&&self.page==='wardrobe'&&self.owner===ticket)self.wardrobe(group,page);}).catch(function(){if(!self.alive||self.page!=='wardrobe'||self.owner!==ticket)return;self.text('Unable to load artwork.',0,-80,25);self.button('RETRY',0,-170,260,70,null,function(){self.wardrobe(group,page);});});
      // Retry failures do not recurse indefinitely or block navigation.
      this.button('Home',0,-550,130,110,null,this.home.bind(this));return;
    }
    items.slice(page*4,page*4+4).forEach(function(item,k){
      var owned=self.wallet.data.owned.indexOf(item.id)>=0,equipped=self.wallet.data.equipped.indexOf(item.id)>=0,x=k%2?160:-160,y=k<2?120:-205;
      self.shape('item-'+item.id,x,y,300,305,'#fff8e6',24);var name=self.text(item.name,x,y+62,22,null,255);name.enableWrapText=false;name.node.height=32;
      if(!self.art((group==='skin'?'skin_':'scene_')+item.order,x,y-13,group==='skin'?137:240,112))self.text('Preview unavailable',x,y-13,21,null,250);
      self.text('+'+(item.bonus?item.bonus.pct:0)+'% nectar',x,y-75,21,null,250);
      self.button(equipped?'Equipped':owned?'Equip':item.unlock==='level'?'Clear Lv.70':'Buy '+item.coins,x,y-119,250,65,null,function(){
        if(!self.wallet.buyOrEquip(item.id))self.toast(self.wallet.error||(item.unlock==='level'?'Complete the final garden.':'You need more Nectar Coins.'));
        else self.wardrobe(group,page);
      });
    });
    this.text((page+1)+' / '+Math.ceil(items.length/4),0,-425,26);
    this.button('<',-235,-425,100,90,null,function(){if(!page)self.toast('This is the first collection page.');else self.wardrobe(group,page-1);});
    this.button('>',235,-425,100,90,null,function(){if(page===Math.ceil(items.length/4)-1)self.toast('This is the final collection page.');else self.wardrobe(group,page+1);});
    this.button('Home',0,-550,130,110,null,this.home.bind(this));
  };
  p.update=function(dt){original.update.call(this,dt);this.artTime=(this.artTime||0)+dt;
    if(this.page==='home'&&this.wallet){var reduced=this.wallet.data.sound.reducedMotion,t=this.artTime;
      if(this.homeHero&&cc.isValid(this.homeHero)){this.homeHero.y=this.homeHeroBase+(reduced?0:Math.sin(t*1.31)*5);this.homeHero.angle=reduced?0:Math.sin(t*.77)*1.2;}
      if(this.homeTitle&&cc.isValid(this.homeTitle)){this.homeTitle.y=this.homeTitleBase+(reduced?0:Math.sin(t*.97+1.6)*3);}
    }
  };
}
module.exports={prepare:prepare,ensureItems:ensureItems,install:install,frames:frames};

    cc._RF.pop();
  }, {
    "./MeadowPictureFont": "MeadowPictureFont",
    "./MeadowRules": "MeadowRules"
  } ],
  MeadowRules: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "48e51T1PTIsnHMXnPaaKm6r", "MeadowRules");
    "use strict";
    (function(root, factory) {
      var api = factory("undefined" !== typeof module && module.exports ? require("./MeadowFlow") : root.MeadowFlow);
      "undefined" !== typeof module && module.exports ? module.exports = api : root.MeadowRules = api;
    })("undefined" !== typeof window ? window : globalThis, function(Flow) {
      var DIRS = [ {
        dx: 0,
        dy: -1,
        bit: 1,
        opposite: 4
      }, {
        dx: 1,
        dy: 0,
        bit: 2,
        opposite: 8
      }, {
        dx: 0,
        dy: 1,
        bit: 4,
        opposite: 1
      }, {
        dx: -1,
        dy: 0,
        bit: 8,
        opposite: 2
      } ];
      function clone(x) {
        return JSON.parse(JSON.stringify(x));
      }
      function neighbor(index, dir, n) {
        var x = index % n + dir.dx, y = Math.floor(index / n) + dir.dy;
        return x >= 0 && y >= 0 && x < n && y < n ? y * n + x : -1;
      }
      function connected(board, n, start) {
        var seen = {}, distance = {}, queue = [ start ], leaks = [];
        seen[start] = true;
        distance[start] = 0;
        for (var q = 0; q < queue.length; q++) {
          var i = queue[q], tile = board[i];
          DIRS.forEach(function(d) {
            if (!(tile.ports & d.bit)) return;
            var j = neighbor(i, d, n);
            if (j < 0 || !board[j] || !(board[j].ports & d.opposite)) {
              leaks.push({
                from: i,
                to: j
              });
              return;
            }
            if (!seen[j]) {
              seen[j] = true;
              distance[j] = distance[i] + 1;
              queue.push(j);
            }
          });
        }
        return {
          cells: queue,
          distance: distance,
          leaks: leaks
        };
      }
      function trace(level, board) {
        var network = connected(board, level.size, level.start);
        var sensors = [], valves = [], deflectors = [];
        network.cells.forEach(function(i) {
          "sensor" === board[i].kind && sensors.push(i);
          "valve" === board[i].kind && valves.push(i);
          "deflector" === board[i].kind && deflectors.push(i);
        });
        var linked = void 0 !== network.distance[level.goal];
        var times = sensors.map(function(i) {
          return network.distance[i] * level.cellSize / 160;
        });
        var synced = !level.dual || 2 === sensors.length && Math.max.apply(null, times) - Math.min.apply(null, times) <= 1.2;
        var requiredValve = !level.valve || valves.length > 0;
        var requiredDeflector = !level.deflector || deflectors.length > 0;
        var deliverable = linked && synced && requiredValve && requiredDeflector ? Math.max(0, 36 - 6 * network.leaks.length) : 0;
        return {
          cells: network.cells,
          distance: network.distance,
          leaks: network.leaks,
          linked: linked,
          synced: synced,
          sensors: sensors,
          valves: valves,
          deflectors: deflectors,
          deliverable: deliverable,
          ready: deliverable >= 24,
          travelTime: (network.distance[level.goal] || 0) * level.cellSize / 160
        };
      }
      function create(level) {
        return {
          level: level,
          board: clone(level.board),
          moves: 0,
          remaining: level.moveLimit,
          elapsed: 0,
          water: 0,
          emitted: 0,
          lostWater: 0,
          flowTime: 0,
          state: "playing",
          combo: 0,
          score: 0,
          lastMove: -100,
          revived: false,
          valvePressure: 0,
          valveOpen: !level.valve,
          hazards: [],
          history: [],
          events: []
        };
      }
      function slide(run, index, direction) {
        if ("playing" !== run.state || run.remaining <= 0 || !run.board[index] || run.board[index].fixed) return false;
        var hole = run.board.indexOf(null), n = run.level.size;
        if (Math.abs(index % n - hole % n) + Math.abs(Math.floor(index / n) - Math.floor(hole / n)) !== 1) return false;
        if (direction && neighbor(index, direction, n) !== hole) return false;
        run.history.push({
          board: clone(run.board),
          remaining: run.remaining,
          combo: run.combo,
          score: run.score,
          moves: run.moves
        });
        run.board[hole] = run.board[index];
        run.board[index] = null;
        run.moves++;
        run.remaining--;
        if (run.level.combo) {
          run.combo = run.elapsed - run.lastMove <= 1.5 ? run.combo + 1 : 1;
          var before = trace(run.level, run.history[run.history.length - 1].board).cells.length;
          var after = trace(run.level, run.board).cells.length;
          after > before && (run.score += run.combo * run.combo * 5);
        }
        run.lastMove = run.elapsed;
        0 !== run.remaining || trace(run.level, run.board).ready || (run.state = "lost");
        return true;
      }
      function release(run) {
        if ("playing" !== run.state) return false;
        run.flow = trace(run.level, run.board);
        run.waterFlow = Flow.create(run.level, run.board, run.flow);
        run.waterView = Flow.snapshot(run.waterFlow);
        run.state = "flowing";
        run.flowTime = 0;
        run.water = 0;
        run.emitted = 0;
        run.lostWater = 0;
        run.valvePressure = 0;
        run.valveOpen = !run.level.valve;
        return true;
      }
      function tick(run, dt) {
        if (!Number.isFinite(dt) || dt <= 0 || "playing" !== run.state && "flowing" !== run.state) return;
        dt = Math.min(dt, .1);
        run.elapsed += dt;
        if ("flowing" !== run.state) return;
        run.flowTime += dt;
        Flow.tick(run.waterFlow, dt);
        var flow = run.flow, view = run.waterView = Flow.snapshot(run.waterFlow);
        run.water = view.delivered;
        run.emitted = view.emitted;
        run.lostWater = view.spilled;
        run.valvePressure = view.valves.length ? Math.max.apply(null, view.valves.map(function(v) {
          return v.pressure;
        })) : 0;
        run.valveOpen = !run.level.valve || view.valves.length > 0 && view.valves.every(function(v) {
          return v.open;
        });
        if (view.won) {
          run.state = "won";
          run.events.push("bloom");
          return;
        }
        if (view.finished) {
          flow.leaks.forEach(function(leak) {
            if (leak.to >= 0 && null === run.board[leak.to] && (run.level.thorns || []).indexOf(leak.to) >= 0) {
              run.board[leak.to] = {
                id: "grown-thorn",
                ports: 0,
                kind: "rock",
                fixed: true
              };
              run.hazards.push(leak.to);
            }
          });
          run.state = "lost";
        }
      }
      function revive(run) {
        if ("lost" !== run.state || run.revived) return false;
        run.revived = true;
        run.remaining += 3;
        run.water = 0;
        run.state = "playing";
        run.flow = null;
        run.waterFlow = null;
        run.waterView = null;
        run.flowTime = 0;
        run.emitted = 0;
        run.lostWater = 0;
        run.valvePressure = 0;
        run.valveOpen = !run.level.valve;
        run.hazards.length && (run.board[run.hazards.pop()] = null);
        return true;
      }
      function rating(run) {
        if ("won" !== run.state) return 0;
        return run.moves <= run.level.parMoves && !run.revived ? 3 : run.moves <= run.level.parMoves + 2 ? 2 : 1;
      }
      function replay(level, solution) {
        var run = create(level);
        for (var i = 0; i < solution.length; i++) if (!slide(run, solution[i])) return {
          valid: false,
          step: i,
          run: run
        };
        if (!trace(level, run.board).ready) return {
          valid: false,
          step: "route",
          run: run
        };
        release(run);
        for (var t = 0; t < 3e3 && "flowing" === run.state; t++) tick(run, .05);
        return {
          valid: "won" === run.state,
          run: run
        };
      }
      return {
        DIRS: DIRS,
        neighbor: neighbor,
        clone: clone,
        trace: trace,
        create: create,
        slide: slide,
        release: release,
        tick: tick,
        revive: revive,
        rating: rating,
        replay: replay
      };
    });
    cc._RF.pop();
  }, {
    "./MeadowFlow": "MeadowFlow"
  } ],
  MeadowServices: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "0660cuoUAPHXqomoRNf0gPM", "MeadowServices");
    "use strict";
    (function(root, factory) {
      var api = factory();
      "undefined" !== typeof module && module.exports ? module.exports = api : root.MeadowServices = api;
    })("undefined" !== typeof window ? window : globalThis, function() {
      var KEY = "mabel.meadow.remake.v1";
      function number(v, max, fallback) {
        return Number.isFinite(v) && v >= 0 ? Math.min(max, Math.floor(v)) : fallback;
      }
      function fresh(table) {
        var free = table.items.filter(function(i) {
          return "free" === i.unlock;
        });
        return {
          version: 1,
          revision: 0,
          coins: 0,
          stars: {},
          highest: 1,
          owned: free.map(function(i) {
            return i.id;
          }),
          equipped: free.map(function(i) {
            return i.id;
          }),
          gift: {
            charges: 1
          },
          settled: [],
          sound: {
            music: true,
            sfx: true,
            musicVolume: 7,
            sfxVolume: 7,
            haptics: true,
            reducedMotion: false
          }
        };
      }
      function Wallet(storage, table) {
        this.storage = storage;
        this.table = table;
        this.error = "";
        this.data = fresh(table);
        try {
          var raw = storage.getItem(KEY);
          if (null !== raw && void 0 !== raw && "" !== raw) {
            var old = JSON.parse(raw);
            if (!old || 1 !== old.version) throw Error("Unsupported save");
            var clean = fresh(table), ids = table.items.map(function(i) {
              return i.id;
            });
            clean.coins = number(old.coins, 9999999, 0);
            clean.revision = number(old.revision, 1e9, 0);
            clean.highest = number(old.highest, 71, 1) || 1;
            clean.owned = Array.from(new Set(clean.owned.concat(Array.isArray(old.owned) ? old.owned.filter(function(id) {
              return ids.indexOf(id) >= 0;
            }) : [])));
            Array.isArray(old.equipped) && [ "skin", "background" ].forEach(function(group) {
              var selected = table.items.find(function(i) {
                return i.group === group && old.equipped.indexOf(i.id) >= 0 && clean.owned.indexOf(i.id) >= 0;
              });
              selected && (clean.equipped = clean.equipped.filter(function(id) {
                return table.items.find(function(i) {
                  return i.id === id;
                }).group !== group;
              }).concat(selected.id));
            });
            if (old.stars && "object" === typeof old.stars) for (var i = 1; i <= 70; i++) old.stars[i] && (clean.stars[i] = number(old.stars[i], 3, 0));
            clean.settled = Array.isArray(old.settled) ? old.settled.filter(function(s) {
              return "string" === typeof s;
            }).slice(-300) : [];
            clean.gift.charges = old.gift && 0 === old.gift.charges ? 0 : 1;
            old.sound && Object.keys(clean.sound).forEach(function(k) {
              "boolean" === typeof clean.sound[k] ? clean.sound[k] = "boolean" === typeof old.sound[k] ? old.sound[k] : clean.sound[k] : clean.sound[k] = number(old.sound[k], 10, 7);
            });
            this.data = clean;
          }
        } catch (e) {
          this.error = "Your save could not be read. It has been kept; please retry.";
          this.readFailed = true;
        }
      }
      Wallet.prototype.recoverFresh = function() {
        if (!this.readFailed) {
          this.error = "Your save is readable. No recovery is needed.";
          return false;
        }
        var raw, backup, backupKey = KEY + ".recovery.v1";
        try {
          raw = this.storage.getItem(KEY);
          if (null === raw || void 0 === raw || "" === raw) {
            this.error = "No damaged save was found. Retry loading your progress.";
            return false;
          }
          if ("string" !== typeof raw) {
            this.error = "This save format cannot be backed up safely. Please retry loading.";
            return false;
          }
          var readable = false;
          try {
            var parsed = JSON.parse(raw);
            readable = !!parsed && 1 === parsed.version;
          } catch (_) {}
          if (readable) {
            this.error = "A readable save was found. Retry loading to keep that progress.";
            return false;
          }
          backup = this.storage.getItem(backupKey);
        } catch (_) {
          this.error = "Your save could not be read. Nothing was changed; please retry.";
          return false;
        }
        if (null !== backup && void 0 !== backup && "" !== backup && backup !== raw) {
          this.error = "A different recovery backup already exists. It has been kept; recovery could not continue.";
          return false;
        }
        try {
          null !== backup && void 0 !== backup && "" !== backup || this.storage.setItem(backupKey, raw);
          if (this.storage.getItem(backupKey) !== raw) throw Error("Backup verification failed");
        } catch (_) {
          this.error = "Your old save could not be backed up. Nothing was reset; please retry.";
          return false;
        }
        var next = fresh(this.table), serialized = JSON.stringify(next);
        try {
          if (this.storage.getItem(KEY) !== raw) {
            this.error = "Your save changed during recovery. Retry loading to keep the latest progress.";
            return false;
          }
        } catch (_) {
          this.error = "Your save could not be checked. Nothing was reset; please retry.";
          return false;
        }
        try {
          this.storage.setItem(KEY, serialized);
          if (this.storage.getItem(KEY) !== serialized) throw Error("Fresh save verification failed");
        } catch (_) {
          var restored = false;
          try {
            this.storage.setItem(KEY, raw);
            restored = this.storage.getItem(KEY) === raw;
          } catch (_) {}
          this.error = restored ? "The new save could not be written. Your old save and backup were kept; please retry." : "Recovery could not finish. Your old save is preserved in the recovery backup; please retry loading.";
          return false;
        }
        this.data = next;
        this.readFailed = false;
        this.error = "";
        return true;
      };
      Wallet.prototype.commit = function(mutate) {
        if (this.readFailed) {
          this.error = "Save recovery is required before progress can be changed.";
          return false;
        }
        var next = JSON.parse(JSON.stringify(this.data));
        if (false === mutate(next)) return false;
        next.revision++;
        var serialized = JSON.stringify(next), previous, previousRead = false;
        try {
          previous = this.storage.getItem(KEY);
          previousRead = true;
          this.storage.setItem(KEY, serialized);
          if (this.storage.getItem(KEY) !== serialized) throw Error("Save verification failed");
          this.data = next;
          this.error = "";
          return true;
        } catch (e) {
          try {
            previousRead && (null !== previous && void 0 !== previous ? this.storage.setItem(KEY, previous) : this.storage.removeItem(KEY));
          } catch (_) {}
          this.error = "Progress could not be saved. Please retry; no purchase was made.";
          return false;
        }
      };
      Wallet.prototype.buyOrEquip = function(id) {
        var item = this.table.items.find(function(i) {
          return i.id === id;
        }), table = this.table;
        if (!item) return false;
        return this.commit(function(d) {
          if (d.owned.indexOf(id) < 0) {
            if ("coins" !== item.unlock || d.coins < item.coins) return false;
            d.coins -= item.coins;
            d.owned.push(id);
          }
          d.equipped = d.equipped.filter(function(e) {
            return table.items.find(function(i) {
              return i.id === e;
            }).group !== item.group;
          }).concat(id);
        });
      };
      Wallet.prototype.win = function(runId, level, stars, amount, milestone, table) {
        return this.commit(function(d) {
          if (d.settled.indexOf(runId) >= 0) return false;
          var first = !d.stars[level];
          d.stars[level] = Math.max(d.stars[level] || 0, stars);
          d.highest = Math.max(d.highest, level + 1);
          d.coins += amount + (first && milestone || 0);
          d.gift = {
            charges: 1
          };
          d.settled.push(runId);
          70 === level && table.items.filter(function(i) {
            return "level" === i.unlock && 70 === i.level;
          }).forEach(function(i) {
            d.owned.indexOf(i.id) < 0 && d.owned.push(i.id);
          });
          d.settled = d.settled.slice(-300);
        });
      };
      function Ads(rewards, host, now) {
        this.rewards = rewards;
        this.host = host;
        this.now = now || Date.now;
        this.gate = rewards.createAdGate();
        this.active = null;
      }
      Ads.prototype.request = function(owner, done, placementKey) {
        var token = this.rewards.adGateStart(this.gate), self = this;
        if (!token) return false;
        var record = {
          owner: owner,
          token: token,
          deadline: this.host && this.host.update ? Infinity : this.now() + 45e3,
          done: done
        };
        this.active = record;
        function finish(completed, reason) {
          if (self.active !== record) return;
          var paid = self.rewards.adGateFinish(self.gate, token, true === completed);
          self.active = null;
          record.dispose && record.dispose();
          done(paid, reason);
        }
        record.finish = finish;
        if (!this.host || !this.host.showRewarded) {
          finish(false, "Ads are unavailable here. You can keep playing for free.");
          return true;
        }
        try {
          record.dispose = this.host.showRewarded(function(status) {
            finish("completed" === status, status);
          }, placementKey);
        } catch (_) {
          finish(false, "The video could not start. Please try again later.");
        }
        return true;
      };
      Ads.prototype.update = function() {
        this.host && this.host.update && this.host.update();
        this.active && this.now() >= this.active.deadline && this.active.finish(false, "The video timed out. No reward was granted.");
      };
      Ads.prototype.cancelOwner = function(owner) {
        this.active && this.active.owner === owner && this.active.finish(false, "cancelled");
      };
      return {
        KEY: KEY,
        Wallet: Wallet,
        Ads: Ads,
        fresh: fresh
      };
    });
    cc._RF.pop();
  }, {} ]
}, {}, [ "AdRewards", "MeadowAudio", "MeadowAudioHooks", "MeadowBootstrap", "MeadowFlow", "MeadowGame", "MeadowLoader", "MeadowPictureFont", "MeadowPlatform", "MeadowPresentation", "MeadowRules", "MeadowServices", "GameAudioConfig", "GameAudioManager" ]);