FROM composer:2 AS composer-builder
WORKDIR /app

COPY composer.json composer.lock ./
RUN composer install --no-dev --prefer-dist --no-interaction --optimize-autoloader --no-scripts --ignore-platform-req=ext-exif --ignore-platform-req=ext-gd --ignore-platform-req=ext-pcntl

COPY . .

FROM node:22-alpine AS node-builder
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build


FROM serversideup/php:8.5-fpm-nginx

WORKDIR /var/www/html
# Copy PHP application (including vendor)
COPY --from=composer-builder /app ./
# Copy built frontend assets
COPY --from=node-builder /app/public ./public
USER root
RUN install-php-extensions gd
#WORKDIR /
#COPY /.nginx/nginx_livewire.conf /etc/nginx/conf.d/custom.conf


# Set the correct permissions for the web server
RUN mkdir -p /var/www/html/database/database
RUN chown -R www-data:www-data .



USER www-data


