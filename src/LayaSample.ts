// 程序入口
class GameMain {
    constructor() {
        Laya.init(1280, 720);
        //Laya.Stat.show();
        Laya.stage.scaleMode = Laya.Stage.SCALE_EXACTFIT;
        Laya.stage.screenMode = "horizontal";

        if (Laya.LocalStorage.getItem(game.gameInfo.ITEM_MUSIC_VOLUME) == null) {
            Laya.LocalStorage.setItem(game.gameInfo.ITEM_MUSIC_VOLUME, "50");
        }
        if (Laya.LocalStorage.getItem(game.gameInfo.ITEM_SOUND_VOLUME) == null) {
            Laya.LocalStorage.setItem(game.gameInfo.ITEM_SOUND_VOLUME, "50");
        }

        Laya.SoundManager.setMusicVolume(parseInt(Laya.LocalStorage.getItem(game.gameInfo.ITEM_MUSIC_VOLUME)) / 100);
        Laya.SoundManager.setSoundVolume(parseInt(Laya.LocalStorage.getItem(game.gameInfo.ITEM_SOUND_VOLUME)) / 100);
        Laya.loader.load(game.uiAtlas.login, Laya.Handler.create(this, this.onLoaded), Laya.Handler.create(this, this.onLoading));
    }

    onLoading(progress) {
        if (window.loadingView) {
            window.loadingView.loading(progress * 100);
        }
    }

    onLoaded() {
        var login = new uiview.home.loginView();
        Laya.stage.addChild(login);
        if (window.loadingView) {
            window.loadingView.loading(100);
        }
    }
}
new GameMain();