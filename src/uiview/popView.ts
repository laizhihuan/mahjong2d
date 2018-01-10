module uiview {
    export class popView extends ui.popViewUI {
        constructor(label: string, text1: string, fn1: Function = null, text2 = "", fn2: Function = null) {
            super();
            this.label.text = label;
            this.label.pivot(this.label.width * 0.5, this.label.height * 0.5);
            this.label.x = this.width * 0.5;
            this.right.label = text1;
            this.left.label = text2;
            this.right.on(Laya.Event.CLICK, this, () => {
                if (fn1 != null) {
                    fn1();
                }
                this.removeSelf();
            });
            this.left.on(Laya.Event.CLICK, this, () => {
                if (fn2 != null) {
                    fn2();
                }
                this.removeSelf();
            });
            if (text2 == "") {
                this.right.x = this.width * 0.5;
                this.left.visible = false;
            }
            this.mouseThrough = true;
        }
    }
}