# pets.local

## Build and Start Docker Container
```
docker-compose build
docker-compose up -d
```

## Initial DB Schema
```
docker-compose run --rm api npm run db:init
```

## Load Data Fixtures
```
docker-compose run --rm api npm run db:load
```
