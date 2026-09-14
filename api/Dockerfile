FROM eclipse-temurin:21-jdk AS build
WORKDIR /app

COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .
COPY src src

RUN chmod +x mvnw
RUN ./mvnw clean package -DskipTests

FROM eclipse-temurin:21-jre
WORKDIR /app

RUN addgroup --system nook && adduser --system --ingroup nook nook
COPY --from=build /app/target/*.jar app.jar

USER nook
EXPOSE 8080

ENTRYPOINT [ "java", "-jar", "app.jar" ]