module uiview {
    export class allFinView extends ui.allFinViewUI {
        constructor() {
            super();
            this.btnBack.on(Laya.Event.CLICK, this, this.onBack);
            this.btnShare.on(Laya.Event.CLICK, this, this.onShare);
        }

        onBack() {
            gameView.instance.onBack();
        }

        onShare() {
            if (window.conch) {
                if (Laya.Browser.onIOS) {
                    window.conch.captureScreen((buf, width, height) => {
                        conch.saveAsJpeg(buf, width, height, conch.getCachePath() + "/screen_capture.jpg");
                        var Test = Laya.PlatformClass.createClass("AppDelegate");
                        Test.call("onWxshareImg:withTitle:", conch.getCachePath() + "/screen_capture.jpg", "雪域麻将战绩");
                    });
                }
                if (Laya.Browser.onAndriod) {
                    // var Test = Laya.PlatformClass.createClass("com.mobile.xzxymj.MainActivity");
                    // Test.call("onWXShareText", "西藏雪域麻将", "西藏雪域麻将", network.http.indexUrl, type);
                }
            }
        }

        showAllFin(data) {
            this.visible = true;
            var arr = [];
            for (let i = 0; i < game.gameInfo.max_people; ++i) {
                if (game.gameClient.instance.users[i] == null)
                    continue;
                var d = {
                    nick: {
                        skin: network.http.webRoot + "/Image/name/" + game.gameClient.instance.users[i].userId + ".png"
                    },
                    head: {
                        skin: network.http.webRoot + "/Image/head/" + game.gameClient.instance.users[i].userId + "_head.png"
                    },
                    dp: { text: data.all_count[i].dian_pao_ + "" },
                    jp: { text: data.all_count[i].jie_pao_ + "" },
                    zm: { text: data.all_count[i].zimo_ + "" },
                    zf: { text: data.all_count[i].zhong_fen_ + "" },
                    mg: { text: data.all_count[i].gua_feng_ + "" },
                    ag: { text: data.all_count[i].xia_yu_ + "" },
                    bOwner: { visible: i == 0 }
                }
                arr.push(d);
            }
            this.list.array = arr;
        }
    }
}