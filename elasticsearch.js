console.log("API Triggered");
require('dotenv').config()

const { Client } = require('@elastic/elasticsearch')

const client = new Client({
    cloud: { id: process.env.CLOUD_ID },
    auth: { apiKey: process.env.API_KEY }
})

async function run() {
    const response = await client.info()
    console.log(response)

    //Create & refresh API

    // await client.index({
    //     index: 'test-index',
    //     document: {
    //         character: '9GAG5',
    //         quote: '9gag5 is website',
    //         hot : 50,
    //         date : "2015-01-01"
    //     }
    // })
    // await client.indices.refresh({ index: 'test-index' })

    //Delete API
    // await client.deleteByQuery({
    //     index: 'test-index',
    //     "query": {
    //         "match": {
    //             "_id": "2-YIhIIBhjPGh1s5VMpJ"
    //         }
    //     }
    // });

    //Update API
    await client.updateByQuery({
        index: 'test-index',
        "query": {
            "match": {
                "_id": "2-YIhIIBhjPGh1s5VMpJ"
            }
        }
    });

    // Search API
    const result= await client.search({
        index: 'test-index',
        "sort" : [
            { "hot" : "desc" }
        ],
        query: {
            match: { quote: 'website' }
        }
    });

    console.log(result.hits.hits)
}

run().catch(err =>{
    console.log(err)
    process.exit(1)
})
