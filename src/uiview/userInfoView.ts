module uiview {
    export class userInfoView extends ui.userInfoViewUI {
        constructor(desk) {
            super();
            Laya.timer.once(2000, this, () => {
                this.removeSelf();
            });
            if (game.gameClient.instance.users[desk] != null) {
                (this.getChildByName("head") as Laya.Image).skin = network.http.webRoot + "/Image/head/" + game.gameClient.instance.users[desk].userId + "_head.png";
                (this.getChildByName("nick") as Laya.Image).skin = network.http.webRoot + "/Image/name/" + game.gameClient.instance.users[desk].userId + ".png";
                (this.getChildByName("uid") as Laya.Label).text = game.gameClient.instance.users[desk].userId + "";
                (this.getChildByName("addr") as Laya.Label).text = game.gameClient.instance.users[desk].addr;
            }else{
                console.log("user "+desk+" is null");
            }
        }
    }
}