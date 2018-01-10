import Vector3 = Laya.Vector3;
module uiview {
    export class gameView extends ui.gameViewUI {

        static instance: gameView = null;
        m_client: game.gameClient = null;

        hands: handCtrl[] = [];
        outs: outCtrl[] = [];
        hus: huCtrl[] = [];

        recordMsg = null;
        constructor(msg = null) {
            super();
            this.recordMsg = msg;
            gameView.instance = this;

            this.parseJsonRule();


            for (let i = 0; i < 4; ++i) {
                this.hands[i] = new handCtrl(i);
                this.outs[i] = new outCtrl(i);
                this.hus[i] = new huCtrl(i);
                this.getChildByName("hands").getChildAt(i).addChild(this.hands[i]);
                this.getChildByName("outs").getChildAt(i).addChild(this.outs[i]);
                this.getChildByName("hus").getChildAt(i).addChild(this.hus[i]);
            }
            this.exchange.visible = window.conch == null;
            if (this.recordMsg == null) {
                //wan tong tiao
                var chips = this.btns.getChildAt(0);
                for (let i = 0; i < chips.numChildren; ++i) {
                    chips.getChildAt(i).on(Laya.Event.CLICK, this, this.onBtnChip, [i]);
                }

                this.blocks.getChildAt(1).on(Laya.Event.CLICK, this, this.onBtnPeng);
                this.blocks.getChildAt(3).on(Laya.Event.CLICK, this, this.onBtnHu);
                this.blocks.getChildAt(4).on(Laya.Event.CLICK, this, this.onBtnPass);

                this.exchange.getChildAt(1).on(Laya.Event.CLICK, this, this.onBtnExchange);
                this.btnSet.on(Laya.Event.CLICK, this, this.onBtnSet);
                this.btnChat.on(Laya.Event.CLICK, this, () => {
                    this.viewTalk.visible = !this.viewTalk.visible;
                });
                this.mic.on(Laya.Event.CLICK, this, this.onMic);
                this.speaker.on(Laya.Event.CLICK, this, this.onSpeaker);
                this.btnInvite.on(Laya.Event.CLICK, this, this.onBtnInvite);
                this.hands[1].setEnableClick();
                this.record.visible = false;
                this.joinTeamRoom();

                for (let i = 0; i < 4; ++i) {
                    this.players.getChildAt(i).on(Laya.Event.CLICK, this, this.showUserInfo, [i]);
                }

            } else {
                this.record.visible = true;
                this.record.getChildByName("play").on(Laya.Event.CLICK, this, this.playRecord);
                this.record.getChildByName("speed").on(Laya.Event.CLICK, this, this.speedRecord);
                this.record.getChildByName("return").on(Laya.Event.CLICK, this, () => {
                    Laya.timer.clear(this.m_client, this.m_client.OnRecordMessage);
                    this.onBack();
                });
            }

            this.onLoaded();
        }
        onLoaded() {
            this.m_client = new game.gameClient();
        }

        speed = 3;
        playingRecord = true;
        playRecord() {
            if (!this.playingRecord) {
                Laya.timer.loop(this.speed * 200, this.m_client, this.m_client.OnRecordMessage);
            }
            else {
                Laya.timer.clear(this.m_client, this.m_client.OnRecordMessage);
            }
            this.playingRecord = !this.playingRecord;
            this.record.getChildByName("play").skin = this.playingRecord ? "game/record_btn_pause.png" : "game/record_btn_play.png";

        }

        speedRecord() {
            Laya.timer.clear(this.m_client, this.m_client.OnRecordMessage);
            --this.speed;
            if (this.speed < 1) {
                this.speed = 3;
            }
            Laya.timer.loop(this.speed * 200, this.m_client, this.m_client.OnRecordMessage);
            this.playingRecord = true;
            this.record.getChildByName("play").skin = "game/record_btn_pause.png";
            this.record.getChildByName("label").changeText("x" + (4 - this.speed));
        }

        parseJsonRule() {
            (this.deskInfo.getChildByName("pwd") as Laya.Label).text = "房号:" + game.gameInfo.deskPwd;
            var str = "    / ";
            for (var key in game.gameInfo.json_rule) {
                if (game.ruleItem0[key].label.indexOf(',') > 0) {
                    //radiogroup
                    for (let i = 0; i < game.ruleItem0[key].value.length; ++i) {
                        if (game.gameInfo.json_rule[key] == game.ruleItem0[key].value[i]) {
                            str += game.ruleItem0[key].label.split(',')[i] + "\n";
                            break;
                        }
                    }
                } else {
                    //checkbox
                    if (game.gameInfo.json_rule[key] == true) {
                        str += game.ruleItem0[key].label + "\n";
                    }
                }
            }
            str += "倍率:" + game.gameInfo.ratio;
            (this.deskInfo.getChildByName("option") as Laya.Label).text = str;
        }

        setDeskInfo(data) {
            (this.deskInfo.getChildByName("cur") as Laya.Label).text = data.current_round_ + 1;
            this.m_client.m_status = data.desk_status_;
            this.btnInvite.visible = data.desk_status_ == 0;
        }
        setPlayerInfo(data: game.userStruct[]) {
            for (let i = 0; i < data.length; ++i) {
                if (data[i] == null) {
                    (this.players.getChildAt(this.vStation(i)).getChildByName("head") as Laya.Image).skin = "";
                    (this.players.getChildAt(this.vStation(i)).getChildByName("nick") as Laya.Image).skin = "";
                    continue;
                }
                (this.players.getChildAt(this.vStation(i)).getChildByName("head") as Laya.Image).skin = network.http.webRoot + "/Image/head/" + data[i].userId + "_head.png";
                (this.players.getChildAt(this.vStation(i)).getChildByName("nick") as Laya.Image).skin = network.http.webRoot + "/Image/name/" + data[i].userId + ".png";
                (this.players.getChildAt(this.vStation(i)).getChildByName("money") as Laya.Label).text = data[i].temp_chip + "";
                (this.players.getChildAt(this.vStation(i)).getChildByName("bOwner") as Laya.Image).visible = (i == 0);
            }
        }

        onUserAgreeList(data) {
            for (let i = 0; i < game.gameInfo.max_people; ++i) {
                (this.players.getChildAt(this.vStation(i)).getChildByName("offline") as Laya.Image).visible = (data.agree_list[i] == 20);
                (this.players.getChildAt(this.vStation(i)).getChildByName("ready") as Laya.Image).visible = (data.agree_list[i] == 3);
            }
        }

        setReady(desk, bShow) {
            (this.players.getChildAt(this.vStation(desk)).getChildByName("ready") as Laya.Image).visible = bShow;
        }


        gameBegin(data) {
            this.fin.visible = false;
            this.showDismiss(false);
            this.setNt(data.byNt);
            for (let i = 0; i < game.gameInfo.max_people; ++i) {
                (this.players.getChildAt(i).getChildByName("ready") as Laya.Image).visible = false;
            }
        }

        setNt(desk) {
            for (let i = 0; i < this.players.numChildren; ++i) {
                var v = this.vStation(desk);
                (this.players.getChildAt(i).getChildByName("nt") as Laya.Sprite).visible = v === i;
            }
        }

        showChips(data) {
            (this.btns.getChildAt(0) as Laya.Button).visible = !data.bFinish[this.m_client.m_myDesk];
            if (data.byUser == this.m_client.m_myDesk && data.byQuePai[this.m_client.m_myDesk] != 255) {
                this.hands[1].setQue(data.byQuePai[this.m_client.m_myDesk]);
            }
        }

        onBtnChip(val) {
            var data = {
                byUser: this.m_client.m_myDesk,
                byQue: val,
                byQuePai: [255, 255, 255, 255],
                bNotify: false,
                bFinish: [false, false, false, false]
            }
            this.m_client.m_ws.Send(180, 26, data);
        }

        onBtnChi() {

        }

        onBtnPeng() {
            var data = {
                byUser: this.m_client.m_myDesk,
                byBePeng: this.m_client.m_curPlayer,
                byPs: this.m_client.m_lastTile
            }
            this.m_client.m_ws.Send(180, 31, data);
        }

        onBtnHu() {
            var data = {
                byUser: this.m_client.m_myDesk,
                byDianPao: this.m_client.m_curPlayer,
                byPs: this.m_client.m_lastTile
            }
            this.m_client.m_ws.Send(180, 36, data);
        }
        onBtnPass() {
            this.blocks.visible = false;
            this.m_client.m_ws.SendEmpty(180, 75);
        }

        onBtnInvite() {
            var title = "西藏雪域麻将" + (this.deskInfo.getChildByName("pwd") as Laya.Label).text;
            var des = (this.deskInfo.getChildByName("option") as Laya.Label).text;
            if (window.conch) {
                if (Laya.Browser.onIOS) {
                    var Test = Laya.PlatformClass.createClass("AppDelegate"); // 这个名字要与下面声明的OC的类名匹配 iOS不用包名
                    Test.call("onWxshareTitle:andDes:andUrl:andType:", title, des, network.http.downloadUrl, "0");
                    return;
                }
                if (Laya.Browser.onAndriod) {
                    var Test = Laya.PlatformClass.createClass("com.mobile.xzxymj.MainActivity");
                    Test.call("onWXShareText", title, des, network.http.downloadUrl, 0);
                }
            }
        }

        joinTeamRoom() {
            if (window.conch) {
                if (Laya.Browser.onIOS) {
                    var Test = Laya.PlatformClass.createClass("AppDelegate"); // 这个名字要与下面声明的OC的类名匹配 iOS不用包名
                    Test.call("joinRoom:andOpenId:", game.gameInfo.deskPwd + "", game.userInfo.open_id);
                }
            }
        }

        quitTeamRoom() {
            if (window.conch) {
                if (Laya.Browser.onIOS) {
                    var Test = Laya.PlatformClass.createClass("AppDelegate"); // 这个名字要与下面声明的OC的类名匹配 iOS不用包名
                    Test.call("quitRoom");
                }
            }
        }

        onMic() {
            if (window.conch) {
                if (Laya.Browser.onIOS) {
                    var Test = Laya.PlatformClass.createClass("AppDelegate"); // 这个名字要与下面声明的OC的类名匹配 iOS不用包名
                    Test.call("openMic");
                }
            }
        }

        onSpeaker() {
            if (window.conch) {
                if (Laya.Browser.onIOS) {
                    var Test = Laya.PlatformClass.createClass("AppDelegate"); // 这个名字要与下面声明的OC的类名匹配 iOS不用包名
                    Test.call("openSpeaker");
                }
            }
        }

        onBack() {
            this.m_client.bOver = true;
            this.quitTeamRoom();
            Laya.loader.load(game.uiAtlas.home, Laya.Handler.create(this, this.onHomeLoaded));
        }

        onHomeLoaded() {
            var home = new uiview.home.homeView();
            Laya.stage.addChild(home);
            this.removeSelf();

        }

        notifyTalk(data) {
            var view = this.vStation(data.desk_station);
            if (data.type == "sound") {
                this.viewTalk.onSoundEffect(parseInt(data.msg), view, this.m_client.users[data.desk_station].bBoy);
            }
            if (data.type == "text") {
                this.viewTalk.onTextEffect(data.msg, view);
            }
            if (data.type == "emoji") {
                this.viewTalk.onEmojiEffect(parseInt(data.msg), view);
            }
        }

        onBtnExchange() {
            var arrStr = (this.exchange.getChildAt(0) as Laya.TextInput).text.split(" ");
            var arrVal = new Array<number>();
            arrStr.forEach((v, idx, a) => {
                arrVal.push(parseInt(v));
            });
            var data = {
                value: arrVal
            }
            if (data.value.length > 2) {
                this.m_client.m_ws.Send(180, 119, data);
            }
            else {
                this.m_client.m_ws.Send(180, 120, data);
            }
        }

        onBtnSet() {
            this.viewSet.showSet();
        }

        showDismiss(bShow) {
            if (bShow)
                this.viewDis.showDismiss();
            else {
                game.gameClient.instance.m_dismiss = [0, 0, 0, 0];
                this.viewDis.visible = false;
            }

        }


        vStation(desk) {
            return ((desk + game.gameInfo.max_people + 1 - this.m_client.m_myDesk) % game.gameInfo.max_people);
        }

        dStation(view) {
            return (game.gameInfo.max_people + view - 1 + this.m_client.m_myDesk) % game.gameInfo.max_people;
        }

        showUserInfo(view) {
            var d = this.dStation(view);
            var infoVew = new userInfoView(d);
            this.addChild(infoVew);
        }

        sendCards(data) {
            for (let i = 0; i < game.gameInfo.max_people; ++i) {
                this.hands[this.vStation(i)].removeAll();
                this.hands[this.vStation(i)].addCards(data.m_byArHandPai[i]);
            }
        }

        //用于断线重连的,出的牌不在手上
        setOutCard(data) {
            for (let i = 0; i < game.gameInfo.max_people; ++i) {
                this.outs[this.vStation(i)].addCards(data.outpai_[i]);
            }
        }

        //断线重连
        setBlock(data) {
            var view = this.vStation(data.iStation);
            var d = {
                byType: data.byType,
                byData: [data.byData[0], data.byData[0], data.byData[0]]
            };
            if (d.byType == 5) {
                d.byData = [0, 0, 0];
            }
            if (d.byType > 3) {
                d.byData.push(d.byData[0]);
            }
            this.hands[view].addCpg(d);
        }

        //一张一张出的牌
        outCard(data) {
            var desk = data.byUser;
            var view = this.vStation(desk);
            this.hands[view].removeCard(data.byPs);
            // if (view == 1)
            //     this.hands[view].pushLastCard();
            this.outs[view].addCard(data.byPs);
            game.SoundManager.playTile(data.byPs, this.m_client.users[desk].bBoy);
            game.SoundManager.playEffect("outpai");

            // var last = this.outs[view].getLast() as Laya.Image;
            // this.tileArrow.anchorX = last.anchorX;
            // this.tileArrow.anchorY = last.anchorY;
            // this.tileArrow.pos(this.outs[view].parent.x + last.x + last.width * 0.5, this.outs[view].parent.y + last.y + last.y * 0.5);
        }

        zhuaPai(data) {
            var desk = data.byUser;
            var view = this.vStation(desk);
            this.hands[view].addCard(data.byPs == 255 ? 0 : data.byPs);
            this.hands[view].moveLastCard();
            this.reduce.changeText("剩余" + data.men_pai_num + "张");
        }

        notifyBlock(data) {
            if (data.bCanAction) {
                this.blocks.visible = true;
                (this.blocks.getChildAt(0) as Laya.Button).visible = data.bChi;
                (this.blocks.getChildAt(1) as Laya.Button).visible = data.bPeng;
                (this.blocks.getChildAt(2) as Laya.Button).visible = data.bGang;
                (this.blocks.getChildAt(3) as Laya.Button).visible = data.bHu;
                (this.blocks.getChildAt(this.blocks.numChildren - 1) as Laya.Button).visible = true;

                if (data.bGang) {
                    this.blocks.getChildAt(2).offAll(Laya.Event.CLICK);
                    this.blocks.getChildAt(2).on(Laya.Event.CLICK, this, () => {
                        var d = {
                            byUser: this.m_client.m_myDesk,
                            byBeGang: this.m_client.m_curPlayer,
                            byType: data.m_iGangData[0][0],
                            byPs: data.m_iGangData[0][1]
                        }
                        this.m_client.m_ws.Send(180, 34, d);
                    });
                }
            }
        }

        addBlock(data) {
            this.blocks.visible = false;
            var view = this.vStation(data.byUser);
            this.showTimer(data.byUser, 20);
            var d = {
                byType: data.byType,
                byData: []
            }
            switch (data.byType) {
                case 2:
                    //碰
                    this.outs[this.vStation(data.beUser)].removeLast();
                    for (var i = 0; i < 2; ++i) {
                        this.hands[view].removeCard(data.byPs);
                    }
                    game.SoundManager.playTile("peng" + Math.floor(Math.random() * 4), this.m_client.users[data.byUser].bBoy);
                    d.byData = [data.byPs, data.byPs, data.byPs];
                    this.hands[this.vStation(data.byUser)].popImg("peng");
                    break;
                case 4://暗杠
                    for (var i = 0; i < 4; ++i) {
                        this.hands[view].removeCard(data.byPs);
                    }
                    d.byData = [0, 0, 0, 0];
                    game.SoundManager.playTile("gang" + Math.floor(Math.random() * 2), this.m_client.users[data.byUser].bBoy);
                    this.hands[this.vStation(data.byUser)].popImg("rain");
                    break;
                case 5:
                    //补杠
                    this.hands[view].removeCard(data.byPs);
                    d.byData = [data.byPs];
                    game.SoundManager.playTile("gang" + Math.floor(Math.random() * 2), this.m_client.users[data.byUser].bBoy);
                    this.hands[this.vStation(data.byUser)].popImg("wind");
                    break;
                case 6:
                    //明杠
                    this.outs[this.vStation(data.beUser)].removeLast();
                    for (var i = 0; i < 3; ++i) {
                        this.hands[view].removeCard(data.byPs);
                    }
                    d.byData = [data.byPs, data.byPs, data.byPs, data.byPs];
                    game.SoundManager.playTile("gang" + Math.floor(Math.random() * 2), this.m_client.users[data.byUser].bBoy);
                    this.hands[this.vStation(data.byUser)].popImg("wind");
                    break;
            }
            this.hands[view].addCpg(d);
            //this.hus[view].addCard(data.byPs);
        }

        showHsz() {
            this.hands[1].multi = true;
            var pop = new popView("请选择三张牌", "确定", () => {
                var arr = this.hands[1].getUpCard();
                if (arr.length != 3)
                    return;
                var d = {
                    huan_san_: arr
                }
                this.m_client.m_ws.Send(180, 40, d);
                this.hands[1].multi = false;
            });
            this.addChild(pop);
        }

        notifyHu(data) {
            this.blocks.visible = false;
            if (data.byDianPao != 255) {
                //点炮
                this.outs[this.vStation(data.byDianPao)].removeLast();
                //刷新手牌
                //this.hands[this.vStation(data.byUser)].addCard(data.byUser == this.m_client.m_myDesk ? data.byPs : 0);
                game.SoundManager.playTile("hu" + Math.floor(Math.random() * 3), this.m_client.users[data.byUser].bBoy);
                this.hands[this.vStation(data.byUser)].popImg("hu");
            } else {
                //自摸
                this.hands[this.vStation(data.byUser)].removeLast();
                game.SoundManager.playTile("zimo0", this.m_client.users[data.byUser].bBoy);
                this.hands[this.vStation(data.byUser)].popImg("zimo");
            }
            this.hus[this.vStation(data.byUser)].addCard(data.byPs);
        }

        clearUI() {
            this.blocks.visible = false;
            this.fin.visible = false;
            this.btns.getChildAt(0).visible = false;
            this.tileArrow.pos(-30, -30);
            for (let i = 0; i < game.gameInfo.max_people; ++i) {
                this.hands[i].removeAll();
                this.outs[i].removeAll();
                //(this.players.getChildAt(i).getChildByName("money") as Laya.Label).visible = false;
            }
        }

        m_rest: number = 0;
        showTimer(desk, time: number) {
            this.m_rest = time;
            var view = this.vStation(desk);
            for (let i = 0; i < 4; ++i) {
                this.clock.getChildAt(i).visible = (i == view);
            }
            (this.clock.getChildByName("clip") as Laya.FontClip).value = time + "";
            Laya.timer.loop(1000, this, this._updateTimer);
        }
        _updateTimer() {
            --this.m_rest;
            (this.clock.getChildByName("clip") as Laya.FontClip).value = this.m_rest + "";
            if (this.m_rest < 0) {
                Laya.timer.clear(this, this._updateTimer);
                return;
            }

        }
    }
}