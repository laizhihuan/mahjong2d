module uiview.home {
    export class EnvSetView extends ui.EnvSetViewUI {
        constructor() {
            super();
            this.btn_close_.on(Laya.Event.CLICK, this, this.OnBtnClose);
            this.music_slider_.value = parseInt(Laya.LocalStorage.getItem(game.gameInfo.ITEM_MUSIC_VOLUME));
            this.effect_slider_.value = parseInt(Laya.LocalStorage.getItem(game.gameInfo.ITEM_SOUND_VOLUME));
            this.effect_slider_.on(Laya.Event.CHANGE, this, this.OnEffectChange);
            this.music_slider_.on(Laya.Event.CHANGE, this, this.OnMusicChange);
            this.btn_switch_account_.on(Laya.Event.CLICK, this, this.OnSwitchAccount);
            this.btn_exit_game_.on(Laya.Event.CLICK, this, this.OnExitGame);

        }

        OnSwitchAccount() {
            this.visible = false;
            Laya.LocalStorage.setItem(game.gameInfo.ITEM_WX_TOKEN, null);
            Laya.LocalStorage.setItem(game.gameInfo.ITEM_WX_OPEN_ID, null);
            game.userInfo.token = null;
            game.userInfo.open_id = null;
            Laya.loader.load(game.uiAtlas.login, Laya.Handler.create(this, this.onLoginLoaded));
        }

        onLoginLoaded() {
            var login = new uiview.home.loginView();
            Laya.stage.addChild(login);
            this.parent.removeSelf();
        }

        OnExitGame() {
            this.visible = false;
            if (window.conch) {
                if (Laya.Browser.onIOS) {
                    var Test = Laya.PlatformClass.createClass("AppDelegate"); // 这个名字要与下面声明的OC的类名匹配 iOS不用包名
                    Test.call("quitGame");
                }
                if (Laya.Browser.onAndriod) {
                    // var Test = Laya.PlatformClass.createClass("com.mobile.xzxymj.MainActivity");
                    // Test.call("onWXShareText", "西藏雪域麻将", "西藏雪域麻将", network.http.indexUrl, type);
                }
            }
        }

        OnBtnClose() {
            this.visible = false;
        }

        OnEffectChange() {
            Laya.SoundManager.setSoundVolume(this.effect_slider_.value / 100);
            Laya.LocalStorage.setItem(game.gameInfo.ITEM_SOUND_VOLUME, this.effect_slider_.value + "");
        }

        OnMusicChange() {
            Laya.SoundManager.setMusicVolume(this.music_slider_.value / 100);
            Laya.LocalStorage.setItem(game.gameInfo.ITEM_SOUND_VOLUME, this.music_slider_.value + "");
        }
    }
}