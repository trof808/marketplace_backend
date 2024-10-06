Запуск проекта

`docker-compose -f docker-compose.dev.yml up --build`

Сгенерировать 1000 продуктов в базе

`docker-compose -f docker-compose.dev.yml exec app ts-node src/products/seed.ts`

Swagger

`http://localhost:8888/api#/`