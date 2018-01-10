module game {
    export var userInfo = {
        userId: 0,
        md5: "",
        token: "",
        open_id: "",
        gold: 0,
        lat: 0,
        lon: 0
    };
    export var gameInfo = {
        nameId: 0,
        deskPwd: 0,
        serverIp: "127.0.0.1",
        serverPort: 0,
        json_rule: {},
        max_round: 0,
        max_people: 4,
        ratio: 1,
        ITEM_SOUND_VOLUME: "sound_volume",
        ITEM_MUSIC_VOLUME: "music_volume",
        ITEM_WX_TOKEN: "wx_token",
        ITEM_WX_OPEN_ID: "wx_open_id"
    }

    export var ruleItem0 = {
        round: { label: "8局,16局", value: [8, 16] },
        feng_ding: { label: "2番,3番,4番", value: [2, 3, 4] },
        zimo_jia: { label: "自摸加底,自摸加番", value: ["zimo_jia_di", "zimo_jia_fan"] },
        dian_gang_hua: { label: "点杠花(点炮),点杠花(自摸)", value: ["dian_pao", "zimo"] },
        huan3: { label: "换三张" },
        yao_jiu: { label: "幺九将对" },
        men_qing: { label: "门清中张" },
        tian_di_hu: { label: "天地胡" }
    }

    export var uiAtlas = {
        login: ["res/atlas/login.atlas", "res/atlas/pop.atlas", { url: "nonepack/login_bg.png", type: Laya.Loader.IMAGE }, { url: "nonepack/logo.png", type: Laya.Loader.IMAGE },
            { url: "nonepack/main_BJ.png", type: Laya.Loader.IMAGE }, { url: "nonepack/avatar.png", type: Laya.Loader.IMAGE }, { url: "nonepack/top.png", type: Laya.Loader.IMAGE }, { url: "nonepack/bottom.png", type: Laya.Loader.IMAGE }, { url: "nonepack/frame_bg.png", type: Laya.Loader.IMAGE },
            { url: "nonepack/allBack.png", type: Laya.Loader.IMAGE }, { url: "nonepack/over_bj.jpg", type: Laya.Loader.IMAGE }, { url: "nonepack/game_bg1.png", type: Laya.Loader.IMAGE }],
        home: ["res/atlas/home.atlas"],
        game: ["res/atlas/game.atlas", "res/atlas/fin.atlas", "res/atlas/mj.atlas", "res/atlas/emoji.atlas", "res/atlas/allfin.atlas"]
    }

    export class userStruct {
        userId = 0;
        deskStation = -1;
        userState = 0;
        temp_chip = 0;
        bBoy = true;
        addr = "";
    }
}
