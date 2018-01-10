module uiview {
    export class talkView extends ui.talkViewUI {
        soundInfo = [{ "words": "你太牛了" },
        { "words": "呵呵 手气真好" },
        { "words": "快点出牌哟" },
        { "words": "今天真高兴" },
        { "words": "这个吃的好" },
        { "words": "你放炮我不胡" },
        { "words": "你家里开银行的吧" },
        { "words": "不好意思 我有事先走一步" },
        { "words": "你的牌打的太好了" },
        { "words": "大家好很高兴见到各位" },
        { "words": "怎么又断线了 网络怎么这么差啊" }];
        constructor() {
            super();
            this.getChildAt(0).on(Laya.Event.CLICK, this, () => {
                this.visible = false;
            });
            this.tab.selectHandler = new Laya.Handler(this, this.onTab);
            var dArr = [];
            for (let i = 0; i < this.soundInfo.length; ++i) {
                dArr.push({
                    label: { text: this.soundInfo[i].words }
                });
            }
            var list = this.view.getChildAt(0) as Laya.List;
            list.array = dArr;
            list.vScrollBarSkin = "";
            list.selectEnable = true;
            list.selectHandler = Laya.Handler.create(this, this.onSoundList, null, false);

            var panel = this.view.getChildAt(1) as Laya.Panel;
            panel.vScrollBarSkin = "";
            var root = panel.getChildAt(0) as Laya.Image;
            for (let i = 0; i < 48; ++i) {
                var img = new Laya.Image();
                img.skin = "emoji/EE" + i + ".png";
                root.addChild(img);
                img.pos(img.width * (i % 9) + 10, img.height * Math.floor(i / 9) + 6);
                img.on(Laya.Event.CLICK, this, this.onEmoji, [i]);
            }
            this.btnSend.on(Laya.Event.CLICK, this, this.onSend);
        }
        private onTab(index: number): void {
            //切换ViewStack子页面
            this.view.selectedIndex = index;
        }

        private onSoundList(idx) {
            var d = {
                type: "sound",
                desk_station: game.gameClient.instance.m_myDesk,
                msg: idx + ""
            }
            game.gameClient.instance.m_ws.Send(180, 144, d);
        }

        private onEmoji(idx) {
            var d = {
                type: "emoji",
                desk_station: game.gameClient.instance.m_myDesk,
                msg: idx + ""
            }
            game.gameClient.instance.m_ws.Send(180, 144, d);
        }

        private onSend() {
            var d = {
                type: "text",
                desk_station: game.gameClient.instance.m_myDesk,
                msg: this.input.text
            }
            game.gameClient.instance.m_ws.Send(180, 144, d);
        }

        public onSoundEffect(id, view, bBoy) {
            game.SoundManager.playTalk(id, bBoy);
            this.onTextEffect(this.soundInfo[id].words, view);
        }

        public onEmojiEffect(id, view) {
            var img = new Laya.Image();
            img.skin = "emoji/EE" + id + ".png";
            img.anchorX = 0.5;
            img.anchorY = 0.5;
            gameView.instance.players.getChildAt(view).addChild(img);
            img.pos(img.parent.width * 0.5, img.parent.height * 0.5);
            img.scale(0, 0);
            Laya.Tween.to(img, { scaleX: 1, scaleY: 1 }, 200);
            Laya.timer.once(2000, this, () => {
                img.removeSelf();
            });
        }

        public onTextEffect(text, view) {
            var txt = new textScroll(text);
            gameView.instance.players.getChildAt(view).addChild(txt);
            if (view == 0) {
                txt.pos(gameView.instance.players.getChildAt(view).width - txt.width, 0);
            }
        }
    }

    export class textScroll extends Laya.Image {
        constructor(text) {
            super();
            this.skin = "game/talk_item_sound_bg.png";
            this.sizeGrid = "32,32,32,32";
            var label = new Laya.Label(text);
            label.fontSize = 24;
            label.color = "#110101";
            this.addChild(label);
            // if (label.width > this.width) {
            //     Laya.Tween.to(label, { x: label.width - this.width }, 1000);
            // }
            label.pos(5, 2);
            this.width = label.width + 10;
            this.height = label.height + 8;
            Laya.timer.once(2000, this, () => {
                if (this.parent != null) {
                    this.removeSelf();
                }
            });
        }
    }
}