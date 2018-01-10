module uiview {
    export class rollView extends ui.rollViewUI {
        constructor(parent: Laya.Node) {
            super();
            this.name = "rolling";
            Laya.timer.frameLoop(1, this, this.animate);
            parent.addChild(this);
            parent.setChildIndex(this, parent.numChildren - 1);
        }
        animate(e) {
            this.roll.rotation += 4;
        }
        stopRoll() {
            Laya.timer.clear(this, this.animate);
            this.removeSelf();
        }

        public static startRoll(parent: Laya.Node) {
            if (parent.getChildByName("rolling") == null) {
                return new rollView(parent);
            }
            return parent.getChildByName("rolling") as rollView;
        }
    }
}