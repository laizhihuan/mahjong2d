module uiview.home {
    export class MsgBoxView extends ui.MsgBoxUI {
        public original_y_;
        static create(tips:string,parent_node:View)
        {
            var msg_box = new MsgBoxView();
            parent_node.addChild(msg_box);
            msg_box.Show(tips);
        }
        constructor(func = 0) {
            super();
            this.visible = false;

            this.original_y_ = this.img_bg_.y;
        }

        Show(txt_tips:string){        
           this.img_bg_.y = this.original_y_;

            this.zOrder = 1000;
            this.txt_tips_.text = txt_tips;
            this.visible = true;
             //this.img_bg_;
            Laya.Tween.to(this.img_bg_,{y:this.img_bg_.y-250},2500,Laya.Ease.bounceOut,Laya.Handler.create(this,this.AutoHide));        
        }

        AutoHide(){
            this.img_bg_.y = this.original_y_;
            this.visible = false;
            this.removeSelf();
        }
    }
}