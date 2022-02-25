# Todo API

Restful ToDo API using fastapi. 

## Technology Stack

+ Docker
+ Python
+ FastAPI
+ Postgresql

## Environment Variables

Below all the required environment variables are listed. For local development, these variables should be put in a .env file within the project root directory.


```
ACCESS_TOKEN_EXPIRE_MINUTES=60
ACCESS_TOKEN_ALGORITHM=HS256
APP_NAME=todo
APP_HOST=localhost
APP_PORT=8000
APP_PORT=8000
POSTGRES_DB=todo
POSTGRES_HOST=localhost
POSTGRES_PASSWORD=<INSERT DB PASSWORD>
POSTGRES_PORT=5432
POSTGRES_USER=todo
SECRET_KEY=<secret key>
```

## Local Development

### Required Local Dependencies
The following packages need to be installed on your system:

+ [Python 3](https://www.python.org/downloads/)
+ [Poetry](https://python-poetry.org/docs/)
+ [Docker](https://docs.docker.com/get-docker/)
+ [Docker Compose](https://docs.docker.com/compose/)

### Install python dependencies

Within the project directory, run the following command to install all required dependencies:

```
poetry install
```


### Run docker containers

The recommended way to run this project is through using docker containers. 

**Run containers using VS Code**

+ Install [docker extension](https://code.visualstudio.com/docs/containers/overview)
+ Right click on docker-compose.local.yml and click 'Compose Up'


**Run containers via command-line**

```
docker-compose up
```

### API Documentation

To test to see if the API server is running correct visit the [API documentation](https://localhost:8000/docs) page.




