import * as socketIo from "socket.io";
import Socket from "../../../vendor/core/socket/Socket";
import SocketInterface from "../../../vendor/core/socket/SocketInterface";
import * as fs from "fs";


class SocketIo extends Socket implements SocketInterface {

    public ws: any


    public setServer(expressApp: any) {
        this.ws = new socketIo.Server(expressApp)
    }

    public connection() {
        Socket.setChannel('online')

        this.ws.on('connection', (socket: any) => {
            // we has new connection
        })
    }
}

export default new SocketIo