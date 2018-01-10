module uiview.home {
    export class loginView extends ui.loginViewUI {

        gameVersion = {
            android_version: 0.8,
            ios_version: 0.8
        }

        public static instance: loginView = null;
        constructor() {
            super();
            loginView.instance = this;
            this.btnLogin.on(Laya.Event.CLICK, this, this.onBtnLogin);
            this.btnUpdate.on(Laya.Event.CLICK, this, this.gotoUpdate);
            this.input.visible = (window.conch == null);
            this.checkUpdate();
            this.startLocation();
        }

        startLocation() {
            if (window.conch) {
                if (Laya.Browser.onIOS) {
                    var Test = Laya.PlatformClass.createClass("AppDelegate"); // 这个名字要与下面声明的OC的类名匹配 iOS不用包名
                    Test.call("startLocation");
                    return;
                }
                if (Laya.Browser.onAndriod) {
                    var Test = Laya.PlatformClass.createClass("com.mobile.xzxymj.MainActivity");
                    Test.call("startLocation");
                }
            }

        }

        checkUpdate() {
            this.updateRoot.visible = false;
            if (window.conch == null)
                return;
            network.http.getUrl("http://qp5.top:9001/xymj/version.txt", (resp) => {
                var label = (this.updateRoot.getChildByName("label") as Laya.Label);
                label.text = resp.label;
                label.pos((this.updateRoot.width - label.width) * 0.5, (this.updateRoot.height - label.height) * 0.3);
                if (Laya.Browser.onIOS) {
                    if (resp.ios_version > this.gameVersion.ios_version) {
                        this.updateRoot.visible = true;
                        (this.updateRoot.getChildByName("local") as Laya.Label).text = "当前版本:" + this.gameVersion.ios_version;
                        (this.updateRoot.getChildByName("server") as Laya.Label).text = "最新版本" + resp.ios_version;
                    }
                }
                if (Laya.Browser.onAndriod) {
                    if (resp.android_version > this.gameVersion.android_version) {
                        this.updateRoot.visible = true;
                        (this.updateRoot.getChildByName("local") as Laya.Label).text = "当前版本:" + this.gameVersion.android_version;
                        (this.updateRoot.getChildByName("server") as Laya.Label).text = "最新版本:" + resp.ios_version;
                    }
                }
            });
        }

        gotoUpdate() {
            if (window.conch) {
                window.conch.setExternalLink(network.http.downloadUrl);
            }
        }

        onBtnLogin() {
            if (window.conch) {
                var wx_tk = Laya.LocalStorage.getItem(game.gameInfo.ITEM_WX_TOKEN);
                var wx_open = Laya.LocalStorage.getItem(game.gameInfo.ITEM_WX_OPEN_ID);
                if (wx_tk != null && wx_tk != "null") {
                    this.loginByToken(wx_open, wx_tk);
                    return;
                }
                if (Laya.Browser.onIOS) {
                    var Test = Laya.PlatformClass.createClass("AppDelegate"); // 这个名字要与下面声明的OC的类名匹配 iOS不用包名
                    Test.call("onWXLogin");
                    return;
                }
                if (Laya.Browser.onAndriod) {
                    var Test = Laya.PlatformClass.createClass("com.mobile.xzxymj.MainActivity");
                    Test.call("onWXLogin");
                    return;
                }
            }
            if (game.userInfo.token != null) {
                this.loginByToken(game.userInfo.token, game.userInfo.token);
            } else {
                var str = this.input.text;
                this.loginByToken(str, str);
            }
        }

        wechatCallback(code) {
            console.log("wechat Callback :" + code);
            var wechat_url = "https://api.weixin.qq.com/sns/oauth2/access_token?appid=" + "wx2d21f33195479c9e" + "&secret=" + "c5d2e96c26ba239393e2db8fce23e632" + "&code=" + code + "&grant_type=authorization_code";
            var url_path = "data_interface/weixin_login.aspx";
            var str_param = "page_action=weixin_login&weixin_url=";
            var encode_url = encodeURIComponent(wechat_url);    //这个函数会把？之类的也编码，encodeURI则不会
            str_param += encode_url;
            network.http.postUrl(url_path, (resp) => {
                if (resp.result == "fail") {
                    console.log(resp.tips);
                    return;
                }
                this.loginByToken(resp.open_id, resp.access_token);
            }, str_param);
        }

        loginByToken(open_id, token) {
            var url: string = "data_interface/login.aspx";
            // http.pushValue(url,"open_id",str);
            // http.pushValue(url,"token",str);

            game.userInfo.token = token;
            game.userInfo.open_id = open_id;
            Laya.LocalStorage.setItem(game.gameInfo.ITEM_WX_OPEN_ID, open_id);
            Laya.LocalStorage.setItem(game.gameInfo.ITEM_WX_TOKEN, token);

            url += "?open_id=" + open_id;
            url += "&token=" + token;
            network.http.getUrl(url, (resp) => {
                if (resp.result == "fail") {
                    var pop = new popView(resp.tips, "确定");
                    this.addChild(pop);
                    if (resp.tips == "用户名或密码错误") {
                        Laya.LocalStorage.setItem(game.gameInfo.ITEM_WX_TOKEN, null);
                        Laya.LocalStorage.setItem(game.gameInfo.ITEM_WX_OPEN_ID, null);
                        game.userInfo.token = null;
                        game.userInfo.open_id = null;
                    }
                    return;
                }
                game.userInfo.userId = resp.data.userId;
                game.userInfo.gold = resp.data.gold;
                game.userInfo.md5 = resp.data.md5;
                Laya.loader.load(game.uiAtlas.home, Laya.Handler.create(this, this.onLoaded));
            });
        }
        onLoaded() {
            var home = new homeView();
            Laya.stage.addChild(home);
            this.removeSelf();
        }
    }
}