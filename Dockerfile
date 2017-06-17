FROM phusion/baseimage

MAINTAINER yufan.zheng@atos.com

#############################################################################
# Front-end angular 2.x served by nginx
#############################################################################

# Angular Cli require Version of NodeJS 6.9.0 + 
ENV NODEJS_VERSION 7.x
ENV ANGULAR_CLI_VERSION 1.0.0-beta.28.3

# Install NodeJS and npm
RUN curl -sL https://deb.nodesource.com/setup_$NODEJS_VERSION | bash - && \
    apt-get install python-software-properties python g++ make -y && \
    add-apt-repository -y -r ppa:chris-lea/node.js && \
    rm -f /etc/apt/sources.list.d/chris-lea-node_js-*.list && \
    apt-get update && \
    apt-get install nodejs -y

# Install Angular Cli
RUN npm install -g @angular/cli

# Install nginx
RUN apt-get update && \
    apt-get install nginx -y

# Configure nginx
RUN rm /etc/nginx/sites-available/default && rm -rf /etc/nginx/conf.d/*
COPY nginx/nginx.config /etc/nginx/sites-available/default
COPY nginx/default.conf /etc/nginx/conf.d/
RUN service nginx restart

# Configure work path
ENV APP_PATH /app
ENV PATH $APP_PATH/node_modules/@angular/cli/bin/:$PATH

# Switch to work path
RUN mkdir $APP_PATH
WORKDIR $APP_PATH

# Upload front-end code
COPY ./resources/front-end .

# Download angular nodejs dependencies and build program
RUN npm install \
  && ng build

# Run front-end with nginx  
RUN rm -rf /usr/share/nginx/html/* \
  && mv ./dist/* /usr/share/nginx/html/ \
  && npm cache clean \
  && rm -rf ./*

# Forwarding ports for Angular
EXPOSE 4200

#############################################################################
# Back-end J2EE Jersey RESTful served at Tomcat
#############################################################################

# Image to dockerise Tomcat
ENV TOMCAT_VERSION 9.0.0.M17

# Upgrade Java to last version
RUN add-apt-repository ppa:webupd8team/java -y  && \
    apt-get update && \
    echo oracle-java8-installer shared/accepted-oracle-license-v1-1 select true | debconf-set-selections && \
    apt-get --allow-unauthenticated install -y  oracle-java8-installer && \
    apt-get clean

# Download and install tomcat 
RUN wget -P /tmp https://archive.apache.org/dist/tomcat/tomcat-9/v9.0.0.M17/bin//apache-tomcat-9.0.0.M17.tar.gz && \
    tar xfz /tmp/apache-tomcat-9.0.0.M17.tar.gz -C /opt && \
    rm /tmp/apache-tomcat-9.0.0.M17.tar.gz

# Add waves-configurator webapp in Tomcat folder and zone file
ADD /resources/back-end/waves-configurator.war /opt/apache-tomcat-9.0.0.M17/webapps/
ADD /resources/back-end/libs/* /opt/apache-tomcat-9.0.0.M17/libs/

# Forwarding ports for Tomcat
EXPOSE 8080

#############################################################################
# TriG Configuration saved at Jena Triple Store
#############################################################################

# Image to dockerise Jena Triple Store
ENV JENA_FUSEKI_VERSION 2.6.0

# Download and install tomcat 
RUN wget -P /tmp http://mirrors.standaloneinstaller.com/apache/jena/binaries/apache-jena-fuseki-$JENA_FUSEKI_VERSION.tar.gz && \
    tar xfz /tmp/apache-jena-fuseki-$JENA_FUSEKI_VERSION.tar.gz -C /opt && \
    rm /tmp/apache-jena-fuseki-$JENA_FUSEKI_VERSION.tar.gz && \
    mv /opt/apache-jena-fuseki-$JENA_FUSEKI_VERSION /opt/apache-jena-fuseki

# Config the volume for data
VOLUME /fuseki

# Forwarding ports for Jena Fuseki
EXPOSE 3030

#############################################################################
# Supervisor
#############################################################################

# Install useful tools and Supervisord
RUN apt-get update && \
    apt-get install -y wget supervisor vim software-properties-common net-tools && \
    add-apt-repository main && \
    rm -rf /var/lib/apt/lists/* && \
    apt-get clean

# Configure Supervisor to display web interface
RUN rm /etc/supervisor/supervisord.conf
ADD supervisor/supervisord.conf /etc/supervisor/

# Put angular, tomcat under Supervisor for automatic launch and control
ADD supervisor/tomcat.conf /etc/supervisor/conf.d
ADD supervisor/jena-fuseki.conf /etc/supervisor/conf.d
ADD supervisor/angular.conf /etc/supervisor/conf.d

# Forwarding ports for supervisor
EXPOSE 9001

#############################################################################
# Launch all services and supervised by supervisord
#############################################################################

# Launch parameters
CMD ["/usr/bin/supervisord", "-n"]