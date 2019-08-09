const express = require('express');
const expressWs = require('express-ws');
const {spawn} = require('child_process');


const PORT = 8080;

app = express();
expressWs(app);

api=express.Router()
app.use('/api',api);

let clients = new Set();
api.ws('/json-data',(ws,req)=>{
    console.log('connected');
    clients.add(ws);

    ws.on('close',()=>{
        clients.delete(ws);
    });
});

let producer = spawn('python',['json-producer.py']);
producer.stdout.on('data',(data)=>{

    for (let client of clients) {
        client.send(data.toString());
    }
});


producer.on('exit', (code) => {
  console.log(`Child exited with code ${code}`);
});

app.use(express.static('static'));

app.listen(PORT,()=>console.log(`Server listening on port ${PORT}`));
