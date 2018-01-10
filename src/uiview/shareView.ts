module uiview.home {
    export class shareView extends ui.viewShareUI {
        constructor() {
            super();
            this.getChildAt(0).on(Laya.Event.CLICK, this, () => {
                this.visible = false;
            });
            this.btnFriend.on(Laya.Event.CLICK, this, this.onBtnShare, ["0"]);
            this.btnZone.on(Laya.Event.CLICK, this, this.onBtnShare, ["1"]);
        }

        onBtnShare(type) {
            if (window.conch) {
                if (Laya.Browser.onIOS) {
                    var Test = Laya.PlatformClass.createClass("AppDelegate"); // 这个名字要与下面声明的OC的类名匹配 iOS不用包名
                    Test.call("onWxshareTitle:andDes:andUrl:andType:", "西藏雪域麻将", "雪域西藏麻将", network.http.downloadUrl, type);
                }
                if (Laya.Browser.onAndriod) {
                    var Test = Laya.PlatformClass.createClass("com.mobile.xzxymj.MainActivity");
                    Test.call("onWXShareText", "西藏雪域麻将", "西藏雪域麻将", network.http.downloadUrl, type);
                }
            }
        }
    }
}