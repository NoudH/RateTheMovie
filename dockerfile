#FROM jimador/docker-jdk-8-maven-node:latest
#WORKDIR /maven/
#COPY . /maven/
#RUN mvn compile
#RUN mvn package
#CMD java -jar ratethemovie-0.0.1-SNAPSHOT.jar

FROM node:8
WORKDIR /node/
COPY ./src/main/webapp/WEB-INF/view/react/ /node/
ENV PATH /usr/src/app/node_modules/.bin:$PATH
RUN npm install
RUN npm run-script build

RUN apt-get update && apt-get install -y apache2
COPY ./src/main/webapp/WEB-INF/view/react/httpd.conf /usr/local/apache2/conf/httpd.conf
RUN find / -name htdocs
RUN mv -v ./build/* /usr/local/apache2/htdocs/
EXPOSE 80