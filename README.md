# Запуск проекта локально

Скопировать .env.copy в .env.dev и заполнить переменные окружения значениями
`cp .env.copy .env.dev`

Для запуска проекта используйте следующую команду:
`docker-compose -f docker-compose.dev.yml up --build`

Для генерации продуктов в базе данных используйте команду:
`docker-compose -f docker-compose.dev.yml exec app ts-node src/products/seed.ts <count> [--clear]`

Параметры:
- `<count>` - число продуктов (по умолчанию 1000)
- `--clear` - флаг очистки значений в базе

Пример:
`docker-compose -f docker-compose.dev.yml exec app ts-node src/products/seed.ts 500 --clear`

Документация API доступна по следующему адресу:
[http://localhost:8888/api#/](http://localhost:8888/api#/)

## Запуск production сборки на сервере руками

1. Зайти на сервер по ssh
`ssh username@ip`

2. Склонировать репозиторий

3. Создать файл .env.stage в корне и заполнить переменными окружения

4. Запустить сборку контейнера
`docker-compose -f docker-compose.dev.yml up -d --build`

5. Сконфигурировать nginx

Открыть файл nginx.conf. Обычно он где-то в /etc/nginx/nginx.conf. Можно найти командой
`which nginx`

Добавить конфигурацию чтобы для http 80 port по пути /api запросы проксировались на запущенный внутри сервис бэкенда localhost:8888

```sh
http {

    upstream backend {
        server localhost:8888;  # Service name and port of the first instance
    }

    server {
        listen 80;

        location /api {
            proxy_pass http://backend;  # Forward requests to the upstream group
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
        }
    }
}
```

Перезапустить nginx