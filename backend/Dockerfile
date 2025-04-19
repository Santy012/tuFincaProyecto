LABEL maintainer="camimillan2003@gmail.com"
LABEL version="1.0"
LABEL description="Sistema de gestión inmobiliaria"

# Build stage
FROM maven:3.8.6-jdk-11 AS build
WORKDIR /app
COPY backend/tuFinca/pom.xml .
RUN mvn dependency:go-offline
COPY backend/tuFinca/src ./src
COPY backend/tuFinca/uploads ./uploads
RUN mvn package -DskipTests

# Runtime stage
FROM openjdk:11-jre-slim
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
COPY backend/tuFinca/uploads /app/uploads

ENV SPRING_PROFILES_ACTIVE=prod
EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]