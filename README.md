# API Middleware of the Instagram ranked feed platform

- This API agent connect with the Elastic Cloud, and retrieve Index documents from elasticsearch Index API by using node package 'elastic/elasticsearch'
- Developed with Node.JS and express.js
- Apply redis service as data cache management
- docker setup , listening in port 3000
- 9GAG Instagram data(meida,like,comments...etc) had been stored into Elastic Cloud manually
- Instagram data source is provided by Instagram Graph API

## Set up Envenviorment
- Need cloud id & apiKey setup in .env 
- run `docker compose up -d` in the root folder
- Visit `http://localhost:3000/test` in browser for testing, successful message should be shown
- Visit `http://localhost:3000/getData?type=fresh&page=1` to get the data by using parameters : type & page

