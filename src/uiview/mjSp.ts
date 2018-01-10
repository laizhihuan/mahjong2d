module uiview {
    //水平方向上的麻将子
    export class mjH extends Laya.Image {
        val = 0;
        constructor(val) {
            super();
            this.val = val;
            if (val == 0) {
                this.skin = "mj/back_h.png";
            }
            else {
                this.skin = "mj/out_h.png";
                var v = new Laya.Image();
                v.skin = "mj/" + val + ".png";
                v.pos(this.width * 0.5, this.height * 0.5 - 8);
                v.rotation = 90;
                v.anchorX = 0.5;
                v.anchorY = 0.5;
                v.scale(0.4, 0.5);
                this.addChild(v);
            }
            this.anchorX = 0.5;
            this.anchorY = 0.5;
        }
    }
    //垂直方向上的麻将子
    export class mjV extends Laya.Image {
        val = 0;
        constructor(val) {
            super();
            this.val = val;
            if (val == 0) {
                this.skin = "mj/back_v.png";
            }
            else {
                this.skin = "mj/out_v.png";
                var v = new Laya.Image();
                v.skin = "mj/" + val + ".png";
                v.pos(this.width * 0.5 + 1, this.height * 0.5 - 6);
                v.scale(0.5, 0.5);
                v.anchorX = 0.5;
                v.anchorY = 0.5;
                this.addChild(v);
            }
            this.anchorX = 0.5;
            this.anchorY = 0.5;
        }
    }
    //自己的站着的麻将子
    export class mjS extends Laya.Image {
        val = 0;
        constructor(val) {
            super();
            this.val = val;
            this.skin = "mj/hand_bg.png";
            var v = new Laya.Image();
            v.skin = "mj/" + val + ".png";
            v.pos(this.width * 0.5, this.height * 0.5 + 12);
            v.anchorX = 0.5;
            v.anchorY = 0.5;
            this.addChild(v);
            //this.anchorX = 0.5;
            this.anchorY = 0.5;
        }
    }


    //左右和上面的站着的麻将子没什么必要再单独建个类。躺下来的实现是一样的
    //为了让麻将子图片的引用集中在这个文件里

    export class mjSL extends Laya.Image {
        val = 0;
        constructor(val) {
            super();
            this.val = val;
            if (val == 0) {
                this.skin = "mj/hand_h.png";
            } else {
                this.skin = "mj/out_h.png";
                var v = new Laya.Image();
                v.skin = "mj/" + val + ".png";
                v.pos(this.width * 0.5, this.height * 0.5 - 8);
                v.rotation = 90;
                v.anchorX = 0.5;
                v.anchorY = 0.5;
                v.scale(0.4, 0.5);
                this.addChild(v);
            }
            this.anchorX = 0.5;
            this.anchorY = 0.5;
        }
    }

    export class mjSR extends Laya.Image {
        val = 0;
        constructor(val) {
            super();
            this.val = val;
            if (val == 0) {
                this.skin = "mj/hand_h.png";
                this.scaleX = -1;
            } else {
                //这段和最上面那段一样
                this.skin = "mj/out_h.png";
                var v = new Laya.Image();
                v.skin = "mj/" + val + ".png";
                v.pos(this.width * 0.5, this.height * 0.5 - 8);
                v.rotation = -90;
                v.anchorX = 0.5;
                v.anchorY = 0.5;
                v.scale(0.4, 0.5);
                this.addChild(v);
            }
            this.anchorX = 0.5;
            this.anchorY = 0.5;
        }
    }

    export class mjSF extends Laya.Image {
        val = 0;
        constructor(val) {
            super();
            this.val = val;
            if (val == 0) {
                this.skin = "mj/back_f.png"
            } else {
                this.skin = "mj/out_v.png";
                var v = new Laya.Image();
                v.skin = "mj/" + val + ".png";
                v.pos(this.width * 0.5 + 1, this.height * 0.5 - 6);
                v.scale(0.5, 0.5);
                v.anchorX = 0.5;
                v.anchorY = 0.5;
                this.addChild(v);
            }
            this.anchorX = 0.5;
            this.anchorY = 0.5;
        }
    }
}