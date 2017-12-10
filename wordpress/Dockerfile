FROM wordpress:4-php7.1-fpm

RUN apt-get -y update
RUN apt-get -y install less

RUN curl -sLO 'https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar' \
  && chmod +x wp-cli.phar \
  && mv wp-cli.phar /usr/bin/wp \
  && echo "alias wp='wp --allow-root'" >> ~/.bashrc
