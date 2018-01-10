module uiview {
    export class disView extends ui.disViewUI {
        constructor() {
            super();
            this.btnAgree.on(Laya.Event.CLICK, this, () => {
                game.gameClient.instance.m_ws.Send(180, 136, { value_: 1 });
            });
            this.btnRefus.on(Laya.Event.CLICK, this, () => {
                game.gameClient.instance.m_ws.Send(180, 136, { value_: 2 });
            });
        }

        m_rest: number = 60;
        //秒
        showTimer(time: number) {
            this.m_rest = time;
            this.alarm.changeText("" + this.m_rest);
            Laya.timer.loop(1000, this, this._updateTimer);
        }
        _updateTimer() {
            --this.m_rest;
            if (this.m_rest < 0) {
                Laya.timer.clear(this, this._updateTimer);
                return;
            }
            this.alarm.changeText("" + this.m_rest);
        }

        showDismiss() {
            this.visible = true;
            var arr = [];
            for (let i = 0; i < 4; ++i) {
                if (game.gameClient.instance.m_dismiss[i] == 2) {
                    game.gameClient.instance.m_dismiss = [0, 0, 0, 0];
                    Laya.timer.clear(this, this._updateTimer);
                    this.m_rest = 60;
                    this.visible = false;
                    return;
                }
                if (game.gameClient.instance.users[i] == null)
                    continue;
                var da = {
                    nick: {
                        skin: network.http.webRoot + "/Image/name/" + game.gameClient.instance.users[i].userId + ".png"
                    },
                    state: { text: game.gameClient.instance.m_dismiss[i] == 1 ? '同意解散' : '等待解散' }
                }
                arr.push(da);
            }
            this.list.array = arr;
            this.btnRefus.visible = game.gameClient.instance.m_dismiss[game.gameClient.instance.m_myDesk] != 1;
            this.btnAgree.visible = game.gameClient.instance.m_dismiss[game.gameClient.instance.m_myDesk] != 1;
            this.showTimer(60);
        }
    }
}