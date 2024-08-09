import express from 'express';
import cors, {CorsOptions} from 'cors';
import {vigenereCipher} from "./vigenere";

const app = express();
const port = 8000;

const whitelist = ['http://localhost:5173'];
const corsOptions: CorsOptions = {
    origin: (origin, callback) => {
        if (origin && whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}

app.use(cors(corsOptions));
app.use(express.json());

app.post('/encode', (req, res) => {
    const { message, password } = req.body;
    if (message === '' || password === '') {
        return res.status(400).send('Password or message is empty');
    }

    res.send({
        encoded: vigenereCipher(message, password, false),
    });
})

app.listen(port, () => {
    console.log(`Server started on ${port} port!`);
});