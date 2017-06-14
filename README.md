# Dockerise Waves Configurator
Use Docker container to run Waves Configurator.

The configurator contains 3 parts. 
* Front-end using Angular 2.x.
* Back-end using Jersey and served at Apache Tomcat
* Triple store is Apache Jena where the configuration is saved

## How to launch the program

To build the docker image

```docker build -t configurator .```

To run the image in container

```docker run -d -p 4200:80 -p 3030:3030 -p 8080:8080 -p 9001:9001 configurator```

The waves configurator is launched at [localhost:4200](http://localhost:4200)


