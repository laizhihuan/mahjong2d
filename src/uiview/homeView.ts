module uiview.home {
    export class homeView extends ui.homeViewUI {
        static instance: homeView = null;
        constructor() {
            super();
            homeView.instance = this;
            this.btnCreate.on(Laya.Event.CLICK, this, this.onBtnCreate);
            this.btnJoin.on(Laya.Event.CLICK, this, this.onBtnJoin);

            this.btnRecord.on(Laya.Event.CLICK, this, this.showRecord);
            this.btnShare.on(Laya.Event.CLICK, this, this.showShare);
            this.btnAct.on(Laya.Event.CLICK, this, this.showActivity);
            this.btnRule.on(Laya.Event.CLICK, this, this.showRule);
            this.btnSet.on(Laya.Event.CLICK, this, this.showSet);

            this.viewRule.pnl.vScrollBarSkin = "";
            this.viewRule.pnl.mouseEnabled = true;
            this.viewRule.btn_close.on(Laya.Event.CLICK, this, () => {
                this.viewRule.visible = false;
            });
            this.updateLocation();
            this.joinDesk("000000");
            this.setUserInfo();
            game.SoundManager.playBgm();
            this.getMsg();
        }

        msgIdx = 0;
        msgData = [
            { msg: "欢迎来到西藏雪域麻将" },
            { msg: "代理或游戏问题请联系群主" },
            { msg: "第四条" },
            { msg: "第五条" }
        ]
        getMsg() {
            var str = "";
            for (let i = 0; i < this.msgData.length; ++i) {
                str += this.msgData[i].msg + "\n";
            }
            str += this.msgData[0].msg + "\n";
            this.broad.changeText(str);
            Laya.timer.loop(4000, this, this.updateMsg);
        }

        updateMsg() {
            if (this.broad.y <= -this.broad.fontSize * this.msgData.length) {
                this.broad.y = 0;
            }
            var y = this.broad.y - this.broad.fontSize;
            Laya.Tween.to(this.broad, { y: y }, 500);
        }

        showRecord(bShow) {
            this.viewRank.visible = true;
            this.viewRank.getMyRecord();
        }

        showActivity() {
            this.viewActivity.visible = true;
            this.viewActivity.GetData();
        }

        showShare() {
            this.viewShare.visible = true;
        }

        showSet() {
            this.viewSet.visible = true;
        }

        showRule() {
            this.viewRule.visible = true;
        }


        onBtnJoin() {
            this.viewInput.visible = true;
        }

        onBtnCreate() {
            this.viewCreate.ShowCreateDesk(0, "");
        }

        setUserInfo() {
            this.infoRoot.getChildByName("head").skin = network.http.webRoot + "/Image/head/" + game.userInfo.userId + "_head.png";
            this.infoRoot.getChildByName("nick").skin = network.http.webRoot + "/Image/name/" + game.userInfo.userId + ".png";
            this.infoRoot.getChildByName("uid").text = game.userInfo.userId;
            this.infoRoot.getChildByName("gold").text = game.userInfo.gold;
        }

        joinDesk(pwd) {
            var url = "/app/userlogin.aspx?user_id=" + game.userInfo.userId + "&token=" + game.userInfo.token;
            var url2 = "/data_interface/desk_mng.aspx?page_action=join_desk&desk_pwd=" + pwd;
            url += "&url=" + url2;
            network.http.getUrl(url, (resp) => {
                if (resp.result == "fail") {
                    console.log(resp.tips);
                    return;
                }

                game.gameInfo.nameId = resp.game_id;
                game.gameInfo.serverIp = resp.server_ip;//"192.168.10.120";
                game.gameInfo.serverPort = resp.server_port;//8773;
                game.gameInfo.deskPwd = resp.desk_pwd;
                game.gameInfo.json_rule = resp.json_rule;
                game.gameInfo.max_round = parseInt(resp.round_times);
                game.gameInfo.max_people = parseInt(resp.max_people);
                game.gameInfo.ratio = parseFloat(resp.multiplying_factor);
                Laya.loader.load(game.uiAtlas.game, Laya.Handler.create(this, this.onGameLoaded));
            })
        }

        updateLocation() {
            console.log("update location lat=" + game.userInfo.lat + " long=" + game.userInfo.lon);
            var url = "/app/userlogin.aspx?user_id=" + game.userInfo.userId + "&token=" + game.userInfo.token;
            var url2 = "/data_interface/user_info_action.ashx?page_action=update_location&longtitude=" + game.userInfo.lon + "&latitude=" + game.userInfo.lat;
            url += "&url=" + url2;
            network.http.getUrl(url, (resp) => {
                if (resp.result == "fail") {
                    console.log(resp.tips);
                    return;
                }
            });
        }

        onGameLoaded() {
            var gameV = new uiview.gameView();
            Laya.stage.addChild(gameV);
            this.removeSelf();
            //不要释放图片资源
        }
    }
}