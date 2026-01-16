FROM eclipse-temurin:17-jdk-alpine AS build
WORKDIR /workspace/app
COPY pom.xml .
COPY src src
RUN apk add --no-cache maven
RUN mvn clean package -DskipTests

FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY --from=build /workspace/app/target/*.jar app.jar

HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:8084/actuator/health || exit 1

EXPOSE 8084
ENTRYPOINT ["java", "-jar", "app.jar"]
