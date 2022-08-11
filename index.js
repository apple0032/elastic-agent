import express from "express";
import 'dotenv/config';
const PORT = process.env.PORT || 3000;
import * as fs from 'fs';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors())

import { createClient } from "redis";

const client = createClient({
    url: process.env.REDIS_URL
});

import 'dotenv/config'
import {Client as elasticClient} from '@elastic/elasticsearch';

const eleClient = new elasticClient({
    cloud: { id: process.env.CLOUD_ID },
    auth: { apiKey: process.env.API_KEY }
})

app.get('/test', async function (req, res) {
    try {
        return res.status(200).json({message : 'test successful'});
    } catch (err) {
        return res.status(400).json({message : err});
    }
});

app.get('/setData', async function (req, res) {

    try {

        const response = await eleClient.info();
        const dummyJson = JSON.parse(fs.readFileSync('./dummy.json'));

        for (const data of dummyJson) {
            console.log(data.media);
            await eleClient.index({
                index: 'ig-data-cloud',
                document: {
                    id: data.id,
                    media: data.media,
                    like : data.like,
                    date : data.date
                }
            });

            await eleClient.indices.refresh({ index: 'ig-data-cloud' });
        }

        res.json({response_code: 200, message : 'success'});

    } catch (err) {
        return res.status(400).json({message : err});
    }
});


app.get('/getData', async function (req, res) {

    try {
        await client.connect();
        let IG_DATA = {};

        let sortName = "byLike";
        let sortBy = { "like" : "desc" };
        if( req.query.type === "fresh" ){
            sortName = "byDate"
            sortBy = { "date" : "desc" }
        }
        //console.log(sortBy);

        let page = 0;
        if(typeof req.query.page !== 'undefined'){
            page = (req.query.page - 1) * 10;
        }
        //console.log(page);

        let redisKey = 'IG_DATA_'+ sortName + "_" + req.query.page;
        //console.log(redisKey);

        if (!(await client.get(redisKey))) {
            console.log('QUERY ELASTIC CLOUD');

            const result= await eleClient.search({
                index: 'ig-data-cloud',
                "sort" : [
                    sortBy
                ],
                "from": page
            });

            IG_DATA = result.hits.hits;

            await client.set(redisKey, JSON.stringify(IG_DATA), { EX: 300 });

            await client.quit();
            return res.status(200).json({data : IG_DATA});
        } else {
            IG_DATA = await client.get(redisKey);
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
