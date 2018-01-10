module game {
    export class gameClient {
        static instance: gameClient = null;
        m_ws: network.ws;
        users: Array<userStruct> = null;

        m_myDesk: number = 0;   //自己的座位号
        m_status: number = 0;   //桌子状态

        m_dismiss = [0, 0, 0, 0];

        m_curPlayer: number;
        m_lastTile: number;

        bOver = false;

        constructor() {
            console.log("new game client");
            gameClient.instance = this;
            this.bOver = false;
            console.log(gameInfo.serverIp + ":" + gameInfo.serverPort);
            this.users = new Array<userStruct>();
            if (uiview.gameView.instance.recordMsg != null) {
                Laya.timer.loop(3 * 200, this, this.OnRecordMessage);
            } else {
                this.initWebSocket();
            }
            this.reconnectCount = 0;
        }

        recordIdx = 0;
        OnRecordMessage() {
            if (this.recordIdx >= uiview.gameView.instance.recordMsg.length) {
                Laya.timer.clear(this, this.OnRecordMessage);
                return;
            }
            this.OnMessage(JSON.parse(uiview.gameView.instance.recordMsg[this.recordIdx]));
            ++this.recordIdx;
        }

        OnMessage(data) {
            switch (data.head.main) {
                case 1:
                    this.OnConnect(data.head, data.data);
                    break;
                case 100:
                    this.OnLogon(data.head, data.data);
                    break;
                case 101:
                    this.OnUserList(data.head, data.data);
                    break;
                case 102:
                    this.OnUserAction(data.head, data.data);
                    break;
                case 103:
                    this.OnRoom(data.head, data.data);
                    break;
                case 180:
                    this.OnGame(data.head, data.data);
                    break;
                case 150:
                    this.OnFrame(data.head, data.data);
                    break;
            }
        }

        initWebSocket() {
            if (this.bOver) {
                return;
            }
            console.log("initWebSocket");
            var r = uiview.rollView.startRoll(uiview.gameView.instance);

            this.users = new Array<userStruct>();
            this.m_ws = new network.ws("ws://" + gameInfo.serverIp + ":" + gameInfo.serverPort);
            this.m_ws.OnMessage = (data) => {
                this.OnMessage(data);
            };
            this.m_ws.OnOpen = () => {
                r.stopRoll();
                var room_data = {
                    uNameID: gameInfo.nameId,
                    dwUserID: userInfo.userId,
                    szMD5Pass: userInfo.md5,
                    desk_pwd_: gameInfo.deskPwd
                }
                this.m_ws.Send(100, 5, room_data);
            };
            this.m_ws.OnClose = () => {
                this.onClose();
            };

        }

        reconnectCount = 0;
        onClose() {
            if (this.bOver) {
                Laya.timer.clear(this, this.initWebSocket);
                return;
            }
            if (this.reconnectCount < 5) {
                Laya.timer.clear(this, this.initWebSocket);
                Laya.timer.once(2000, this, this.initWebSocket);
                ++this.reconnectCount;
            } else {
                var pop = new uiview.popView("连接服务器失败,请检测您的网络设置", "重连", () => {
                    this.reconnectCount = 0;
                    this.initWebSocket();
                }, "退出", this.back);
                uiview.gameView.instance.addChild(pop);
            }
        }

        back() {
            if (uiview.gameView.instance != null) {
                uiview.gameView.instance.onBack();
            }
        }
        //1
        OnConnect(head, data) {
            switch (head.ass) {
                case 1:
                    Laya.timer.once(7000, this, () => {
                        this.m_ws.SendEmpty(1, 1, 0);
                    });
                    break;
            }
        }

        //100
        OnLogon(head, data) {
            switch (head.ass) {
                case 2:
                    console.log("logon ok");
                    this.m_ws.SendEmpty(1, 1, 0);
                    break;
                case 3:
                    console.log("logon error!");
                    break;
                case 4:
                    if (head.hcode == 0) {
                        this.m_ws.SendEmpty(180, 1, 1);
                    } else {
                        this.m_ws.Send(150, 1, { bEnableWatch: 0 });
                    }
                    break;

            }
        }

        //101
        OnUserList(head, data) {
            switch (head.ass) {
                case 1:
                case 2:
                    if (head.hcode === 12) {
                        uiview.gameView.instance.setPlayerInfo(this.users);
                        return;
                    }
                    var user = new userStruct();
                    user.temp_chip = data.temp_chip_;
                    user.userId = data.dwUserID;
                    user.deskStation = data.desk_station_;
                    user.bBoy = data.gender == 0;
                    user.addr = data.addr;
                    this.users[user.deskStation] = user;
                    if (data.dwUserID === userInfo.userId) {
                        this.m_myDesk = user.deskStation;
                    }
                    break;
            }
        }

        //102
        OnUserAction(head, data) {
            switch (head.ass) {
                case 2:
                    //user sit
                    //bDeskStation
                    break;
                case 5:
                    //user come
                    var user = new userStruct();
                    user.temp_chip = data.temp_chip_;
                    user.userId = data.dwUserID;
                    user.deskStation = data.desk_station_;
                    user.bBoy = data.gender == 0;
                    user.addr = data.addr;
                    this.users[user.deskStation] = user;
                    if (data.dwUserID === userInfo.userId) {
                        this.m_myDesk = user.deskStation;
                    }
                    uiview.gameView.instance.setPlayerInfo(this.users);
                    break;
                case 6:
                    //user leave
                    var desk = this.getDeskstaionByUId(data.dwUserID);
                    this.users[desk] = null;
                    uiview.gameView.instance.setPlayerInfo(this.users);
                    break;
                case 7:
                    //user cut
                    break;
            }
        }

        getDeskstaionByUId(uid) {
            for (let i = 0; i < this.users.length; ++i) {
                if (this.users[i].userId === uid) {
                    return this.users[i].deskStation
                }
            }
            return -1;
        }
        //103
        OnRoom(head, data) {
            switch (head.ass) {
                case 10:
                    //update money todo
                    //this.users
                    break;
            }
        }

        //150
        OnFrame(head, data) {
            switch (head.ass) {
                case 2:
                    this.setGameStation(head, data);
                    break;
            }
        }

        //180
        OnGame(head, data) {
            console.log("on game :" + head.ass);
            switch (head.ass) {
                case 1:
                    //userAgree
                    break;
                case 10:
                    //gameBegin
                    uiview.gameView.instance.gameBegin(data);
                    break;
                case 16:
                    //2szDir&Gp
                    break;
                case 19:
                    //Send card
                    uiview.gameView.instance.sendCards(data);
                    break;
                case 25:
                    //beginOut
                    uiview.gameView.instance.showTimer(data.byUser, 20);
                    break;
                case 26:
                    //notifyDingQue
                    uiview.gameView.instance.showChips(data);
                    break;
                case 27:
                    //notifyOutCard
                    this.m_curPlayer = data.byUser;
                    this.m_lastTile = data.byPs;
                    uiview.gameView.instance.outCard(data);
                    break;
                case 28:
                    //notifyZhua
                    this.m_lastTile = data.byPs;
                    this.m_curPlayer = data.byUser;
                    uiview.gameView.instance.showTimer(data.byUser, 20);
                    uiview.gameView.instance.zhuaPai(data);
                    break;
                case 29:
                    //notifyBlock
                    uiview.gameView.instance.notifyBlock(data);
                    break;
                case 31:
                    //notifyPeng
                    let d = {
                        byUser: data.byUser,
                        beUser: data.byBePeng,
                        byPs: data.byPs,
                        byType: 2
                    }
                    uiview.gameView.instance.addBlock(d);
                    break;
                case 34:
                    //notifyGang
                    let dd = {
                        byUser: data.byUser,
                        beUser: data.byBeGang,
                        byPs: data.byPs,
                        byType: data.byType
                    }
                    uiview.gameView.instance.addBlock(dd);
                    break;
                case 36:
                    //notifyHu
                    uiview.gameView.instance.notifyHu(data);
                    break;
                case 37:
                    //countFen
                    uiview.gameView.instance.fin.showFin(data);
                    break;
                case 40:
                    uiview.gameView.instance.showHsz();
                    break;
                case 41:
                    // if (data.json_rule != null) {
                    //     game.gameInfo.json_rule = JSON.parse(data.json_rule);
                    //     this.parseJsonRule();
                    // }
                    break;
                case 52:
                    //showAllOver
                    this.bOver = true;
                    uiview.gameView.instance.allfin.showAllFin(data)
                    break;
                case 142:
                    //userAgree/Offline
                    uiview.gameView.instance.onUserAgreeList(data);
                    break;
                case 143:
                    //setDeskInfo
                    uiview.gameView.instance.setDeskInfo(data);
                    break;
                case 144:
                    uiview.gameView.instance.notifyTalk(data);
                    break;
                case 137:
                    //dismiss success
                    if (this.m_status == 0) {
                        uiview.gameView.instance.onBack();
                        return;
                    }
                    uiview.gameView.instance.showDismiss(false);
                    break;
                case 136:
                    //showDismiss
                    this.m_dismiss[data.desk_station_] = data.dismiss_status_;
                    uiview.gameView.instance.showDismiss(true);
                    break;
                case 138:
                    //showDismiss
                    uiview.gameView.instance.showDismiss(true);
                    break;
                case 163:
                    //dismiss info
                    //data.time
                    for (let i = 0; i < 4; ++i) {
                        this.m_dismiss[i] = data.arr[i];
                    }
                    uiview.gameView.instance.showDismiss(data.req);
                    break;
                case 140:
                    var user = new userStruct();
                    user.temp_chip = data.temp_chip_;
                    user.userId = data.dwUserID;
                    user.deskStation = this.users.length;
                    user.bBoy = data.gender == 0;
                    user.addr = data.addr;
                    this.users[user.deskStation] = user;
                    if (data.dwUserID === userInfo.userId) {
                        this.m_myDesk = user.deskStation;
                    }
                    uiview.gameView.instance.setPlayerInfo(this.users);
                    break;
            }
        }

        reqOutCard(tile) {
            var data = {
                byUser: this.m_myDesk,
                byPs: tile,
                bTing: false
            }
            this.m_ws.Send(180, 27, data);
        }

        setGameStation(head, data) {
            //uiview.gameView.instance.setPlayerInfo(this.users);
            switch (data.Stationpara) {
                case 0:
                case 1:
                    break;
                case 20:
                    //send card
                    uiview.gameView.instance.sendCards(data);
                    //uiview.gameView.instance.setNt(data.b)
                    break;
                case 22:
                    this.m_curPlayer = data.m_byNowOutStation;
                    uiview.gameView.instance.showTimer(data.m_byNowOutStation, 20);
                    this.m_lastTile = data.m_byOtherOutPai;
                    uiview.gameView.instance.sendCards(data);
                    uiview.gameView.instance.setOutCard(data);
                    for (let i = 0; i < data.cpg_.length; ++i) {
                        for (let j = 0; j < data.cpg_[i].length; ++j) {
                            uiview.gameView.instance.setBlock(data.cpg_[i][j]);
                        }
                    }
                    break;
            }
        }
    }

    export enum msgMainDefine {
        MAIN_CONNECTION = 1,
        MAIN_
    }
}