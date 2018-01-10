module uiview {
    export class handCtrl extends Laya.Sprite {
        view = 0;
        _que = -1;
        _queCount = 0;
        _cpg: Laya.Sprite;
        vec: { x, y };
        _cardWidth = 0;
        _cpgWidth = 0;
        multi = false;
        _lay = false;
        constructor(view, lay = false) {
            super();
            this.view = view;
            this._cpg = new Laya.Sprite();
            this.addChild(this._cpg);
            this.vec = this.getOffset(1);
            this._lay = lay;
        }

        setEnableClick() {
            //this.graphics.drawRect(0, -720, 1200, 800, "#ff9900");
            var hitarea: Laya.HitArea = new Laya.HitArea();
            var graphics: Laya.Graphics = new Laya.Graphics();
            graphics.drawRect(0, -720, 1200, 800, "#ff9900");
            hitarea.hit = graphics;
            this.hitArea = hitarea;
            this.on(Laya.Event.MOUSE_DOWN, this, this.testHit);
            this.on(Laya.Event.MOUSE_UP, this, this.mouseUp);
        }

        selectIdx = -1;
        orix = 0;
        testHit(e: Laya.Event) {
            if (this.numChildren <= 1)
                return;
            if (!this.multi && (this.numChildren - 1) % 3 != 2)
                return;
            var height = this.getChildAt(1).height;
            var y = Laya.stage.mouseY + height * 0.5 - this.parent.y;
            if (y < 0 || y > height)
                return;
            var x = Laya.stage.mouseX - this.parent.x - this.countCpgWidth();
            var idx = Math.floor(x / this._cardWidth) + 1;
            if (idx >= this.numChildren)
                return;
            if (this.multi) {
                var sp = this.getChildAt(idx) as mjS;
                sp.y = -10 - sp.y;
                return;
            }
            if ((this.getChildAt(idx) as mjS).gray)
                return;
            if (this.selectIdx != -1) {
                var sp = this.getChildAt(this.selectIdx) as mjS;
                sp.pos(this.orix, 0);
                if (idx == this.selectIdx) {
                    game.gameClient.instance.reqOutCard(sp.val);
                    this.selectIdx = -1;
                    return;
                }
                this.selectIdx = -1;
            }
            this.selectIdx = idx;
            var sp = this.getChildAt(idx) as mjS;
            sp.y = -10;
            this.orix = sp.x;
            sp.startDrag();

        }

        mouseUp() {
            if (this.selectIdx == -1)
                return;
            var sp = this.getChildAt(this.selectIdx) as mjS;
            if (sp.y != -10) {
                if (sp.y < -30) {
                    game.gameClient.instance.reqOutCard(sp.val);
                }
                sp.pos(this.orix, 0);
                this.selectIdx = -1;
            }
        }

        //[2,3,2,32,43]
        addCards(data: Array<any>) {
            for (let i = 0; i < data.length; ++i) {
                if (data[i] == 255) {
                    break;
                }
                this.addCard(data[i]);
            }
        }

        addCard(val) {
            var sp: Laya.Image;
            var offCpg = this.countCpgWidth();
            switch (this.view) {
                case 0:
                    sp = new mjSR(val);
                    this._cardWidth = (val == 0 ? (sp.width - 6) : (sp.height - 12));
                    this.addChild(sp);
                    //this.setChildIndex(sp, 1);
                    break;
                case 1:
                    if (this._lay) {
                        sp = this.createCpgCard(val);
                        this._cardWidth = sp.width * sp.scaleX;
                    } else {
                        sp = new mjS(val);
                        this._cardWidth = sp.width - 4;
                    }

                    this.addChild(sp);
                    break;
                case 2:
                    sp = new mjSL(val);
                    this._cardWidth = (val == 0 ? (sp.width - 6) : (sp.height - 12));
                    this.addChild(sp);
                    break;
                case 3:
                    sp = new mjSF(val);
                    this._cardWidth = sp.width - 4;
                    this.addChild(sp);
                    break;
            }
            var x = (this.numChildren - 2) * this._cardWidth + offCpg;
            sp.pos(this.vec.x * x, this.vec.y * x);
            if (this.view == 1) {
                if (Math.floor(val / 10) == this._que)
                    ++this._queCount;
                this.rendQue();
            }
        }

        moveLastCard(x = 10) {
            var sp = this.getChildAt(this.numChildren - 1);
            sp.pos(sp.x + this.vec.x * x, sp.y + this.vec.y * x);
        }

        //{byType,byData}
        addCpg(cpg) {
            if (cpg.byData.length >= 3) {
                var offX = (this._cpg.numChildren / 3) * 4;
                for (let i = 0; i < 3; ++i) {
                    var sp = this.createCpgCard(cpg.byData[i]);
                    this._cpgWidth = (this.view % 2 == 0 ? sp.height - 14 : sp.width - 2) * sp.scaleX;
                    var x = this._cpg.numChildren * (this._cpgWidth) + offX;
                    sp.pos(this.vec.x * x, this.vec.y * x);
                    this._cpg.addChild(sp);
                }
            }

            if (cpg.byData.length % 3 == 1) {
                var sp = this.createCpgCard(cpg.byData[0]);
                var idx = this._cpg.numChildren - 2;
                if (cpg.byData.length == 1) {
                    //补杠
                    for (let i = 0; i < this._cpg.numChildren; ++i) {
                        if (this._cpg.getChildAt(i).val == cpg.byData[0]) {
                            idx = i + 1;
                            break;
                        }
                    }
                }
                sp.anchorX = 0;
                sp.anchorY = 0;
                sp.pos(0, -10);      //y,x
                sp.scale(1, 1);
                this._cpg.getChildAt(idx).addChild(sp);
            }
            this.sort();
        }

        createCpgCard(val) {
            switch (this.view) {
                case 0:
                    var sp = new mjH(val);
                    if (val != 0)
                        sp.getChildAt(0).rotation = -90;
                    return sp;
                case 1:
                    var sp = new mjV(val);
                    sp.scale(1.4, 1.4);
                    return sp;
                case 2:
                    return new mjH(val);
                case 3:
                    return new mjV(val);
            }

        }

        countCpgWidth() {
            return this._cpgWidth * this._cpg.numChildren + (this._cpg.numChildren / 3) * 4;
        }

        getOffset(offset) {
            var x = (2 - this.view) % 2 * offset;
            //var y = (this.view - 1) % 2 * offset; //右边从下到上
            var y = (this.view + 1) % 2 * offset;   //右边从上到下
            return { x, y };
        }

        removeCard(val) {
            for (let i = 1; i < this.numChildren; ++i) {
                if (this.getChildAt(i).val == 0 || this.getChildAt(i).val == val) {
                    var sp = this.removeChildAt(i);
                    if (this.view == 1 && Math.floor(val / 10) == this._que) {
                        --this._queCount;
                        this.rendQue();
                    }
                    this.sort();
                    return;
                }
            }
        }

        removeLast() {
            this.removeChildAt(this.numChildren - 1);
        }

        sort() {
            if (this.numChildren <= 1)
                return;
            var idx = -1;
            var sp = this.getChildAt(this.numChildren - 1);
            for (let i = 1; i < this.numChildren; ++i) {
                if (idx == -1 && sp.val < this.getChildAt(i).val) {
                    this.setChildIndex(sp, i);
                    idx = i;
                }
                var x = this._cardWidth * (i - 1) + this._cpg.numChildren * this._cpgWidth + (this._cpg.numChildren / 3) * 4;
                (this.getChildAt(i) as Laya.Image).x = this.vec.x * x;
                (this.getChildAt(i) as Laya.Image).y = this.vec.y * x;
            }
        }

        removeAll() {
            this._cpg.removeChildren(0, this._cpg.numChildren);
            this.removeChildren(1, this.numChildren);
            this._que = -1;
            this._queCount = 0;
        }

        setQue(que) {
            this._que = que;
            if (this.view == 1) {
                this._queCount = 0;
                for (let i = 1; i < this.numChildren; ++i) {
                    if (Math.floor(this.getChildAt(i).val / 10) == this._que) {
                        ++this._queCount;
                    }
                }
                this.rendQue();
            }
        }
        rendQue() {
            var find = this._queCount > 0;
            for (let i = 1; i < this.numChildren; ++i) {
                var sp = this.getChildAt(i) as mjS;
                sp.gray = find && (Math.floor(sp.val / 10) != this._que);
            }
        }

        getUpCard() {
            var arr = [];
            for (let i = 1; i < this.numChildren; ++i) {
                if (this.getChildAt(i).y < 0) {
                    arr.push(this.getChildAt(i).val);
                    if (arr.length >= 3)
                        break;
                }
            }
            return arr;
        }

        popImg(name) {
            var img = new Laya.Image();
            img.skin = "res/game/" + name + ".png";
            var x = (this.numChildren - 1) * this._cardWidth * 0.75;
            img.pos(this.vec.x * x, this.vec.y * x);
            img.anchorX = 0.5;
            img.anchorY = 0.5;
            this.parent.addChild(img);
            img.scale(0, 0);
            Laya.Tween.to(img, { scaleX: 1, scaleY: 1 }, 500, Laya.Ease.backOut);
            Laya.timer.once(2000, this, () => {
                img.removeSelf();
            });
        }
    }
}