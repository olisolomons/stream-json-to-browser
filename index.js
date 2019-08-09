const express = require('express');
const expressWs = require('express-ws');
const {
    spawn
} = require('child_process');
const mqtt = require('mqtt');

const PORT = 8080;
const DEVICE_UUID = process.argv.length > 3 ? process.argv[2] : '+';

app = express();
expressWs(app);

api = express.Router()
app.use('/api', api);

let clients = new Set();
api.ws('/json-data', (ws, req) => {
    console.log('connected');
    clients.add(ws);

    ws.on('close', () => {
        clients.delete(ws);
    });
});

let client = mqtt.connect('mqtt://eu.thethings.network', {
    username: process.env.MQTT_APP_ID,
    password: process.env.MQTT_APP_ACCESS_KEY
})
client.on('connect', () => {
    client.subscribe(`+/devices/${DEVICE_UUID}/up`, () => {

    });
    client.subscribe('+/devices/+/events/activations', () => {

    });
});

client.on('message', function(topic, message) {
    // message is Buffer
    for (let ws of clients) {
        ws.send(message.toString());
    }
});


app.use(express.static('static'));

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
