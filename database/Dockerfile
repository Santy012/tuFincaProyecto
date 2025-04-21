FROM mysql:8.0 

LABEL maintainer="camimillan2003@gmail.com"

ENV MYSQL_ROOT_PASSWORD=${DB_ROOT_PASSWORD} \
    MYSQL_DATABASE=tuFinca \
    MYSQL_USER=${DB_USER} \
    MYSQL_PASSWORD=${DB_PASSWORD}

COPY ./tuFinca.sql /docker-entrypoint-initdb.d/
RUN chown -R mysql:mysql /docker-entrypoint-initdb.d/

HEALTHCHECK --interval=30s --timeout=10s \
  CMD mysqladmin ping -u root -p${MYSQL_ROOT_PASSWORD} || exit 1