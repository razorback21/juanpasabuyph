#!/bin/sh
mkdir -p /var/www/html/database/database
chown -R www-data:www-data /var/www/html/database/database
chown -R www-data:www-data /var/www/html/bootstrap/cache
chown -R www-data:www-data /var/www/html/storage
chown -R www-data:www-data /var/www/html/vendor
