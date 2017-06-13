FROM phusion/baseimage

MAINTAINER yufan.zheng@atos.com

# Image to dockerise Tomcat, Angular, Angular Cli
ENV TOMCAT_VERSION 9.0.0
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

COPY resources/front-end .

RUN npm install \
  && ng build \
  && rm -rf /usr/share/nginx/html/* \
  && mv ./dist/* /usr/share/nginx/html/ \
  && npm cache clean \
  && rm -rf ./*

CMD ["nginx", "-g", "daemon off;"]
