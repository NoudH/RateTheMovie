FROM maven:3.5.2-jdk-8
WORKDIR /maven/
COPY . /maven/
RUN mvn compile
RUN mvn package
CMD java -jar ratethemovie-0.0.1-SNAPSHOT.jar

FROM node:8
WORKDIR /node/
COPY ./src/main/webapp/WEB-INF/view/react/ /node/
ENV PATH /usr/src/app/node_modules/.bin:$PATH
RUN npm install
CMD npm run-script build

FROM httpd:2.4
COPY ./src/main/webapp/WEB-INF/view/react/httpd.conf /usr/local/apache2/conf/httpd.conf
COPY ./src/main/webapp/WEB-INF/view/react/build/ /usr/local/apache2/htdocs/
EXPOSE 80