require('dotenv').config();
const express = require('express');
const Sender = require('./sender');
CLIENT_ID = process.env.CLIENT_ID;
ACCESS_KEY = process.env.ACCESS_KEY; 

const sender = new Sender();

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.get('/status', (req, res) => {
    const doIt = () => {
        return sender.getStatus();
    } 
    res.status(200).send(tryDoThis(doIt));
})

app.post('/send', (req, res) => {
    const doIt = () => {
        const body = req.body;
        if(body.clientId == CLIENT_ID && body.accessKey == ACCESS_KEY) {
            sender.sendMessage(body.phone + '@c.us', body.message)
            return {message: 'Sucesso'}
        }
        else {
            return {message: 'Error'}
        }
    }
    res.status(200).send(tryDoThis(doIt));
})

app.listen(5000, () => {
    console.log(`app listening on port 5000`)
})

tryDoThis = (fc) => {
    try {
        return fc();
    } catch(error){
        console.log(error);
        return {message: error}
    }
}