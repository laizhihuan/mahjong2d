
import View=laya.ui.View;
import Dialog=laya.ui.Dialog;
module ui {
    export class ActivityViewUI extends View {
		public list_news:Laya.List;
		public btn_close:Laya.Button;

        public static  uiView:any ={"type":"View","props":{"width":1280,"runtime":"uiview.home.ActivityView","height":720},"child":[{"type":"Image","props":{"y":-147,"x":-92,"width":1478,"skin":"nonepack/frame_bg.png","name":"aaa","height":956,"alpha":0.1}},{"type":"Image","props":{"y":43,"x":107,"width":1065,"skin":"nonepack/frame_bg.png","sizeGrid":"40,38,43,39","height":634}},{"type":"Image","props":{"y":71,"x":551,"skin":"home/title_activity.png"}},{"type":"List","props":{"y":142,"x":155,"width":960,"var":"list_news","spaceY":1,"height":460},"child":[{"type":"Box","props":{"y":0,"x":0,"width":960,"renderType":"render","height":440},"child":[{"type":"Image","props":{"y":0,"x":0,"width":960,"skin":"home/insider_frame_bg.png","sizeGrid":"32,32,32,32","name":"bg_","height":440}},{"type":"HTMLDivElement","props":{"y":112,"x":23,"width":910,"name":"html_text_","height":298}},{"type":"Label","props":{"y":48,"x":113,"width":725,"text":"没有消息","name":"text_","height":32,"fontSize":32,"color":"#000000","bold":true,"align":"center"}}]}]},{"type":"Button","props":{"y":55,"x":1089,"var":"btn_close","stateNum":1,"skin":"home/btn_close.png"}}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("uiview.home.ActivityView",uiview.home.ActivityView);
			View.regComponent("HTMLDivElement",laya.html.dom.HTMLDivElement);

            super.createChildren();
            this.createView(ui.ActivityViewUI.uiView);

        }

    }
}

module ui {
    export class allFinViewUI extends View {
		public list:Laya.List;
		public btnShare:Laya.Button;
		public btnBack:Laya.Button;

        public static  uiView:any ={"type":"View","props":{"width":1280,"height":720},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"nonepack/allBack.png"}},{"type":"List","props":{"y":114,"x":48,"var":"list","spaceX":48,"repeatX":4},"child":[{"type":"Box","props":{"width":260,"renderType":"render"},"child":[{"type":"Image","props":{"y":24,"x":24,"width":64,"skin":"allfin/HeadImagic.png","name":"head","height":64}},{"type":"Image","props":{"y":29,"x":101,"name":"nick","height":24}},{"type":"Image","props":{"y":-13,"x":179,"skin":"allfin/allover_owner.png","name":"bOwner"}},{"type":"Image","props":{"y":16,"x":16,"skin":"allfin/HeadBack.png"}},{"type":"Image","props":{"y":136,"x":19,"skin":"allfin/allover_txt_dpcs.png"}},{"type":"Image","props":{"y":194,"x":19,"skin":"allfin/allover_txt_jpcs.png"}},{"type":"Image","props":{"y":253,"x":19,"skin":"allfin/allover_txt_zmcs.png"}},{"type":"Image","props":{"y":311,"x":19,"skin":"allfin/allover_txt_mgcs.png"}},{"type":"Image","props":{"y":369,"x":19,"skin":"allfin/allover_txt_egcs.png"}},{"type":"Image","props":{"y":442,"x":31,"skin":"allfin/allover_txt_zf.png"}},{"type":"Label","props":{"y":136,"x":159,"text":"label","name":"dp","fontSize":24,"color":"#ffffff"}},{"type":"Label","props":{"y":195,"x":158,"text":"label","name":"jp","fontSize":24,"color":"#ffffff"}},{"type":"Label","props":{"y":253,"x":160,"text":"label","name":"zm","fontSize":24,"color":"#ffffff"}},{"type":"Label","props":{"y":311,"x":162,"text":"label","name":"mg","fontSize":24,"color":"#ffffff"}},{"type":"Label","props":{"y":369,"x":159,"text":"label","name":"ag","fontSize":24,"color":"#ffffff"}},{"type":"Label","props":{"y":439,"x":162,"text":"label","name":"zf","fontSize":24,"color":"#ffffff"}}]}]},{"type":"Image","props":{"y":21,"x":937,"skin":"allfin/allover_txt_createtime.png"}},{"type":"Image","props":{"y":58,"x":937,"skin":"allfin/allover_txt_deskpwd.png"}},{"type":"Button","props":{"y":627,"x":414,"var":"btnShare","stateNum":1,"skin":"allfin/allover_btn_share.png"}},{"type":"Button","props":{"y":627,"x":703,"var":"btnBack","stateNum":1,"skin":"allfin/allover_btn_return.png"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.allFinViewUI.uiView);

        }

    }
}

module ui {
    export class createViewUI extends View {
		public view:Laya.ViewStack;
		public group_name:Laya.Label;
		public btnCreate:Laya.Button;
		public gameTab:Laya.Tab;

        public static  uiView:any ={"type":"View","props":{"width":1100,"height":640},"child":[{"type":"Image","props":{"y":20,"x":20,"width":1060,"skin":"nonepack/frame_bg.png","sizeGrid":"32,32,32,32","pivotY":0,"pivotX":0,"height":600}},{"type":"Image","props":{"y":42,"x":432,"skin":"home/title_create_room.png"}},{"type":"Button","props":{"y":10,"x":1008,"stateNum":1,"skin":"home/btn_close.png","name":"close"}},{"type":"ViewStack","props":{"y":105,"x":323,"var":"view"},"child":[{"type":"Image","props":{"y":0,"x":0,"width":700,"skin":"home/scale_bg2.png","sizeGrid":"32,32,32,32","name":"item0","height":400},"child":[{"type":"RadioGroup","props":{"y":26,"x":143,"space":50,"skin":"home/radio_yellow.png","selectedIndex":1,"labels":"8局,16局","labelStrokeColor":"#000000","labelSize":32,"labelPadding":"5,0,0,10","labelFont":"SimHei","labelColors":"#40210a,#40210a"}},{"type":"RadioGroup","props":{"y":83,"x":143,"space":50,"skin":"home/radio_yellow.png","selectedIndex":1,"labels":"2番,3番,4番","labelStrokeColor":"#000000","labelSize":32,"labelPadding":"5,0,0,10","labelFont":"SimHei","labelColors":"#40210a,#40210a"}},{"type":"RadioGroup","props":{"y":140,"x":143,"space":50,"skin":"home/radio_yellow.png","selectedIndex":1,"labels":"自摸加底,自摸加番","labelStrokeColor":"#000000","labelSize":32,"labelPadding":"5,0,0,10","labelFont":"SimHei","labelColors":"#40210a,#40210a"}},{"type":"RadioGroup","props":{"y":197,"x":143,"space":50,"skin":"home/radio_yellow.png","selectedIndex":1,"labels":"点杠花(点炮),点杠花(自摸)","labelStrokeColor":"#000000","labelSize":32,"labelPadding":"5,0,0,10","labelFont":"SimHei","labelColors":"#40210a,#40210a"}},{"type":"CheckBox","props":{"y":246,"x":143,"skin":"home/checkbox_yellow.png","labelSize":32,"labelPadding":"5,0,0,10","labelFont":"SimHei","labelColors":"#40210a,#40210a","label":"换三张"}},{"type":"CheckBox","props":{"y":246,"x":382,"skin":"home/checkbox_yellow.png","labelSize":32,"labelPadding":"5,0,0,10","labelFont":"SimHei","labelColors":"#40210a,#40210a","label":"幺九将对"}},{"type":"CheckBox","props":{"y":296,"x":143,"skin":"home/checkbox_yellow.png","labelSize":32,"labelPadding":"5,0,0,10","labelFont":"SimHei","labelColors":"#40210a,#40210a","label":"门清中张"}},{"type":"CheckBox","props":{"y":299,"x":381,"skin":"home/checkbox_yellow.png","labelSize":32,"labelPadding":"5,0,0,10","labelFont":"SimHei","labelColors":"#40210a,#40210a","label":"天地胡"}},{"type":"Label","props":{"y":28,"x":42,"text":"局数:\\n\\n番数:\\n\\n玩法:","fontSize":32,"font":"SimHei","color":"#40210a"}},{"type":"Label","props":{"y":338,"x":62,"var":"group_name","text":"群名","fontSize":32,"font":"SimHei","color":"#40210a"}}]}]},{"type":"Button","props":{"y":503,"x":435,"var":"btnCreate","skin":"home/btn_create.png"}},{"type":"Image","props":{"y":105,"x":70,"width":240,"skin":"home/scale_bg2.png","sizeGrid":"32,32,32,32","height":400}},{"type":"Tab","props":{"y":163,"x":101,"var":"gameTab","space":8,"skin":"home/tab_game.png","selectedIndex":1,"labels":"血战到底,血流成河","labelSize":32,"labelFont":"SimHei","labelColors":"white,white,white","labelBold":true,"direction":"vertical"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.createViewUI.uiView);

        }

    }
}

module ui {
    export class disViewUI extends View {
		public list:Laya.List;
		public btnAgree:Laya.Button;
		public btnRefus:Laya.Button;
		public alarm:Laya.Label;

        public static  uiView:any ={"type":"View","props":{"width":1280,"height":720},"child":[{"type":"Image","props":{"y":160,"x":340,"width":600,"skin":"game/scale_bg.png","sizeGrid":"32,32,32,32","height":400}},{"type":"List","props":{"y":240,"x":480,"var":"list","repeatY":4,"height":120},"child":[{"type":"Box","props":{"y":0,"x":0,"renderType":"render","height":30},"child":[{"type":"Image","props":{"name":"nick","height":24}},{"type":"Label","props":{"y":0,"x":260,"text":"label","name":"state","fontSize":24,"color":"#2d1603"}}]}]},{"type":"Button","props":{"y":472,"x":442,"var":"btnAgree","stateNum":1,"skin":"game/dismis_agree.png","labelSize":24,"labelColors":"white"}},{"type":"Button","props":{"y":472,"x":700,"var":"btnRefus","stateNum":1,"skin":"game/dismis_refuse.png","labelSize":24,"labelColors":"white"}},{"type":"Label","props":{"y":431,"x":538,"text":"解散倒计时:","fontSize":28,"color":"#2d1603"}},{"type":"Label","props":{"y":430,"x":698,"var":"alarm","text":"0","fontSize":28,"color":"#2d1603"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.disViewUI.uiView);

        }

    }
}

module ui {
    export class EnvSetViewUI extends View {
		public btn_close_:Laya.Button;
		public effect_slider_:Laya.HSlider;
		public music_slider_:Laya.HSlider;
		public btn_switch_account_:Laya.Button;
		public btn_exit_game_:Laya.Button;

        public static  uiView:any ={"type":"View","props":{"width":1280,"runtime":"uiview.home.EnvSetView","height":720},"child":[{"type":"Image","props":{"y":-229,"x":-104,"width":1572,"skin":"nonepack/frame_bg.png","name":"aaa","height":1124,"alpha":0.1}},{"type":"Image","props":{"y":157,"x":299,"width":684,"skin":"nonepack/frame_bg.png","sizeGrid":"101,80,53,85","height":453}},{"type":"Button","props":{"y":164,"x":912,"var":"btn_close_","stateNum":1,"skin":"home/btn_close.png"}},{"type":"Image","props":{"y":188,"x":555,"skin":"home/title_set.png"}},{"type":"Image","props":{"y":310,"x":381,"skin":"home/setting_effect.png"}},{"type":"Image","props":{"y":391,"x":381,"skin":"home/setting_music.png"}},{"type":"HSlider","props":{"y":302,"x":474,"var":"effect_slider_","value":50,"skin":"home/hslider.png"}},{"type":"HSlider","props":{"y":383,"x":474,"var":"music_slider_","value":50,"skin":"home/hslider.png"}},{"type":"Button","props":{"y":469,"x":419,"var":"btn_switch_account_","stateNum":3,"skin":"home/btn_switch_account.png","labelSize":32,"labelFont":"Microsoft YaHei"}},{"type":"Button","props":{"y":469,"x":668,"var":"btn_exit_game_","stateNum":3,"skin":"home/btn_exit_game.png","labelSize":32,"labelFont":"SimHei","labelBold":true}}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("uiview.home.EnvSetView",uiview.home.EnvSetView);

            super.createChildren();
            this.createView(ui.EnvSetViewUI.uiView);

        }

    }
}

module ui {
    export class finViewUI extends View {
		public btnCon:Laya.Button;
		public list:Laya.List;

        public static  uiView:any ={"type":"View","props":{"width":1280,"height":720},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"nonepack/over_bj.jpg"}},{"type":"Image","props":{"y":0,"x":0,"width":1280,"skin":"fin/main_mianban.png","sizeGrid":"23,27,18,27","height":110}},{"type":"Image","props":{"y":720,"x":0,"width":1280,"skin":"fin/main_mianban.png","sizeGrid":"23,27,18,27","scaleY":-1,"height":110}},{"type":"Image","props":{"y":10,"x":540,"skin":"fin/over_shule.png","name":"lose"}},{"type":"Image","props":{"y":4,"x":520,"skin":"fin/over_hupai.png","name":"win"}},{"type":"Image","props":{"y":14,"x":530,"skin":"fin/over_liuju.png","name":"hz"}},{"type":"Button","props":{"y":641,"x":559,"var":"btnCon","stateNum":1,"skin":"fin/result_btn_con.png"}},{"type":"List","props":{"y":115,"x":44,"var":"list","spaceY":4,"repeatY":4,"height":500},"child":[{"type":"Box","props":{"y":0,"x":0,"renderType":"render"},"child":[{"type":"Image","props":{"width":1200,"skin":"fin/over_jieshuUI.png","sizeGrid":"21,24,21,24","height":120}},{"type":"Image","props":{"y":29,"x":1100,"skin":"fin/result_pao.png","name":"bPao"}},{"type":"Image","props":{"y":19,"x":1078,"skin":"fin/result_hu.png","name":"bHu"}},{"type":"Image","props":{"y":46,"x":10,"skin":"fin/result_zhuang.png","name":"bNt"}},{"type":"Image","props":{"y":4,"x":72,"name":"nick","height":24}},{"type":"Label","props":{"y":34,"x":975,"text":"label","name":"total","fontSize":24,"color":"#ffffff"}},{"type":"Label","props":{"y":70,"x":975,"text":"label","name":"money","fontSize":24,"color":"#ffffff"}}]}]},{"type":"Label","props":{"y":42,"x":833,"text":"label","name":"label","fontSize":32,"color":"#a81490"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.finViewUI.uiView);

        }

    }
}

module ui {
    export class GameIntroUI extends View {
		public btn_close:Laya.Button;
		public pnl:Laya.Panel;

        public static  uiView:any ={"type":"View","props":{"width":1280,"height":720},"child":[{"type":"Image","props":{"y":-126,"x":-100,"width":1481,"skin":"nonepack/frame_bg.png","name":"aaa","mouseEnabled":true,"height":941,"alpha":0.1}},{"type":"Image","props":{"y":20,"x":0,"width":1280,"skin":"nonepack/frame_bg.png","sizeGrid":"101,80,53,85","height":680}},{"type":"Button","props":{"y":8,"x":1200,"var":"btn_close","stateNum":1,"skin":"home/btn_close.png"}},{"type":"Image","props":{"y":48,"x":551,"skin":"home/title_intro.png"}},{"type":"Panel","props":{"y":125,"x":40,"width":1200,"var":"pnl","mouseEnabled":true,"height":520},"child":[{"type":"Box","props":{"y":0,"x":0,"height":6400},"child":[{"type":"Image","props":{"skin":"nonepack/rule_0.jpg"}},{"type":"Image","props":{"y":1024,"x":0,"skin":"nonepack/rule_1.jpg"}},{"type":"Image","props":{"y":2048,"x":0,"skin":"nonepack/rule_2.jpg"}},{"type":"Image","props":{"y":3072,"skin":"nonepack/rule_3.jpg"}},{"type":"Image","props":{"y":4096,"x":0,"skin":"nonepack/rule_4.jpg"}},{"type":"Image","props":{"y":5120,"x":0,"skin":"nonepack/rule_5.jpg"}}]}]}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.GameIntroUI.uiView);

        }

    }
}

module ui {
    export class gameViewUI extends View {
		public deskInfo:Laya.Sprite;
		public clock:Laya.Image;
		public players:Laya.Sprite;
		public tileArrow:Laya.Image;
		public reduce:Laya.Label;
		public btns:Laya.Sprite;
		public blocks:Laya.Sprite;
		public btnSet:Laya.Button;
		public btnChat:Laya.Button;
		public btnInvite:Laya.Button;
		public mic:Laya.CheckBox;
		public speaker:Laya.CheckBox;
		public viewSet:uiview.setView;
		public viewDis:uiview.disView;
		public viewTalk:uiview.talkView;
		public fin:uiview.finView;
		public allfin:uiview.allFinView;
		public record:Laya.Image;
		public exchange:Laya.Sprite;

        public static  uiView:any ={"type":"View","props":{"width":1280,"height":720},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"nonepack/game_bg1.png"}},{"type":"Sprite","props":{"y":0,"x":0,"var":"deskInfo"},"child":[{"type":"Label","props":{"y":19,"x":23,"text":"233223","strokeColor":"#0f5358","name":"pwd","fontSize":22,"color":"#ffffff"}},{"type":"Label","props":{"y":48,"x":24,"text":"0","strokeColor":"#0f5358","stroke":0,"name":"cur","fontSize":22,"color":"#ffffff"}},{"type":"Label","props":{"y":48,"x":24,"text":"option","strokeColor":"#0f5358","stroke":0,"name":"option","fontSize":22,"color":"#ffffff","anchorY":0,"anchorX":0,"align":"center"}}]},{"type":"Image","props":{"y":267,"x":573,"var":"clock","skin":"game/play_dipan.png"},"child":[{"type":"Image","props":{"y":16,"x":98,"visible":false,"skin":"game/play_dong.png"}},{"type":"Image","props":{"y":98,"x":16,"visible":false,"skin":"game/play_bei.png"}},{"type":"Image","props":{"y":16,"x":7,"visible":false,"skin":"game/play_xi.png"}},{"type":"Image","props":{"y":8,"x":16,"visible":false,"skin":"game/play_nan.png"}},{"type":"FontClip","props":{"y":72,"x":72,"width":23,"value":"00","skin":"game/Timer_num.png","sheet":"0123456789","pivotY":19,"pivotX":23,"name":"clip","height":38}}]},{"type":"Sprite","props":{"y":0,"x":0,"var":"players"},"child":[{"type":"Image","props":{"y":244,"x":1187,"skin":"game/HeadImagic.png"},"child":[{"type":"Image","props":{"y":66,"x":-416,"visible":false,"skin":"game/ready.png","name":"ready"}},{"type":"Image","props":{"y":101,"x":-17,"skin":"game/GoldBack.png"}},{"type":"Image","props":{"y":5,"x":5,"width":64,"name":"head","height":64}},{"type":"Image","props":{"y":76,"x":-30,"name":"nick","height":24}},{"type":"Image","props":{"y":-2,"x":-3,"skin":"game/HeadBack.png"}},{"type":"Image","props":{"y":51,"x":49,"visible":false,"skin":"game/ntsign.png","scaleY":0.8,"scaleX":0.8,"name":"nt"}},{"type":"Image","props":{"y":-5,"x":39,"visible":false,"skin":"game/game_offline.png","name":"offline"}},{"type":"Image","props":{"y":-5,"x":38,"visible":false,"skin":"game/isOwner.png","scaleY":0.8,"scaleX":0.8,"name":"bOwner"}},{"type":"Text","props":{"y":112,"x":36,"width":12,"text":"0","pivotY":12,"pivotX":6,"name":"money","height":22,"fontSize":22,"color":"#ffffff","align":"center"}}]},{"type":"Image","props":{"y":438,"x":20,"skin":"game/HeadImagic.png"},"child":[{"type":"Image","props":{"y":72,"x":598,"visible":false,"skin":"game/ready.png","name":"ready"}},{"type":"Image","props":{"y":101,"x":-17,"skin":"game/GoldBack.png"}},{"type":"Image","props":{"y":5,"x":5,"width":64,"name":"head","height":64}},{"type":"Image","props":{"y":76,"x":-30,"name":"nick","height":24}},{"type":"Image","props":{"y":-2,"x":-3,"skin":"game/HeadBack.png"}},{"type":"Image","props":{"y":51,"x":49,"visible":false,"skin":"game/ntsign.png","scaleY":0.8,"scaleX":0.8,"name":"nt"}},{"type":"Image","props":{"y":-5,"x":39,"visible":false,"skin":"game/game_offline.png","name":"offline"}},{"type":"Image","props":{"y":-5,"x":38,"visible":false,"skin":"game/isOwner.png","scaleY":0.8,"scaleX":0.8,"name":"bOwner"}},{"type":"Text","props":{"y":112,"x":36,"width":12,"text":"0","pivotY":12,"pivotX":6,"name":"money","height":22,"fontSize":22,"color":"#ffffff","align":"center"}}]},{"type":"Image","props":{"y":245,"x":21,"skin":"game/HeadImagic.png"},"child":[{"type":"Image","props":{"y":66,"x":434,"visible":false,"skin":"game/ready.png","name":"ready"}},{"type":"Image","props":{"y":101,"x":-17,"skin":"game/GoldBack.png"}},{"type":"Image","props":{"y":5,"x":5,"width":64,"name":"head","height":64}},{"type":"Image","props":{"y":76,"x":-30,"name":"nick","height":24}},{"type":"Image","props":{"y":-2,"x":-3,"skin":"game/HeadBack.png"}},{"type":"Image","props":{"y":51,"x":49,"visible":false,"skin":"game/ntsign.png","scaleY":0.8,"scaleX":0.8,"name":"nt"}},{"type":"Image","props":{"y":-5,"x":39,"visible":false,"skin":"game/game_offline.png","name":"offline"}},{"type":"Image","props":{"y":-5,"x":38,"visible":false,"skin":"game/isOwner.png","scaleY":0.8,"scaleX":0.8,"name":"bOwner"}},{"type":"Text","props":{"y":112,"x":36,"width":12,"text":"0","pivotY":12,"pivotX":6,"name":"money","height":22,"fontSize":22,"color":"#ffffff","align":"center"}}]},{"type":"Image","props":{"y":8,"x":220,"skin":"game/HeadImagic.png"},"child":[{"type":"Image","props":{"y":164,"x":402,"visible":false,"skin":"game/ready.png","name":"ready"}},{"type":"Image","props":{"y":101,"x":-17,"skin":"game/GoldBack.png"}},{"type":"Image","props":{"y":5,"x":5,"width":64,"name":"head","height":64}},{"type":"Image","props":{"y":76,"x":-30,"name":"nick","height":24}},{"type":"Image","props":{"y":-2,"x":-3,"skin":"game/HeadBack.png"}},{"type":"Image","props":{"y":51,"x":49,"visible":false,"skin":"game/ntsign.png","scaleY":0.8,"scaleX":0.8,"name":"nt"}},{"type":"Image","props":{"y":-5,"x":39,"visible":false,"skin":"game/game_offline.png","name":"offline"}},{"type":"Image","props":{"y":-5,"x":38,"visible":false,"skin":"game/isOwner.png","scaleY":0.8,"scaleX":0.8,"name":"bOwner"}},{"type":"Text","props":{"y":112,"x":36,"width":12,"text":"0","pivotY":12,"pivotX":6,"name":"money","height":22,"fontSize":22,"color":"#ffffff","align":"center"}}]}]},{"type":"Sprite","props":{"y":0,"x":0,"name":"hands"},"child":[{"type":"Sprite","props":{"y":120,"x":1120}},{"type":"Sprite","props":{"y":620,"x":66}},{"type":"Sprite","props":{"y":120,"x":140}},{"type":"Sprite","props":{"y":40,"x":954}}]},{"type":"Sprite","props":{"y":10,"x":10,"name":"outs"},"child":[{"type":"Sprite","props":{"y":412,"x":1009}},{"type":"Sprite","props":{"y":516,"x":281}},{"type":"Sprite","props":{"y":211,"x":237}},{"type":"Sprite","props":{"y":108,"x":989}}]},{"type":"Sprite","props":{"y":20,"x":20,"name":"hus"},"child":[{"type":"Sprite","props":{"y":480,"x":1040}},{"type":"Sprite","props":{"y":500,"x":160}},{"type":"Sprite","props":{"y":120,"x":160}},{"type":"Sprite","props":{"y":100,"x":360}}]},{"type":"Image","props":{"y":-40,"x":-40,"var":"tileArrow","skin":"game/arrow.png"}},{"type":"Label","props":{"y":412,"x":587,"var":"reduce","fontSize":28,"color":"#ffffff"}},{"type":"Sprite","props":{"y":480,"x":640,"width":32,"var":"btns","pivotY":16,"pivotX":16,"height":32},"child":[{"type":"Sprite","props":{"y":15,"x":15,"width":32,"visible":false,"pivotY":16,"pivotX":16,"name":"chips","height":32},"child":[{"type":"Button","props":{"y":0,"x":10,"stateNum":1,"skin":"game/btn_wan.png","labelStrokeColor":"#000000","labelStroke":0,"labelSize":24,"labelColors":"white"}},{"type":"Button","props":{"y":0,"x":157,"stateNum":1,"skin":"game/btn_tong.png"}},{"type":"Button","props":{"y":0,"x":304,"stateNum":1,"skin":"game/btn_tiao.png"}}]},{"type":"Sprite","props":{"y":25,"x":25,"width":32,"visible":false,"var":"blocks","pivotY":16,"pivotX":16,"height":32},"child":[{"type":"Button","props":{"y":3,"x":-9,"stateNum":1,"skin":"game/btn_chi.png","labelStrokeColor":"#000000","labelStroke":0,"labelSize":32,"labelColors":"red"}},{"type":"Button","props":{"y":3,"x":90,"stateNum":1,"skin":"game/btn_peng.png","labelStrokeColor":"#000000","labelStroke":0,"labelSize":32,"labelColors":"red"}},{"type":"Button","props":{"y":3,"x":185,"stateNum":1,"skin":"game/btn_gang.png","labelStrokeColor":"#000000","labelStroke":0,"labelSize":32,"labelColors":"red"}},{"type":"Button","props":{"y":3,"x":277,"stateNum":1,"skin":"game/btn_hu.png","labelStrokeColor":"#000000","labelStroke":0,"labelSize":32,"labelColors":"red"}},{"type":"Button","props":{"y":3,"x":413,"stateNum":1,"skin":"game/btn_guo.png","labelStrokeColor":"#000000","labelStroke":0,"labelSize":32,"labelColors":"red"}}]},{"type":"Button","props":{"y":-443,"x":587,"var":"btnSet","stateNum":1,"skin":"game/game_btn_set.png"}},{"type":"Button","props":{"y":-389,"x":588,"var":"btnChat","stateNum":1,"skin":"game/game_btn_chat.png"}},{"type":"Button","props":{"y":-50,"x":-107,"visible":false,"var":"btnInvite","stateNum":1,"skin":"game/btn_invite.png"}},{"type":"CheckBox","props":{"y":-76,"x":577,"var":"mic","skin":"game/checkbox_mic.png","scaleY":1.5,"scaleX":1.5,"labelSize":24,"labelColors":"white"}},{"type":"CheckBox","props":{"y":-5,"x":577,"var":"speaker","skin":"game/checkbox_speaker.png","scaleY":1.5,"scaleX":1.5,"labelSize":24,"labelColors":"white"}}]},{"type":"setView","props":{"y":0,"x":0,"visible":false,"var":"viewSet","runtime":"uiview.setView"}},{"type":"disView","props":{"visible":false,"var":"viewDis","runtime":"uiview.disView"}},{"type":"talkView","props":{"y":0,"x":0,"visible":false,"var":"viewTalk","runtime":"uiview.talkView"}},{"type":"finView","props":{"visible":false,"var":"fin","runtime":"uiview.finView"}},{"type":"allFinView","props":{"visible":false,"var":"allfin","runtime":"uiview.allFinView"}},{"type":"Image","props":{"y":307,"x":405,"visible":false,"var":"record","skin":"game/record_btn_bg.png"},"child":[{"type":"Image","props":{"y":24,"x":46,"skin":"game/record_btn_pause.png","name":"play"}},{"type":"Image","props":{"y":32,"x":270,"skin":"game/record_btn_speedup.png","name":"speed"}},{"type":"Image","props":{"y":27,"x":376,"skin":"game/record_btn_return.png","name":"return"}},{"type":"Label","props":{"y":36,"x":163,"text":"x1","name":"label","fontSize":32,"color":"#ffffff"}}]},{"type":"Sprite","props":{"y":131,"x":1166,"var":"exchange"},"child":[{"type":"TextInput","props":{"y":0,"x":0,"width":110,"text":"测试来牌","overflow":"visible","height":22,"fontSize":24,"color":"#ffffff"}},{"type":"Button","props":{"y":31,"x":27,"width":40,"stateNum":1,"skin":"game/btn1.png","labelColors":"white","label":"确定","height":24}}]}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);
			View.regComponent("uiview.setView",uiview.setView);
			View.regComponent("uiview.disView",uiview.disView);
			View.regComponent("uiview.talkView",uiview.talkView);
			View.regComponent("uiview.finView",uiview.finView);
			View.regComponent("uiview.allFinView",uiview.allFinView);

            super.createChildren();
            this.createView(ui.gameViewUI.uiView);

        }

    }
}

module ui {
    export class groupViewUI extends View {
		public btnMyDesk:Laya.Button;
		public btnMyGrp:Laya.Button;
		public btnJoin:Laya.Button;
		public bg_view_:Laya.Image;
		public list_group_:Laya.List;
		public list_desk_:Laya.List;
		public list_member_:Laya.List;
		public ui_join_group_:uiview.home.JoinGroupView;

        public static  uiView:any ={"type":"View","props":{"width":1280,"height":720},"child":[{"type":"Button","props":{"y":173,"x":46,"var":"btnMyDesk","stateNum":1,"skin":"home/my_desk.png"}},{"type":"Button","props":{"y":313,"x":13,"var":"btnMyGrp","stateNum":1,"skin":"home/my_group.png"}},{"type":"Button","props":{"y":449,"x":-9,"var":"btnJoin","stateNum":1,"skin":"home/join_group.png"}},{"type":"Image","props":{"y":18,"x":78,"visible":false,"var":"bg_view_","skin":"nonepack/frame_bg.png","sizeGrid":"101,80,66,85"},"child":[{"type":"Button","props":{"y":-6,"x":1044,"stateNum":1,"skin":"home/btn_close.png","name":"close"}},{"type":"List","props":{"y":110,"x":60,"width":995,"var":"list_group_","spaceY":4,"height":484},"child":[{"type":"Label","props":{"y":-50,"x":518,"text":"倍率","name":"rate","fontSize":32,"color":"#ffffff"}},{"type":"Label","props":{"y":-50,"x":298,"text":"群名","name":"name","fontSize":32,"color":"#ffffff"}},{"type":"Label","props":{"y":-50,"x":29,"text":"群id","name":"id","fontSize":32,"color":"#ffffff"}},{"type":"Box","props":{"y":10,"x":4,"renderType":"render","height":120},"child":[{"type":"Image","props":{"width":1000,"skin":"home/item_bg.png","sizeGrid":"32,32,32,32"}},{"type":"Button","props":{"y":24,"x":787,"stateNum":1,"skin":"home/btnCreate.png","name":"btn_create_desk"}},{"type":"Button","props":{"y":24,"x":602,"stateNum":1,"skin":"home/btnQuitG.png","name":"btn_exit_group"}},{"type":"Label","props":{"y":78,"x":76,"text":"我的信誉","name":"my","fontSize":26,"color":"#ffffff"}},{"type":"Label","props":{"y":78,"x":219,"text":"准入","name":"least","fontSize":26,"color":"#ffffff"}},{"type":"Label","props":{"y":12,"x":23,"text":"群id","name":"id","fontSize":30,"color":"#ffffff"}},{"type":"Label","props":{"y":13,"x":130,"width":344,"text":"群名","name":"name","height":30,"fontSize":30,"color":"#ffffff","align":"center"}},{"type":"Label","props":{"y":12,"x":512,"text":"倍率","name":"rate","fontSize":30,"color":"#ffffff"}},{"type":"Label","props":{"y":38,"x":730,"text":"审核中","name":"status","fontSize":32,"color":"#ffffff"}},{"type":"Label","props":{"y":70,"x":354,"width":211,"text":"查看群成员","name":"btn_view_member","mouseEnabled":true,"height":41,"fontSize":32,"color":"#490807","bold":true,"align":"center"}},{"type":"Label","props":{"y":78,"x":200,"width":38,"text":"/","height":24,"fontSize":24,"color":"#ffffff"}},{"type":"Label","props":{"y":78,"x":7,"text":"信誉:","fontSize":30,"color":"#ffffff"}}]}]},{"type":"List","props":{"y":110,"x":60,"width":1000,"var":"list_desk_","spaceY":8,"repeatY":4,"repeatX":1,"height":500},"child":[{"type":"Box","props":{"y":0,"x":0,"renderType":"render"},"child":[{"type":"Image","props":{"width":1000,"skin":"home/item_bg.png","sizeGrid":"6,6,6,6"}},{"type":"Button","props":{"y":22,"x":787,"stateNum":1,"skin":"home/group_btnJoin.png","name":"btn_join"}},{"type":"Label","props":{"y":2,"x":20,"text":"rule","name":"rule","fontSize":30,"color":"#ffffff","align":"left"}}]}]},{"type":"List","props":{"y":110,"x":60,"width":1000,"var":"list_member_","spaceY":8,"repeatY":4,"repeatX":1,"height":500},"child":[{"type":"Label","props":{"y":-59,"x":589,"text":"信誉值","fontSize":32,"color":"#ffffff","align":"left"}},{"type":"Label","props":{"y":-59,"x":325,"text":"昵称","fontSize":32,"color":"#ffffff","align":"left"}},{"type":"Label","props":{"y":-59,"x":62,"text":"用户id","fontSize":32,"color":"#ffffff","align":"left"}},{"type":"Box","props":{"y":0,"x":0,"renderType":"render"},"child":[{"type":"Image","props":{"width":1000,"skin":"home/item_bg.png","sizeGrid":"32,32,32,32"}},{"type":"Label","props":{"y":33,"x":60,"text":"user_id","name":"user_id","fontSize":32,"color":"#ffffff","align":"left"}},{"type":"Label","props":{"y":33,"x":323,"text":"nick_name","name":"nick_name","fontSize":32,"color":"#ffffff","align":"left"}},{"type":"Label","props":{"y":33,"x":587,"text":"user_credit","name":"user_credit","fontSize":32,"color":"#ffffff","align":"left"}},{"type":"Image","props":{"y":18,"x":850,"width":66,"name":"head_pic","height":66}}]},{"type":"Label","props":{"y":-55,"x":845,"text":"头像","fontSize":32,"color":"#ffffff","align":"left"}}]}]},{"type":"JoinGroupView","props":{"var":"ui_join_group_","runtime":"uiview.home.JoinGroupView"}}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("uiview.home.JoinGroupView",uiview.home.JoinGroupView);

            super.createChildren();
            this.createView(ui.groupViewUI.uiView);

        }

    }
}

module ui {
    export class homeViewUI extends View {
		public btnRecord:Laya.Button;
		public btnAct:Laya.Button;
		public btnRule:Laya.Button;
		public btnShare:Laya.Button;
		public btnSet:Laya.Button;
		public broad:Laya.Label;
		public btnCreate:Laya.Button;
		public btnJoin:Laya.Button;
		public infoRoot:Laya.Image;
		public viewgroup:uiview.home.groupView;
		public viewCreate:uiview.home.createView;
		public viewInput:uiview.home.inputView;
		public viewRank:uiview.home.rankView;
		public viewShare:uiview.home.shareView;
		public viewActivity:uiview.home.ActivityView;
		public viewRule:ui.GameIntroUI;
		public viewSet:uiview.home.EnvSetView;

        public static  uiView:any ={"type":"View","props":{"width":1280,"height":720},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"nonepack/main_BJ.png"}},{"type":"Image","props":{"y":86,"x":388,"skin":"nonepack/avatar.png"}},{"type":"Image","props":{"y":15,"x":510,"skin":"home/logo.png","name":"logo"}},{"type":"Image","props":{"y":624,"x":0,"width":1280,"skin":"nonepack/bottom.png","scaleX":1,"name":"menu","height":96},"child":[{"type":"Button","props":{"y":-17,"x":180,"var":"btnRecord","stateNum":1,"skin":"home/hall_vedio.png"}},{"type":"Button","props":{"y":-20,"x":391,"var":"btnAct","stateNum":1,"skin":"home/hall_notice.png"}},{"type":"Button","props":{"y":-20,"x":800,"var":"btnRule","stateNum":1,"skin":"home/hall_rule.png"}},{"type":"Button","props":{"y":-20,"x":591,"var":"btnShare","stateNum":1,"skin":"home/hall_share.png"}},{"type":"Button","props":{"y":-20,"x":1000,"var":"btnSet","stateNum":1,"skin":"home/hall_setting.png"}}]},{"type":"Image","props":{"y":135,"x":419,"width":500,"skin":"home/lable_bg.png","sizeGrid":"16,30,16,0","name":"broadcast"},"child":[{"type":"Image","props":{"y":-7,"x":-21,"skin":"home/brodcast.png"}},{"type":"Panel","props":{"y":8,"x":29,"width":460,"height":28},"child":[{"type":"Label","props":{"y":0,"x":0,"var":"broad","text":"欢迎来到雪域西藏麻将","fontSize":28,"color":"#ffffff"}}]}]},{"type":"Button","props":{"y":224,"x":834,"var":"btnCreate","stateNum":1,"skin":"home/main_btn_create.png"}},{"type":"Button","props":{"y":399,"x":834,"var":"btnJoin","stateNum":1,"skin":"home/main_btn_join.png"}},{"type":"Image","props":{"y":0,"x":0,"skin":"nonepack/top.png","height":156}},{"type":"Image","props":{"y":18,"x":72,"var":"infoRoot","skin":"home/main_headbox.png"},"child":[{"type":"Image","props":{"y":5,"x":93,"width":300,"skin":"home/lable_bg.png","sizeGrid":"15,33,13,0"}},{"type":"Image","props":{"y":14,"x":842,"width":320,"skin":"home/hall_crad.png","height":60}},{"type":"Image","props":{"y":48,"x":94,"skin":"home/lable_bg.png","sizeGrid":"15,33,13,0"}},{"type":"Image","props":{"y":11,"x":11,"width":72,"name":"head","height":72}},{"type":"Image","props":{"y":15,"x":99,"name":"nick","height":24}},{"type":"Label","props":{"y":59,"x":102,"text":"label","name":"uid","fontSize":24,"color":"#ffffff"}},{"type":"Label","props":{"y":31,"x":964,"text":"label","name":"gold","fontSize":30,"color":"#ffffff"}}]},{"type":"groupView","props":{"y":0,"x":0,"var":"viewgroup","runtime":"uiview.home.groupView","mouseThrough":true}},{"type":"createView","props":{"y":45,"x":97,"visible":false,"var":"viewCreate","runtime":"uiview.home.createView"}},{"type":"inputView","props":{"y":0,"x":0,"visible":false,"var":"viewInput","runtime":"uiview.home.inputView"}},{"type":"rankView","props":{"visible":false,"var":"viewRank","runtime":"uiview.home.rankView"}},{"type":"viewShare","props":{"visible":false,"var":"viewShare","runtime":"uiview.home.shareView"}},{"type":"ActivityView","props":{"y":0,"x":0,"visible":false,"var":"viewActivity","runtime":"uiview.home.ActivityView"}},{"type":"GameIntro","props":{"visible":false,"var":"viewRule","runtime":"ui.GameIntroUI"}},{"type":"EnvSetView","props":{"visible":false,"var":"viewSet","runtime":"uiview.home.EnvSetView"}}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("uiview.home.groupView",uiview.home.groupView);
			View.regComponent("uiview.home.createView",uiview.home.createView);
			View.regComponent("uiview.home.inputView",uiview.home.inputView);
			View.regComponent("uiview.home.rankView",uiview.home.rankView);
			View.regComponent("uiview.home.shareView",uiview.home.shareView);
			View.regComponent("uiview.home.ActivityView",uiview.home.ActivityView);
			View.regComponent("ui.GameIntroUI",ui.GameIntroUI);
			View.regComponent("uiview.home.EnvSetView",uiview.home.EnvSetView);

            super.createChildren();
            this.createView(ui.homeViewUI.uiView);

        }

    }
}

module ui {
    export class inputViewUI extends View {
		public btn_close:Laya.Button;
		public clip_desk_pwd_:Laya.FontClip;

        public static  uiView:any ={"type":"View","props":{"width":1280,"height":720},"child":[{"type":"Image","props":{"y":-146,"x":-78,"width":1436,"skin":"nonepack/frame_bg.png","name":"aaa","height":937,"alpha":0.1}},{"type":"Image","props":{"y":39,"x":199,"width":880,"skin":"nonepack/frame_bg.png","sizeGrid":"101,80,66,85","height":620}},{"type":"Button","props":{"y":511,"x":539,"stateNum":1,"skin":"home/btn_blue.png","name":"no_0","labelSize":24,"labelColors":"white","label":"0"}},{"type":"Button","props":{"y":253,"x":326,"stateNum":1,"skin":"home/btn_blue.png","name":"no_1","labelSize":24,"labelColors":"white","label":"1"}},{"type":"Button","props":{"y":253,"x":539,"stateNum":1,"skin":"home/btn_blue.png","name":"no_2","labelSize":24,"labelColors":"white","label":"2"}},{"type":"Button","props":{"y":253,"x":752,"stateNum":1,"skin":"home/btn_blue.png","name":"no_3","labelSize":24,"labelColors":"white","label":"3"}},{"type":"Button","props":{"y":339,"x":326,"stateNum":1,"skin":"home/btn_blue.png","name":"no_4","labelSize":24,"labelColors":"white","label":"4"}},{"type":"Button","props":{"y":339,"x":539,"stateNum":1,"skin":"home/btn_blue.png","name":"no_5","labelSize":24,"labelColors":"white","label":"5"}},{"type":"Button","props":{"y":339,"x":752,"stateNum":1,"skin":"home/btn_blue.png","name":"no_6","labelSize":24,"labelColors":"white","label":"6"}},{"type":"Button","props":{"y":425,"x":326,"stateNum":1,"skin":"home/btn_blue.png","name":"no_7","labelSize":24,"labelColors":"white","label":"7"}},{"type":"Button","props":{"y":425,"x":539,"stateNum":1,"skin":"home/btn_blue.png","name":"no_8","labelSize":24,"labelColors":"white","label":"8"}},{"type":"Button","props":{"y":425,"x":752,"stateNum":1,"skin":"home/btn_blue.png","name":"no_9","labelSize":24,"labelColors":"white","label":"9"}},{"type":"Button","props":{"y":511,"x":326,"stateNum":1,"skin":"home/btn_blue.png","name":"delete","labelSize":24,"labelColors":"white","label":"删除"}},{"type":"Button","props":{"y":511,"x":752,"stateNum":1,"skin":"home/btn_blue.png","name":"reset","labelSize":24,"labelColors":"white","label":"重输"}},{"type":"Button","props":{"y":35,"x":1011,"var":"btn_close","stateNum":1,"skin":"home/btn_close.png"}},{"type":"FontClip","props":{"y":160,"x":345,"var":"clip_desk_pwd_","spaceX":10,"skin":"home/clip_num.png","sheet":"0123456789","scaleY":3,"scaleX":3}},{"type":"Image","props":{"y":67,"x":522,"skin":"home/title_join_room.png"}},{"type":"Image","props":{"y":239,"x":337,"width":66,"skin":"home/img_slash.png"},"child":[{"type":"Image","props":{"y":0,"x":115,"width":66,"skin":"home/img_slash.png"}},{"type":"Image","props":{"y":0,"x":216,"width":66,"skin":"home/img_slash.png"}},{"type":"Image","props":{"y":0,"x":315,"width":66,"skin":"home/img_slash.png"}},{"type":"Image","props":{"y":0,"x":417,"width":66,"skin":"home/img_slash.png"}},{"type":"Image","props":{"y":0,"x":520,"width":66,"skin":"home/img_slash.png"}}]}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.inputViewUI.uiView);

        }

    }
}

module ui {
    export class JoinGroupViewUI extends View {
		public edit_group_id_:Laya.TextInput;
		public btn_cancel_:Laya.Button;
		public btn_confirm_:Laya.Button;

        public static  uiView:any ={"type":"View","props":{"width":1280,"height":720},"child":[{"type":"Image","props":{"y":-147,"x":-149,"width":1564,"skin":"nonepack/frame_bg.png","name":"aaa","height":954,"alpha":0.1}},{"type":"Image","props":{"y":47,"x":292,"width":696,"skin":"nonepack/frame_bg.png","sizeGrid":"101,80,53,85","height":415},"child":[{"type":"TextInput","props":{"y":168,"x":139,"width":415,"var":"edit_group_id_","type":"number","skin":"home/textedit.png","sizeGrid":"11,17,13,13","prompt":"请输入群号...","height":55,"fontSize":30,"font":"Microsoft YaHei","bgColor":"#f8f1f1"}},{"type":"Button","props":{"y":267,"x":96,"var":"btn_cancel_","stateNum":1,"skin":"home/cancel.png","labelSize":30}},{"type":"Button","props":{"y":267,"x":347,"var":"btn_confirm_","stateNum":1,"skin":"home/confirm.png","labelSize":30}},{"type":"Image","props":{"y":31,"x":239,"skin":"home/title_join_group.png"}}]}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.JoinGroupViewUI.uiView);

        }

    }
}

module ui {
    export class loginViewUI extends View {
		public btnLogin:Laya.Button;
		public input:Laya.TextInput;
		public updateRoot:Laya.Image;
		public btnUpdate:Laya.Button;

        public static  uiView:any ={"type":"View","props":{"width":1280,"height":720},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"nonepack/login_bg.png"}},{"type":"Image","props":{"y":166,"x":183,"skin":"nonepack/logo.png"}},{"type":"Button","props":{"y":533,"x":564,"var":"btnLogin","stateNum":1,"skin":"login/btn_login.png","pivotY":30,"pivotX":100}},{"type":"TextInput","props":{"y":516,"x":42,"width":381,"var":"input","text":"TextInput","skin":"login/textedit.png","height":69,"fontSize":32}},{"type":"CheckBox","props":{"y":26,"x":29,"skin":"login/check_lang.png","selected":true}},{"type":"Image","props":{"y":361,"x":883,"width":400,"skin":"login/bull.png","height":400}},{"type":"Image","props":{"y":225,"x":340,"width":600,"var":"updateRoot","skin":"pop/scale_bg.png","sizeGrid":"32,32,32,32","mouseEnabled":true,"height":400},"child":[{"type":"Button","props":{"y":296,"x":193,"var":"btnUpdate","stateNum":1,"skin":"pop/btn_right.png","labelSize":28,"labelColors":"white","label":"前往更新"}},{"type":"Label","props":{"y":88,"x":95,"text":"label","name":"label","fontSize":24,"color":"#251b02"}},{"type":"Label","props":{"y":298,"x":426,"text":"label","name":"local","fontSize":24,"color":"#251b02"}},{"type":"Label","props":{"y":341,"x":426,"text":"label","name":"server","fontSize":24,"color":"#251b02"}}]}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.loginViewUI.uiView);

        }

    }
}

module ui {
    export class MsgBoxUI extends View {
		public img_bg_:Laya.Image;
		public txt_tips_:Laya.Label;

        public static  uiView:any ={"type":"View","props":{"width":1280,"height":720},"child":[{"type":"Image","props":{"y":264,"x":329,"width":570,"var":"img_bg_","skin":"home/scale_bg.png","sizeGrid":"38,36,51,34","height":104},"child":[{"type":"Label","props":{"y":28,"x":48,"width":474,"var":"txt_tips_","text":"tips","height":49,"fontSize":32,"align":"center"}}]}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.MsgBoxUI.uiView);

        }

    }
}

module ui {
    export class popViewUI extends View {
		public right:Laya.Button;
		public left:Laya.Button;
		public label:Laya.Label;

        public static  uiView:any ={"type":"View","props":{"width":1280,"height":720},"child":[{"type":"Image","props":{"y":360,"x":640,"width":640,"skin":"pop/scale_bg.png","sizeGrid":"32,32,32,32","pivotY":180,"pivotX":320,"height":360}},{"type":"Button","props":{"y":472,"x":789,"var":"right","stateNum":1,"skin":"pop/btn_right.png","scaleY":0.8,"scaleX":0.8,"pivotY":36,"pivotX":106,"labelSize":26,"labelColors":"white,white,white,white","label":"label"}},{"type":"Button","props":{"y":473,"x":492,"width":211,"var":"left","stateNum":1,"skin":"pop/btn_left.png","scaleY":0.8,"scaleX":0.8,"pivotY":36,"pivotX":106,"labelSize":26,"labelColors":"white,white,white,white","label":"label","height":71}},{"type":"Label","props":{"y":275,"x":438,"var":"label","text":"label","fontSize":24,"color":"#1c0303"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.popViewUI.uiView);

        }

    }
}

module ui {
    export class rankViewUI extends View {
		public listAll:Laya.List;
		public listRound:Laya.List;
		public titleAll:Laya.Image;
		public titleRound:Laya.Image;

        public static  uiView:any ={"type":"View","props":{"width":1280,"height":720},"child":[{"type":"Image","props":{"y":17,"x":84,"skin":"nonepack/frame_bg.png"}},{"type":"List","props":{"y":140,"x":150,"var":"listAll","spaceY":4,"height":500},"child":[{"type":"Box","props":{"width":980,"renderType":"render","height":112},"child":[{"type":"Image","props":{"width":980,"skin":"home/item_bg.png","height":112}},{"type":"Label","props":{"y":43,"x":53,"text":"0","name":"no","fontSize":32,"color":"#ffffff"}},{"type":"Label","props":{"y":43,"x":155,"text":"0","name":"pwd","fontSize":32,"color":"#ffffff"}},{"type":"Label","props":{"y":21,"x":284,"text":"0","overflow":"visible","name":"p0","fontSize":32,"color":"#ffffff"}},{"type":"Label","props":{"y":21,"x":421,"text":"0","overflow":"visible","name":"p1","fontSize":32,"color":"#ffffff"}},{"type":"Label","props":{"y":21,"x":559,"text":"0","overflow":"visible","name":"p2","fontSize":32,"color":"#ffffff"}},{"type":"Label","props":{"y":21,"x":696,"text":"0","overflow":"visible","name":"p3","fontSize":32,"color":"#ffffff"}},{"type":"Label","props":{"y":21,"x":817,"wordWrap":true,"width":163,"text":"0","name":"time","height":71,"fontSize":24,"color":"#ffffff"}}]}]},{"type":"List","props":{"y":140,"x":150,"var":"listRound","spaceY":4,"height":500},"child":[{"type":"Box","props":{"width":980,"renderType":"render","height":112},"child":[{"type":"Image","props":{"width":980,"skin":"home/item_bg.png","sizeGrid":"32,32,32,32","height":112}},{"type":"Label","props":{"y":43,"x":53,"text":"0","name":"no","fontSize":32,"color":"#ffffff"}},{"type":"Label","props":{"y":43,"x":305,"text":"0","name":"p0","fontSize":32,"color":"#ffffff"}},{"type":"Label","props":{"y":43,"x":442,"text":"0","name":"p1","fontSize":32,"color":"#ffffff"}},{"type":"Label","props":{"y":43,"x":580,"text":"0","name":"p2","fontSize":32,"color":"#ffffff"}},{"type":"Label","props":{"y":43,"x":717,"text":"0","name":"p3","fontSize":32,"color":"#ffffff"}}]}]},{"type":"Button","props":{"y":8,"x":1124,"stateNum":1,"skin":"home/btn_close.png","name":"close"}},{"type":"Image","props":{"y":70,"x":186,"var":"titleAll","skin":"home/xhao.png"},"child":[{"type":"Image","props":{"y":-2,"x":101,"skin":"home/fjh.png"}},{"type":"Image","props":{"y":-2,"x":247,"skin":"home/wj.png"}},{"type":"Image","props":{"y":-2,"x":392,"skin":"home/wj.png"}},{"type":"Image","props":{"y":-2,"x":524,"skin":"home/wj.png"}},{"type":"Image","props":{"y":-2,"x":664,"skin":"home/wj.png"}},{"type":"Image","props":{"y":-2,"x":822,"skin":"home/rq.png"}}]},{"type":"Image","props":{"y":70,"x":186,"var":"titleRound","skin":"home/xhao.png"},"child":[{"type":"Image","props":{"y":-2,"x":247,"skin":"home/wj.png"}},{"type":"Image","props":{"y":-2,"x":392,"skin":"home/wj.png"}},{"type":"Image","props":{"y":-2,"x":524,"skin":"home/wj.png"}},{"type":"Image","props":{"y":-2,"x":664,"skin":"home/wj.png"}},{"type":"Button","props":{"y":541,"x":427,"stateNum":1,"skin":"home/btn_close.png"}}]}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.rankViewUI.uiView);

        }

    }
}

module ui {
    export class rollViewUI extends View {
		public roll:Laya.Image;

        public static  uiView:any ={"type":"View","props":{"width":1280,"height":720},"child":[{"type":"Image","props":{"y":0,"x":0,"width":1280,"skin":"game/mask.png","mouseEnabled":true,"height":720}},{"type":"Image","props":{"y":360,"x":640,"width":49,"var":"roll","skin":"game/delay_loading.png","pivotY":25,"pivotX":25,"height":49}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.rollViewUI.uiView);

        }

    }
}

module ui {
    export class setViewUI extends View {
		public btnReqDis:Laya.Button;
		public music:Laya.HSlider;
		public effect:Laya.HSlider;

        public static  uiView:any ={"type":"View","props":{"width":1280,"height":720},"child":[{"type":"Image","props":{"y":-183,"x":-163,"width":1686,"skin":"nonepack/frame_bg.png","mouseEnabled":true,"height":1036,"alpha":0.1}},{"type":"Image","props":{"y":180,"x":340,"width":600,"skin":"nonepack/frame_bg.png","sizeGrid":"64,64,64,64","height":360}},{"type":"Image","props":{"y":199,"x":551,"skin":"game/title_set.png"}},{"type":"Button","props":{"y":410,"x":509,"var":"btnReqDis","stateNum":1,"skin":"game/btn_req_dis.png","labelSize":24,"labelColors":"white"}},{"type":"Button","props":{"y":178,"x":864,"stateNum":1,"skin":"game/btn_close.png","name":"close"}},{"type":"HSlider","props":{"y":282,"x":479,"var":"music","value":50,"skin":"game/hslider.png"}},{"type":"HSlider","props":{"y":353,"x":479,"var":"effect","value":50,"skin":"game/hslider.png"}},{"type":"Image","props":{"y":290,"x":391,"skin":"game/setting_music.png"}},{"type":"Image","props":{"y":361,"x":391,"skin":"game/setting_effect.png"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.setViewUI.uiView);

        }

    }
}

module ui {
    export class talkViewUI extends View {
		public tab:Laya.Tab;
		public view:Laya.ViewStack;
		public btnSend:Laya.Button;
		public input:Laya.TextInput;

        public static  uiView:any ={"type":"View","props":{"width":1280,"height":720},"child":[{"type":"Image","props":{"y":0,"x":0,"width":1280,"skin":"game/talk_item_sound_bg.png","sizeGrid":"42,42,42,42","height":720,"alpha":0.1}},{"type":"Image","props":{"y":80,"x":304,"width":640,"skin":"game/talk_bg.png","sizeGrid":"58,58,58,58","mouseEnabled":true,"height":530}},{"type":"Tab","props":{"y":93,"x":316,"var":"tab","skin":"game/chat_btn_select.png","selectedIndex":0,"labels":"常用语,表情","labelSize":24,"labelColors":"yellow,yellow,yellow,yellow"}},{"type":"ViewStack","props":{"y":160,"x":326,"var":"view","selectedIndex":0},"child":[{"type":"List","props":{"width":598,"spaceY":4,"repeatX":1,"name":"item0","height":350},"child":[{"type":"Box","props":{"y":0,"x":0,"renderType":"render"},"child":[{"type":"Image","props":{"y":0,"x":0,"width":598,"skin":"game/talk_item_sound_bg.png","sizeGrid":"32,32,32,32","height":62}},{"type":"Label","props":{"y":14,"x":11,"text":"label","name":"label","fontSize":28,"color":"#3e2505"}}]}]},{"type":"Panel","props":{"width":598,"name":"item1","height":350},"child":[{"type":"Image","props":{"width":598,"skin":"game/talk_item_sound_bg.png","sizeGrid":"16,16,16,16","height":400}}]}]},{"type":"Button","props":{"y":521,"x":765,"var":"btnSend","stateNum":1,"skin":"game/talk_btn_send.png"}},{"type":"TextInput","props":{"y":525,"x":324,"width":440,"var":"input","skin":"game/talk_edit_bg.png","sizeGrid":"0,10,0,10","promptColor":"#dedede","prompt":"说点什么吧","height":60,"fontSize":32,"color":"#ffffff","align":"left"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.talkViewUI.uiView);

        }

    }
}

module ui {
    export class userInfoViewUI extends View {

        public static  uiView:any ={"type":"View","props":{"width":1280,"height":720},"child":[{"type":"Image","props":{"y":0,"x":0,"width":1280,"skin":"game/mask.png","height":720}},{"type":"Image","props":{"y":178,"x":340,"width":600,"skin":"game/public_frame_a.png","sizeGrid":"64,64,64,64","height":200}},{"type":"Image","props":{"y":213,"x":418,"width":64,"skin":"game/HeadImagic.png","name":"head","height":64}},{"type":"Image","props":{"y":206,"x":410,"skin":"game/HeadBack.png"}},{"type":"Image","props":{"y":204,"x":522,"name":"nick"}},{"type":"Label","props":{"y":303,"x":420,"text":"label","name":"addr","fontSize":28,"color":"#ffffff"}},{"type":"Label","props":{"y":256,"x":523,"text":"label","name":"uid","fontSize":28,"color":"#ffffff"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.userInfoViewUI.uiView);

        }

    }
}

module ui {
    export class viewShareUI extends View {
		public btnFriend:Laya.Image;
		public btnZone:Laya.Image;

        public static  uiView:any ={"type":"View","props":{"width":1280,"height":720},"child":[{"type":"Image","props":{"y":-138,"x":-59,"width":1417,"skin":"nonepack/frame_bg.png","sizeGrid":"32,32,32,32","height":962,"alpha":0.1}},{"type":"Image","props":{"y":189,"x":320,"width":640,"skin":"nonepack/frame_bg.png","sizeGrid":"95,114,114,114","mouseEnabled":true,"height":360}},{"type":"Image","props":{"y":217,"x":551,"skin":"home/title_share.png"}},{"type":"Image","props":{"y":296,"x":463,"var":"btnFriend","skin":"home/share_friend.png"}},{"type":"Image","props":{"y":296,"x":737,"var":"btnZone","skin":"home/share_zone.png"}},{"type":"Image","props":{"y":449,"x":742,"skin":"home/share_txt_zone.png"}},{"type":"Image","props":{"y":449,"x":461,"skin":"home/share_txt_friend.png"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.viewShareUI.uiView);

        }

    }
}
