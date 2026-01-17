FROM openjdk:17-jdk-slim

WORKDIR /app

COPY target/consultant-service-1.0.0.jar consultant-service.jar

EXPOSE 8089

ENTRYPOINT ["java", "-jar", "consultant-service.jar"]
