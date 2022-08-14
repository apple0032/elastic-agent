# API Middleware of the Instagram ranked feed platform

- This API agent connect with the Elastic Cloud, and retrieve Index documents from elasticsearch Index API by using node package 'elastic/elasticsearch'
- Developed with Node.js and Express.js
- Apply redis service as data cache management
- Docker setup , listening in port 3000
- 9GAG Instagram data(meida,like,comments...etc) had been stored into Elastic Cloud manually
- Instagram data source is provided by Instagram Graph API

## Workflow
[Requested from ig-feed-platform] ---> [elastic-agent API] ---> [redis] ---> [Elastic Cloud]

## Set up Envenviorment
- Need cloud id & apiKey setup in .env 
- run `docker compose up -d` in the root folder
- Visit `http://localhost:3000/test` in browser for testing, successful message should be shown
- Visit `http://localhost:3000/getData?type=fresh&page=1` to get the data by using parameters : type & page

