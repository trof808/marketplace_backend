# Запуск проекта

Скопировать .env.copy в .env.dev и заполнить переменные окружения значениями

`cp .env.copy .env.dev`

Для запуска проекта используйте следующую команду:

`docker-compose -f docker-compose.dev.yml up --build`

## Сгенерировать продукты в базе

Для генерации продуктов в базе данных используйте команду:

`docker-compose -f docker-compose.dev.yml exec app ts-node src/products/seed.ts <count> [--clear]`

### Параметры:
- `<count>` - число продуктов (по умолчанию 1000)
- `--clear` - флаг очистки значений в базе

### Пример:
`docker-compose -f docker-compose.dev.yml exec app ts-node src/products/seed.ts 500 --clear`

## Swagger

Документация API доступна по следующему адресу:

[http://localhost:8888/api#/](http://localhost:8888/api#/)