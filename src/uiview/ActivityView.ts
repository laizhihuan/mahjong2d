module uiview.home {
    export class ActivityView extends ui.ActivityViewUI {
        constructor() {
            super();
            this.btn_close.on(Laya.Event.CLICK, this, this.OnBtnClose);
            this.list_news.vScrollBarSkin = "";
            // this.bg_view_.getChildByName('close').on(Laya.Event.CLICK, this, () => {
            //     this.bg_view_.visible = false;
            // });

            //this.list_news.scrollBar.hide = true;//隐藏列表的滚动条。
            this.list_news.scrollBar.elasticBackTime = 200;//设置橡皮筋回弹时间。单位为毫秒。
            this.list_news.scrollBar.elasticDistance = 50;//设置橡皮筋极限距离。

            //this.GetData();
        }

        OnBtnClose() {
            this.visible = false;
        }

        GetData() {

            this.list_news.visible = true;

            var kurl = '/app/userlogin.aspx?';
            kurl = network.http.pushValue(kurl, 'user_id', game.userInfo.userId);
            kurl = network.http.pushValue(kurl, 'token', game.userInfo.token);
            var rurl = '/data_interface/tibet/activity_list.aspx';
            kurl = network.http.pushValue(kurl, 'url', rurl);
            network.http.getUrl(kurl, (resp) => {
                if (resp.result == "fail") {
                    console.log(resp.tips);
                    this.list_news.array = [];
                    return;
                }
                var dArr = [];
                for (let i = 0; i < resp.data.length; ++i) {
                    var da = {
                        text_: { text: resp.data[i].title },
                        html_text_: { innerHTML: resp.data[i].shortdes }
                    };
                    dArr.push(da);
                }
                this.list_news.array = dArr;

                // var obj = this.list_news.getChildAt(0);
                // for (let i = 0; i < this.list_news.array.length; ++i) {
                //     var div = obj.getChildAt(i).getChildByName("html_text_")   as  HTMLDivElement;
                //     div.innerHTML = "<font style='fontSize:32' color='#67fc2c'>"+resp.data[i].shortdes+"</font>";
                //     //"<font style='fontSize:30' color='#67fc2c'>测试<br/></font><font style='fontSize:20'>html组件111111<br/></font>";
                // }

            });
        }
    }
}