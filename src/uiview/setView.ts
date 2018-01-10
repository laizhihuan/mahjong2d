module uiview {
    export class setView extends ui.setViewUI {
        constructor() {
            super();
            this.getChildByName('close').on(Laya.Event.CLICK, this, () => {
                this.visible = false;
            });
            this.btnReqDis.on(Laya.Event.CLICK, this, this.onBtnReqDismiss);

            this.music.value = parseInt(Laya.LocalStorage.getItem(game.gameInfo.ITEM_MUSIC_VOLUME));
            this.effect.value = parseInt(Laya.LocalStorage.getItem(game.gameInfo.ITEM_SOUND_VOLUME));
            this.effect.on(Laya.Event.CHANGE, this, this.onSoundChange);
            this.music.on(Laya.Event.CHANGE, this, this.onMusicChange);

        }

        onBtnReqDismiss() {
            game.gameClient.instance.m_ws.SendEmpty(180, 138);
            Laya.timer.once(500, this, () => {
                if (game.gameClient.instance.m_status == 0) {
                    gameView.instance.onBack();
                }
            });

        }

        onSoundChange() {
            Laya.SoundManager.setSoundVolume(this.effect.value / 100);
            Laya.LocalStorage.setItem(game.gameInfo.ITEM_SOUND_VOLUME, this.effect.value + "");
        }

        onMusicChange() {
            Laya.SoundManager.setMusicVolume(this.music.value / 100);
            Laya.LocalStorage.setItem(game.gameInfo.ITEM_MUSIC_VOLUME, this.music.value + "");
        }

        showSet() {
            this.visible = true;
        }
    }
}