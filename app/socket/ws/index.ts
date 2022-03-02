import WebSocket, {createWebSocketStream} from 'ws'
import {wbConfig} from "../../../config/socket";
import Socket from "../../../vendor/core/socket/Socket";
import SocketInterface from "../../../vendor/core/socket/SocketInterface";


class wb extends Socket implements SocketInterface {

    public ws: any

    constructor() {
        super();
        this.ws = new WebSocket.Server(wbConfig)
    }


    public connection = async () => {
        this.ws.on('connection', (client: any) => {
            client.on('message', function message(data: any) {
                client.send(data.toString())
            });
        })
    }

}

export default new wb()


