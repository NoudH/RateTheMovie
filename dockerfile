FROM maven:3.5.2-jdk-8
WORKDIR /maven/
COPY . /maven/
RUN mvn -Dmaven.test.skip=true package
CMD java -jar target/ratethemovie-0.0.1-SNAPSHOT.jar
EXPOSE 8080