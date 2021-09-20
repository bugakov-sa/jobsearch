FROM openjdk:16-alpine3.13
WORKDIR /app
COPY /build/libs/jobsearch-1.0.jar /
COPY /config/application.properties /
COPY /config/application-prod.properties /
COPY /src-web/dist web-dist/
EXPOSE 8080
ENTRYPOINT java -jar /jobsearch-1.0.jar --spring.resources.static-locations=file:web-dist --spring.config.location=file:/ --spring.profiles.active=prod