# Dockerise Waves Configurator Front-End
Use Docker container to run Waves Configurator Front-End Angular 2.x Code

## How to launch the program

To build the docker image

```docker build -t configurator .```

To run the image in container

```docker run -d -p 4200:80 -p 3030:3030 -p 8080:8080 -p 9001:9001 configurator```

The waves configurator is launched at localhost:4200


