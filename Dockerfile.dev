FROM python:3.9-slim-buster

# Keeps Python from generating .pyc files in the container
ENV PYTHONDONTWRITEBYTECODE=1

# Turns off buffering for easier container logging
ENV PYTHONUNBUFFERED=1

RUN apt-get update \
    && apt-get install --no-install-recommends -y \
        curl \
        build-essential \ 
        libpq-dev

WORKDIR /app
RUN curl -sSL https://raw.githubusercontent.com/sdispater/poetry/master/get-poetry.py | python

COPY poetry.lock pyproject.toml alembic.ini /app/
ENV PATH="${PATH}:/root/.poetry/bin"

RUN poetry install --no-dev

ENTRYPOINT ["poetry", "run", "uvicorn", "todo.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]