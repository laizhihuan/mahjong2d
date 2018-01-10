module uiview.home {
    export class groupView extends ui.groupViewUI {
        constructor() {
            super();
            this.btnMyGrp.on(Laya.Event.CLICK, this, this.onBtnMyGroup);
            this.btnMyDesk.on(Laya.Event.CLICK, this, this.onBtnMyDesk);
            this.bg_view_.getChildByName('close').on(Laya.Event.CLICK, this, () => {
                this.bg_view_.visible = false;
            });

            //ui_join_group_
            this.btnJoin.on(Laya.Event.CLICK, this, this.onBtnJoin);

            this.ui_join_group_.visible = false;
            this.list_group_.mouseHandler = new Laya.Handler(this, this.onListGrpMouse);
            this.list_group_.vScrollBarSkin ="";

            this.list_desk_.mouseHandler = new Laya.Handler(this, this.onListDeskMouse);
            
        }

        onListDeskMouse(e: Laya.Event, index: number) {
            if (e.type == Laya.Event.CLICK) {
                console.log(e.target.name);
                if (e.target.name == "btn_join") {
                   console.log(  this.list_desk_.array[index].btn_join.desk_pwd);
                   var home_view = this.parent as homeView;
                   home_view.joinDesk(this.list_desk_.array[index].btn_join.desk_pwd);
                }
            }
        }

        onListGrpMouse(e: Laya.Event, index: number) {
            if (e.type == Laya.Event.CLICK) {
                console.log(e.target.name);
                if (e.target.name == "btn_create_desk") {
                    var group_id = this.list_group_.array[index].id.text;
                    var group_name = this.list_group_.array[index].name.text;
                    this.bg_view_.visible = false;
                    
                    var home_view = this.parent as homeView;
                    home_view.viewCreate.ShowCreateDesk(group_id,group_name);
                }

                if (e.target.name == "btn_exit_group") {
                    var group_id = this.list_group_.array[index].id.text;
                     this.ExitGroup(group_id);
                }

                //btn_view_member
                if (e.target.name == "btn_view_member") {
                    var group_id = this.list_group_.array[index].id.text;
                     this.ViewMember(group_id);
                }
            }
        }

        ExitGroup(group_id){
            var kurl = '/app/userlogin.aspx?';
            kurl = network.http.pushValue(kurl, 'user_id', game.userInfo.userId);
            kurl = network.http.pushValue(kurl, 'token', game.userInfo.token);
            var rurl = '/data_interface/desk_mng.aspx?';
            rurl = network.http.pushValue(rurl, 'page_action', 'leave_group');
            rurl = network.http.pushValue(rurl, 'group_id', group_id);
            kurl = network.http.pushValue(kurl, 'url', rurl);
            network.http.getUrl(kurl, (resp) => {
                if (resp.result == "fail") {
                   MsgBoxView.create("退群失败",this);
                    return;
                }

                  MsgBoxView.create("退群成功",this);
                  this.onBtnMyGroup();
            });
        }

        onBtnJoin() {
            this.ui_join_group_.visible = true;
            this.list_group_.visible = false;
            this.list_desk_.visible = false;
            this.list_member_.visible = false;
        }

        ViewMember(group_id)
        {
            this.list_group_.visible = false;
            this.list_member_.visible = true;
            this.list_member_.array = [];

            var kurl = '/app/userlogin.aspx?';
            kurl = network.http.pushValue(kurl, 'user_id', game.userInfo.userId);
            kurl = network.http.pushValue(kurl, 'token', game.userInfo.token);
            var rurl = '/data_interface/desk_mng.aspx?';
            rurl = network.http.pushValue(rurl, 'page_action', 'get_group_member');
            rurl = network.http.pushValue(rurl, 'group_id', group_id);

            kurl = network.http.pushValue(kurl, 'url', rurl);
            network.http.getUrl(kurl, (resp) => {
                if (resp.result == "fail") {
                    console.log(resp.tips);
                    this.list_member_.array = [];
                    return;
                }
                var dArr = [];
                for (let i = 0; i < resp.data.length; ++i) {
                    var head_pic = network.http.webRoot+"/image/head/"+resp.data[i].user_id+"_head.png";
                    var da = {
                        user_id: { text: resp.data[i].user_id },
                        nick_name: { text: resp.data[i].NickName },
                        user_credit: { text: resp.data[i].user_credit },
                        head_pic: { skin: head_pic,width:66,height:66 }
                    };
                    dArr.push(da);
                }
                this.list_member_.array = dArr;
            });
        }

        onBtnMyGroup() {
            this.list_group_.array = [];
            this.bg_view_.visible = true;
            this.list_group_.visible = true;
            this.list_desk_.visible = false;
            this.list_member_.visible = false;

            this.ui_join_group_.visible = false;

            var kurl = '/app/userlogin.aspx?';
            kurl = network.http.pushValue(kurl, 'user_id', game.userInfo.userId);
            kurl = network.http.pushValue(kurl, 'token', game.userInfo.token);
            var rurl = '/data_interface/desk_mng.aspx?';
            rurl = network.http.pushValue(rurl, 'page_action', 'get_my_group_list');
            kurl = network.http.pushValue(kurl, 'url', rurl);
            network.http.getUrl(kurl, (resp) => {
                if (resp.result == "fail") {
                    console.log(resp.tips);
                    this.list_group_.array = [];
                    return;
                }
                var dArr = [];
                for (let i = 0; i < resp.data.length; ++i) {
                    var da = {
                        id: { text: resp.data[i].group_id },
                        name: { text: resp.data[i].group_name },
                        rate: { text: resp.data[i].multiplying_factor },
                        my: { text: resp.data[i].user_credit },
                        least: { text: resp.data[i].least_credit },
                        status: { visible: resp.data[i].member_status == "1" },
                        btn_create_desk: { visible: resp.data[i].is_disabled == "0" },
                        btn_exit_group: { visible: resp.data[i].is_disabled == "0" },
                        btn_view_member: {}
                    };

                    if(resp.data[i].member_status == "0")
                    {
                        da.status.visible = true;

                        da.btn_create_desk.visible = false;
                        da.btn_exit_group.visible = false;
                    }

                    dArr.push(da);
                }
                this.list_group_.array = dArr;

                // var obj = this.list_group_.getChildAt(0);
                // for (let i = 0; i < this.list_group_.array.length; ++i) {
                //     var btn_create_desk = obj.getChildAt(i).getChildByName("btn_create_desk_") as Laya.Button;
                //     var btn_exit_group = obj.getChildAt(i).getChildByName("btn_exit_group_") as Laya.Button;
                   
                //     var txt_status = obj.getChildAt(i).getChildByName("status") as Laya.Label;
                //     if(resp.data[i].member_status=="0")
                //     {
                //         txt_status.visible = true;
                //         btn_create_desk.visible = false;
                //         btn_exit_group.visible = false;
                //     }
                //  }

            });
        }

        OnBtnCreateDesk(param_arr) {
            var group_id = param_arr[0].group_id;
        }

        onBtnMyDesk() {
            this.bg_view_.visible = true;
            this.list_group_.visible = false;
            this.list_member_.visible = false;
            this.list_desk_.visible = true;

            var kurl = '/app/userlogin.aspx?';
            kurl = network.http.pushValue(kurl, 'user_id', game.userInfo.userId);
            kurl = network.http.pushValue(kurl, 'token', game.userInfo.token);
            var rurl = '/data_interface/desk_mng.aspx?';
            rurl = network.http.pushValue(rurl, 'page_action', 'get_my_group_desk_list');
            kurl = network.http.pushValue(kurl, 'url', rurl);
            network.http.getUrl(kurl, (resp) => {
                if (resp.result == "fail") {
                    console.log(resp.tips);
                    this.list_desk_.array = [];
                    MsgBoxView.create("没有能加入的桌子!",this);
                    return;
                }
                var dArr = [];
                for (let i = 0; i < resp.data.length; ++i) {
                    var da = {
                        rule: { text: resp.data[i].describe },
                        btn_join:{desk_pwd:resp.data[i].desk_pwd}
                    }
                    dArr.push(da);
                }
                this.list_desk_.array = dArr;

            });
        }
    }
}