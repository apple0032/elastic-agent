# API Middleware of the Instagram ranked feed platform

- This API agent connect with the elasticsearch Cloud, and retrieve Index documents from elasticsearch Index API by using node package 'elastic/elasticsearch'

## Set up Envenviorment
- Need cloud id & apiKey setup in .env 
- run `docker compose up -d` in the root folder
- Visit `http://localhost:3000/test` in browser for testing, successful message should be shown
- Visit `http://localhost:3000/getData?type=fresh&page=1` to get the data by using parameters : type & page