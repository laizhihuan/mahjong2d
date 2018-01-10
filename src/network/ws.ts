module network {
    export class ws {
        _ws;//: WebSocket;//Laya.Socket;
        public OnMessage;
        public OnOpen;
        public OnClose;
        constructor(url: string = "ws://127.0.0.1:6002") {

            this._ws = new Laya.Socket();

            this._ws.on(Laya.Event.OPEN, this, this.openHandler);
            this._ws.on(Laya.Event.MESSAGE, this, this.receiveHandler);
            this._ws.on(Laya.Event.CLOSE, this, this.closeHandler);
            this._ws.connectByUrl(url);
        }

        private openHandler(event: any = null): void {
            //正确建立连接；
            console.log("ws opened!");
            if (this.OnOpen != null) {
                this.OnOpen();
            }
        }

        private receiveHandler(msg: any = null): void {
            ///接收到数据触发函数
            if (msg instanceof ArrayBuffer) {
                //var str = String.fromCharCode.apply(String, msg);
            } else {
                //console.log(msg);
                var da = JSON.parse(msg);
                if (da.head.main !== 1 && da.head.ass !== 1) {
                    console.log(msg);
                }
                if (this.OnMessage != null) {
                    this.OnMessage(da);
                }
            }
        }
        private closeHandler(e: any = null): void {
            //关闭事件
            console.log("Connection closed " + e.code + " " + e.reason);
            if (this.OnClose != null) {
                this.OnClose();
            }
        }

        Send(mainId: number, assId: number, d, handleCode = 0, messageSize = 1) {
            if (!this._ws.connected)
                return;
            var data = {
                len: messageSize,
                main: mainId,
                ass: assId,
                hcode: handleCode,
                data: JSON.stringify(d)
            }
            this._ws.send(JSON.stringify(data));
        }

        SendEmpty(mainId: number, assId: number, handleCode = 0) {
            if (!this._ws.connected)
                return;
            var data = {
                len: 0,
                main: mainId,
                ass: assId,
                hcode: handleCode
            }
            this._ws.send(JSON.stringify(data));
        }

        Close() {
            this._ws.close();
        }
    }
}