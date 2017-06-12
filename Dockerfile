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

# Install useful tools and Supervisord
RUN apt-get update && \
    apt-get install -y wget supervisor vim software-properties-common net-tools && \
    add-apt-repository main && \
    rm -rf /var/lib/apt/lists/* && \
    apt-get clean

# Configure Supervisor to display web interface
RUN rm /etc/supervisor/supervisord.conf
ADD supervisor/supervisord.conf /etc/supervisor/
ADD supervisor/angularcli.conf /etc/supervisor/conf.d

# Directory where the front-end code is located
ENV FRONT_END_DIR = /opt/front-end

# Add front-end source code
ADD resources/front-end $FRONT_END_DIR

# Set working directory
WORKDIR $FRONT_END_DIR

# Download Node dependencies
RUN npm install

# Forwarding ports for Angular
EXPOSE 4200 9001

# Start Angular 2.x
CMD ["supervisord", "-n"]
