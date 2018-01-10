module uiview.home {
    export class createView extends ui.createViewUI {
        group_id_ = -1;

        constructor() {
            super();
            this.getChildByName("close").on(Laya.Event.CLICK, this, () => {
                this.visible = false;
            });
            var item0 = this.view.getChildByName("item0");
            var i = 0;
            for (var key in game.ruleItem0) {
                if (game.ruleItem0[key].label.indexOf(',') > 0) {
                    //radiogroup
                    (item0.getChildAt(i) as Laya.RadioGroup).labels = game.ruleItem0[key].label;
                } else {
                    //checkbox
                    (item0.getChildAt(i) as Laya.CheckBox).label = game.ruleItem0[key].label;
                }
                ++i;
            }
            this.btnCreate.on(Laya.Event.CLICK, this, this.createDesk);
        }

        ShowCreateDesk(group_id, group_name) {
            this.group_id_ = group_id;
            this.group_name.text = group_name;
            this.visible = true;
        }

        createDesk() {
            var game_info = [
                { game_id_: 60015441, game_name: "血战麻将" },
                { game_id_: 60015442, game_name: "血流成河" }
            ];

            game.gameInfo.nameId = game_info[this.gameTab.selectedIndex].game_id_;

            var url = "/app/userlogin.aspx?user_id=" + game.userInfo.userId + "&token=" + game.userInfo.token;
            var count = 4;
            var jsonRule = {}
            var item0 = this.view.getChildByName("item0");
            var round = game.ruleItem0.round.value[(item0.getChildAt(0) as Laya.RadioGroup).selectedIndex];
            var i = 0;
            for (var key in game.ruleItem0) {
                if (game.ruleItem0[key].label.indexOf(',') > 0) {
                    //radiogroup
                    jsonRule[key] = game.ruleItem0[key].value[(item0.getChildAt(i) as Laya.RadioGroup).selectedIndex];
                } else {
                    //checkbox
                    jsonRule[key] = (item0.getChildAt(i) as Laya.CheckBox).selected;
                }
                ++i;
            }
            var url2 = "/data_interface/desk_mng.aspx?page_action=create_desk&game_id=" + game.gameInfo.nameId + "&max_pople=" + count + "&round_times=" + round + "&group_id=" + this.group_id_ + "&json_rule=" + encodeURI(JSON.stringify(jsonRule));
            url += "&url=" + url2;
            network.http.getUrl(url, (resp) => {
                if (resp.result == "fail") {
                    console.log("create desk fail:" + resp.tips);
                    return;
                }
                homeView.instance.joinDesk("000000");
            });
        }
    }
}