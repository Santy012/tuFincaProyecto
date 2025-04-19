LABEL maintainer="camimillan2003@gmail.com"
LABEL version="1.0"
LABEL description="Sistema de gestión inmobiliaria"

FROM mysql:8.0
COPY database/fincaFinal.sql /docker-entrypoint-initdb.d/
EXPOSE 3306