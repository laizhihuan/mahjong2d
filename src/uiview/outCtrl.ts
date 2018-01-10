module uiview {
    export class outCtrl extends Laya.Sprite {
        view = 0;
        col = 7;
        constructor(view) {
            super();
            this.view = view;
            if (this.view % 2 == 1) {
                this.col = 16;
            }
        }

        addCards(data) {
            for (let i = 0; i < data.length; ++i) {
                this.addCard(data[i]);
            }
        }

        addCard(val) {
            var sp: Laya.Image;
            var row = Math.floor(this.numChildren / this.col);
            var col = this.numChildren % this.col;
            switch (this.view) {
                case 0:
                    sp = new mjH(val);
                    sp.pos(-row * sp.width, -col * (sp.height - 12));
                    sp.getChildAt(0).rotation = -90;
                    this.addChild(sp);
                    this.setChildIndex(sp, 0);
                    break;
                case 1:
                    sp = new mjV(val);
                    sp.pos(col * sp.width, -row * (sp.height - 12));
                    this.addChild(sp);
                    this.setChildIndex(sp, 0);
                    break;
                case 2:
                    sp = new mjH(val);
                    sp.pos(row * sp.width, col * (sp.height - 12));
                    this.addChild(sp);
                    break;
                case 3:
                    sp = new mjV(val);
                    sp.pos(-col * sp.width, row * (sp.height - 12));
                    this.addChild(sp);
                    break;
            }

        }

        getLast() {
            if (this.view <= 1)
                return this.getChildAt(0);
            else
                return this.getChildAt(this.numChildren - 1);
        }


        removeLast() {
            if (this.view == 0 || this.view == 1) {
                this.removeChildAt(0);
            } else {
                this.removeChildAt(this.numChildren - 1);
            }
        }

        removeAll() {
            this.removeChildren(0, this.numChildren);
        }
    }
}