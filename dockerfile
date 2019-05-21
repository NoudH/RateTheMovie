FROM maven:3.5.2-jdk-8
WORKDIR /docker/
COPY . /docker/
RUN mvn compile
RUN mvn package
CMD java -jar ratethemovie-0.0.1-SNAPSHOT.jar
EXPOSE 8080