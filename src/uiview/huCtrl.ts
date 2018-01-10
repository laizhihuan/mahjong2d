module uiview {
    export class huCtrl extends Laya.Sprite {
        view = 0;
        col = 2;
        constructor(view) {
            super();
            this.view = view;
        }

        addCards(data) {
            for (let i = 0; i < data.length; ++i) {
                this.addCard(data[i]);
            }
        }

        addCard(val) {
            var sp: Laya.Image;
            var c = this.numChildren % (this.col * this.col);
            var row = Math.floor(c / this.col);
            var col = c % this.col;
            var z = -Math.floor(this.numChildren / (this.col * this.col)) * 10;
            switch (this.view) {
                case 0:
                    sp = new mjH(val);
                    sp.pos(-row * sp.width, -col * (sp.height - 12) - z);
                    sp.getChildAt(0).rotation = -90;
                    this.addChild(sp);
                    this.setChildIndex(sp, 0);
                    break;
                case 1:
                    sp = new mjV(val);
                    sp.pos(col * sp.width, -row * (sp.height - 12) - z);
                    this.addChild(sp);
                    this.setChildIndex(sp, 0);
                    break;
                case 2:
                    sp = new mjH(val);
                    sp.pos(row * sp.width, col * (sp.height - 12) + z);
                    this.addChild(sp);
                    break;
                case 3:
                    sp = new mjV(val);
                    sp.pos(-col * sp.width, row * (sp.height - 12) + z);
                    this.addChild(sp);
                    break;
            }

        }

        removeAll() {
            this.removeChildren(0, this.numChildren);
        }
    }
}