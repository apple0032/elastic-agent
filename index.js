import express from "express";
import 'dotenv/config';
const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());

import { createClient } from "redis";

const client = createClient({
    url: process.env.REDIS_URL
});


app.get('/setData', async function (req, res) {

    try {

        let saved_data = [
            {
                id:'a',
                like: 23,
                view: 23,
                date_time : "2022-08-10"
            },
            {
                id:'b',
                like: 345,
                view: 1024,
                date_time : "2022-08-11"
            },
        ];

        await client.connect();
        await client.set('IG_DATA', JSON.stringify(saved_data), { EX: 300 });
        await client.quit();

        res.json({response_code: 200, message : 'success'});

    } catch (err) {
        return res.status(400).json({message : err});
    }
});


app.get('/getData', async function (req, res) {

    try {
        await client.connect();
            let IG_DATA = {};
        if (!(await client.get('IG_DATA'))) {
            console.log('QUERY ELASTIC');

            IG_DATA = [
                {
                    id:'ELASTIC-A',
                    like: 33,
                    view: 44,
                    date_time : "2022-08-12"
                },
                {
                    id:'ELASTIC-B',
                    like: 22,
                    view: 39,
                    date_time : "2022-08-13"
                },
            ];

            await client.quit();
            return res.status(200).json({data : IG_DATA});
        } else {
            IG_DATA = await client.get('IG_DATA');
            await client.quit();
            return res.status(200).json({data : JSON.parse(IG_DATA)});
        }
    } catch (err) {
        return res.status(400).json({message : err});
    }

});


app.listen(PORT, () => {
    console.log('Server is listening on Port:', PORT)
});
