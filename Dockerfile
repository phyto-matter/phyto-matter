FROM nginx
LABEL authors="Devilie AB"

COPY ./build /usr/share/nginx/html
