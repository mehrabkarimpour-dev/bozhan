import mqtt from 'mqtt'

const client = mqtt.connect('mqtt://test.mosquitto.org')

client.on('connect', function () {
    client.subscribe('presence', function (err) {
        if (!err) {
            client.publish('presence', 'Hello mqtt')
        }
    })
})