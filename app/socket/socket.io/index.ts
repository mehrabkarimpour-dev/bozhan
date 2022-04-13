import * as socketIo from "socket.io"
import Socket from "../../../vendor/core/socket/Socket"
import SocketInterface from "../../../vendor/core/socket/SocketInterface"
import ShouldNotificationInterface from "../../../vendor/core/notification/ShouldNotificationInterface"


class SocketIo extends Socket implements SocketInterface, ShouldNotificationInterface {

    public ws: any


    public setServer(expressApp: any) {
        this.ws = new socketIo.Server(expressApp)
    }

    public connection() {
        Socket.setChannel('online')

        this.ws.on('connection', (socket: any) => {
            // we have a  new connection
        })
    }

    push(message: string): any {
        // this.ws.emit('channel',message)
    }

}

export default new SocketIo
