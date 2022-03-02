const {PeerServer} = require('peer');


const peerServer = new PeerServer({
    // @ts-ignore
    port: process.env.PEER_PORT | 9001,
    path: '/peerjs',
    key: 'peerjs',
});


export default () => {
    peerServer.on('connection', function (client: any) {
        console.log(client.getId());
    })

    peerServer.on('disconnect', function (client: any) {
        console.log(`oops this client   ${client.getId()}  is disConnected !`);
    })
}