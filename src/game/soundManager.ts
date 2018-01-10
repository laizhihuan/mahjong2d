module game {
    export class SoundManager {
        //不需要new

        public static playBgm(url = "") {
            if (url == "")
                url = "res/sound/bg0.mp3";
            Laya.SoundManager.playMusic(url);
        }

        public static playTile(tile, bBoy) {
            var url = "res/sound/tiles/card_" + (bBoy ? "man" : "woman") + tile + ".wav";
            SoundManager.palySound(url);
        }

        public static playTalk(id, bBoy) {
            var url = "res/sound/talk/talk_" + (bBoy ? "man" : "woman") + id + ".wav"
            SoundManager.palySound(url);
        }

        public static playEffect(name) {
            var url = "res/sound/effect/" + name + ".wav";
            SoundManager.palySound(url);
        }

        public static palySound(url) {
            Laya.SoundManager.playSound(url);
        }
    }
}