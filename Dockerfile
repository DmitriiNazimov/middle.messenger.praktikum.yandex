FROM node:16

WORKDIR /var/www

COPY . /var/www/

RUN mkdir -p /var/www \
  && cd /var/www \
  && npm install \
  && npm i -D imagemin-pngquant@8.0.0 \
  && npm run build \
  && rm -rf src

EXPOSE 3000

CMD node server.js
