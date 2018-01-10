module uiview {
    export class finView extends ui.finViewUI {

        huType = ["胡牌","大对子","清一色","暗七对","全带幺","断幺","门清","将对","清对","清七对","龙七对","清龙七对","杠开","杠后炮","天胡","地胡","抢杠","幺九七对","清带幺","胡根","自摸"];
        constructor() {
            super();
            this.btnCon.on(Laya.Event.CLICK, this, () => {
                this.visible = false;
                if (gameView.instance.m_client.m_ws != null) {
                    if (game.gameClient.instance.bOver) {
                        gameView.instance.onBack();
                    } else {
                        gameView.instance.m_client.m_ws.SendEmpty(180, 1);
                        gameView.instance.clearUI();
                    }
                }
            });
        }

        showFin(data) {
            this.visible = true;

            var dSource = [];
            for (let i = 0; i < game.gameInfo.max_people; ++i) {
                if (game.gameClient.instance.users[i] == null)
                    continue;
                dSource.push({
                    nick: {
                        skin: network.http.webRoot + "/Image/name/" + game.gameClient.instance.users[i].userId + ".png"
                    },
                    bNt: { visible: false },
                    bHu: { visible: data.user_count_fen_[i].hu_details_.length > 0 },
                    bPao: { visible: false },
                    total: { text: "总分:" + data.user_count_fen_[i].fen_ },
                    money: { text: "金币:" + data.user_count_fen_[i].fen_ * game.gameInfo.ratio }
                });
            }
            this.list.array = dSource;

            var bHuangzhuang = true;
            for (let i = 0; i < 4; ++i) {
                var hctrl = new handCtrl(1, true);
                this.list.getChildAt(0).getChildAt(i).addChild(hctrl);
                hctrl.addCards(data.user_count_fen_[i].hand_);
                hctrl.scale(0.8, 0.8);
                hctrl.pos(120, 80);

                if (data.user_count_fen_[i].hu_details_.length > 0)
                    bHuangzhuang = false;
                if (i == game.gameClient.instance.m_myDesk) {
                    this.getChildByName("win").visible = data.user_count_fen_[i].fen_ >= 0;
                    this.getChildByName("lose").visible = data.user_count_fen_[i].fen_ < 0;
                }

                for (let k = 0; k < data.user_count_fen_[i].cpg_.length; ++k) {
                    var d = {
                        byType: data.user_count_fen_[i].cpg_[k].byType,
                        byData: [data.user_count_fen_[i].cpg_[k].byData[0], data.user_count_fen_[i].cpg_[k].byData[0], data.user_count_fen_[i].cpg_[k].byData[0]]
                    };
                    if (d.byType == 5) {
                        d.byData = [0, 0, 0];
                    }
                    if (d.byType > 3) {
                        d.byData.push(d.byData[0]);
                    }
                    hctrl.addCpg(d);
                }

                var arr = [];
                for (let k = 0; k < data.user_count_fen_[i].hu_details_.length; ++k) {
                    arr.push(data.user_count_fen_[i].hu_details_[k].v_);
                }
                hctrl.addCards(arr);

                for (let k = 0; k < arr.length; ++k) {
                    hctrl.getChildAt(hctrl.numChildren - 1 - k).x += 20;
                }
            }
            this.getChildByName("hz").visible = bHuangzhuang;
        }
    }
    export enum HUPAI_TYPE_EX//LU胡牌类型枚举结构
    {
        HUPAI_HU_PAI = 150,		//能胡（素番）1番 1分
        HUPAI_PENG_PENG_HU,		//大对子（碰碰糊）2番 2分
        HUPAI_QING_YI_SE,		//清一色3番
        HUPAI_AN_QI_DUI,		//暗七对（即七对子）3番 4分
        HUPAI_QUAN_DAI_YAO,		//全带幺3番 4分
        HUPAI_DUAN_YAO,		//Danny added，断幺
        HUPAI_MEN_QING,		//Danny added，门清
        HUPAI_JIANG_DA_DUI,		//将对（258碰碰糊）4番 8分
        HUPAI_QING_DA_DUI,		//清对（清一色碰碰糊）4番 8分
        HUPAI_QING_QI_DUI,		//清七对（清一色七对子）5番 16分
        HUPAI_LONG_QI_DUI,		//龙七对4番  8分

        HUPAI_QING_LONG_QI_DUI,		//清龙七对6番 32分

        HUPAI_TYPE_GANG_KAI,		// 杠开 1番
        HUPAI_TYPE_GANG_PAO,		// 杠后炮 1番
        HUPAI_TYPE_TIAN_HU,		// 天胡 4番
        HUPAI_TYPE_DI_HU,		// 地胡 4番
        HUPAI_TYPE_QIANG_GANG,		// 抢杠 1番
        HUPAI_YAO_JIU_QI_DUI,		// 幺九七对8番 128分
        HUPAI_QING_DAI_YAO,		// 清带幺5番 16番

        HUPAI_HU_GEN,		//糊根
        HUPAI_ZI_MO							//自摸

    }
}