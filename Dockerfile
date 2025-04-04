
FROM openjdk:17-jdk-slim


WORKDIR /app


COPY target/hotel-0.0.1-SNAPSHOT.jar /app/hotel-0.0.1-SNAPSHOT.jar


EXPOSE 8080


ENTRYPOINT ["java", "-jar", "/app/mon-application.jar"]
