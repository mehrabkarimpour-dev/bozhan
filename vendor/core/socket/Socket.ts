import {defaultChannel} from "../../../config/socket";

class Socket {
    public static channels: any = []

    /*
    *  ............... your channel must be object type that has tow property  1=>name and 2=>clients ,
    *  ............... every channel has one or many clients
    *
    * channels=[
    *
    *        {
    *          name:'test' ,
    *          clients=[]
    *        }
    *
    *     ]
    * */

    constructor() {
        defaultChannel?.map((channel: string) => {
            Socket.setChannel(channel)
        })
    }

    public static setChannel = (channel: string) => {
        if (!Socket.channels.find((chn: any) => chn.title === channel)) {
            Socket.channels.push({
                title: channel,
                clients: []
            })
        }
    }

    public static broadcast = (channel: string | null, message: any) => {
        if (channel) {
            let _ch = this.channels.find((_channel: any) => _channel === channel)
            if (_ch) {
                _ch.clients.map((client: any) => {
                    client.send(message)
                })
            }
        } else {
            this.channels.map((_channel: any) => {
                _channel.clients.map((client: any) => {
                    client.send(message)
                })
            })
        }
    }

    public static channelExists = (channel: string) => {
        return Socket.channels.find((chan: any) => chan.title === channel)
    }

    public static removeChannel = (channel: string) => {
        return Socket.channels.delete((chan: string) => chan === channel)
    }

    public static getChannels = () => {
        return Socket.channels
    }

    public static getChannelClients = (channel: string) => {

        return Socket.channels.find((ch: any) => ch.title === channel)?.clients
        //Socket.channels.find((ch: any) => ch.title === channel).clients : false
    }

    public static removeClientFromChannel = (_channel: string | null, client: any) => {
        if (_channel) {
            let currentChannelClient = Socket.channels.find((ch: any) => ch.title === _channel)
            if (currentChannelClient && currentChannelClient.clients) {
                let allClientsFiltered = currentChannelClient.clients.filter((cli: any) => cli.id === client.id)
                currentChannelClient.clients = [...allClientsFiltered]
                return Socket.channels
            }

        } else {
            return this.channels?.filter((ch: any) => ch.clients.id == client.id).clients
            //return this.channels = updatedChannels
        }
    }

    public static addClientToChannel = (_channel: string | null, client: any) => {
        if (_channel) {
            let currentChannelClient = Socket.channels.find((ch: any) => ch.title === _channel)
            if (currentChannelClient) {
                let clientAlreadyExists = currentChannelClient.clients.find((cli: any) => cli.id == client.id)
                if (clientAlreadyExists) return false
            }
            if (currentChannelClient) Socket.channels.find((ch: any) => ch.title === _channel).clients.push(client)
            return Socket.channels.find((ch: any) => ch.title === _channel).clients;
        } else {
            this.channels?.map((channel: any) => {
                let currentChannelClient = Socket.channels.find((ch: any) => ch.title === channel.title)
                if (currentChannelClient) {
                    let clientAlreadyExists = channel?.clients?.find((_client: any) => _client.id == client.id)
                    if (!clientAlreadyExists)
                        Socket.channels.find((ch: any) => ch.title === channel.title).clients.push(client)
                }
            })
        }
        return _channel
    }

}


export default Socket;