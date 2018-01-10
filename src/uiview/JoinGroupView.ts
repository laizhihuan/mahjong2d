module uiview.home {
    export class JoinGroupView extends ui.JoinGroupViewUI {
        constructor() {
            super();
            this.btn_cancel_.on(Laya.Event.CLICK, this, this.OnBtnCancel);
            this.btn_confirm_.on(Laya.Event.CLICK, this, this.OnBtnConfirm);
            // this.bg_view_.getChildByName('close').on(Laya.Event.CLICK, this, () => {
            //     this.bg_view_.visible = false;
            // });
        }

        OnBtnCancel(){
            this.visible = false;
        }

        OnBtnConfirm(){
            var group_id = this.edit_group_id_.text;

            if(group_id.length<=0)
            {
                MsgBoxView.create("请输入群号!",this);
                return;
            }

            var kurl = '/app/userlogin.aspx?';
            kurl = network.http.pushValue(kurl, 'user_id', game.userInfo.userId);
            kurl = network.http.pushValue(kurl, 'token', game.userInfo.token);
            var rurl = '/data_interface/desk_mng.aspx?';
            rurl = network.http.pushValue(rurl, 'page_action', 'join_group');
            rurl = network.http.pushValue(rurl, 'group_id', group_id);
            kurl = network.http.pushValue(kurl, 'url', rurl);

            network.http.getUrl(kurl, (resp) => {
                if (resp.result == "fail") {
                    console.log(resp.tips);
                    
                    MsgBoxView.create(resp.tips,this);
                    return;
                }
                //resp.data
                 this.visible = false;
                var group_view = this.parent as groupView;
                group_view.onBtnMyGroup();
            });
        }
    }
}