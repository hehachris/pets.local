# pets.local

## Build and Start Docker Container
```
docker-compose build
docker-compose up -d
```

## Initial DB
```
docker-compose run --rm api npm run db:init
docker-compose run --rm api npm run db:load
```

## Running Test Cases
```
docker-compose run --rm api npm test
```

## Real-time Pet Watch
http://localhost:8080/watch.html

## Pets Nearby
http://localhost:8080/map.html
