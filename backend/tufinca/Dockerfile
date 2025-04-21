# Build stage
FROM eclipse-temurin:21-jdk AS build

LABEL maintainer="camimillan2003@gmail.com"
LABEL version="1.0"
LABEL description="Sistema de gestión inmobiliaria"
WORKDIR /app
COPY .mvn/ .mvn
COPY mvnw pom.xml ./
RUN ./mvnw dependency:go-offline -B
COPY src ./src
RUN ./mvnw package -DskipTests

# Runtime stage
FROM eclipse-temurin:21-jre-jammy
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
COPY ./uploads /app/uploads

ENV SPRING_PROFILES_ACTIVE=prod
EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]