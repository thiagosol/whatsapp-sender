const venom = require('venom-bot');

class Sender {

    _client;
    _status;

    constructor() {
      this.initialize(); 
    }

    initialize = () => {

        const qr = (base64Qrimg) => {
            console.log('base64 image string qrcode: ', base64Qrimg);
        }

        const start = (client) => {
            this._client = client;
        }

        const status = (statusSession, session) => {
            console.log('Status Session: ', statusSession); //return isLogged || notLogged || browserClose || qrReadSuccess || qrReadFail || autocloseCalled || desconnectedMobile || deleteToken || chatsAvailable || deviceNotConnected || serverWssNotConnected || noOpenBrowser || initBrowser || openBrowser || connectBrowserWs || initWhatsapp || erroPageWhatsapp || successPageWhatsapp || waitForLogin || waitChat || successChat
            //Create session wss return "serverClose" case server for close
            console.log('Session name: ', session);
            this._status = {
                statusSession,
                session
            }
        }

        venom.create("session-whatsapp-sender", qr, status)
            .then((client) => start(client))
            .catch((erro) => {
                console.log(erro);
            });

    }

    async sendMessage(to, message){
        await this._client.sendText(to, message)
        return { message: 'Enviado com sucesso' }
    }

    getStatus(){
        return this._status;
    }

}

module.exports = Sender