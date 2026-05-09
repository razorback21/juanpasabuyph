FROM serversideup/php:8.5-fpm-nginx

WORKDIR /var/www/html
USER root

RUN install-php-extensions gd

RUN mkdir -p storage/framework/cache \
    storage/framework/sessions \
    storage/framework/views \
    storage/framework/cache/data \
    storage/framework/tmp \
    storage/logs \
    bootstrap/cache \
    database/database \
    /tmp
RUN chown -R www-data:www-data ./

USER www-data

ENV TMPDIR=/var/www/html/storage/framework/tmp


