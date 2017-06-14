# Dockerise Waves Configurator Front-End
Use Docker container to run Waves Configurator Front-End Angular 2.x Code

## How to launch the program
docker run --name fuseki-data -v /fuseki busybox
docker build -t configurator-front-end .
docker run -d -p 4200:80 configurator-front-end


