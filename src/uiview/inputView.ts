module uiview.home {
    export class inputView extends ui.inputViewUI {
        public str_desk_pwd_:string = "";
        constructor(func = 0) {
            super();
        
            for (let i = 0; i < this._childs.length; ++i) {
                var temp_name = this.getChildAt(i).name;
                this.getChildAt(i).on(Laya.Event.CLICK,this,this.HandleFunc,[{name:temp_name}]);
            }

            this.btn_close.on(Laya.Event.CLICK, this, () => {
                this.str_desk_pwd_ = "";
                this.clip_desk_pwd_.value = " ";
                this.visible = false;
            });
        }

        HandleFunc(param_arr){
            var temp_name = param_arr.name;
            if(temp_name== "reset")
            {
                this.str_desk_pwd_ = "";
                this.clip_desk_pwd_.value = " ";
                return;
            }

            if(temp_name == "delete")
            {
                this.str_desk_pwd_ = this.str_desk_pwd_.substr(0, this.str_desk_pwd_.length - 1);
                if(this.str_desk_pwd_ == "")
                {
                    this.clip_desk_pwd_.value = " "; 
                }
                else
                {
                    this.clip_desk_pwd_.value = this.str_desk_pwd_;
                }
               
                return;
            }

            if(temp_name.substr(0,2) == "no")
            {
                var len = this.str_desk_pwd_.length;
                if (len >= 6) {
                    return;
                }

                var input_num = temp_name.substr(3,4);
                this.str_desk_pwd_ += input_num;
                this.clip_desk_pwd_.value = this.str_desk_pwd_;
                if (this.str_desk_pwd_.length == 6) {
                    homeView.instance.joinDesk(this.str_desk_pwd_);
                }
                return;
            }
        }
    }
}