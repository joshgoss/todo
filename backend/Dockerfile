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
RUN curl -sSL https://install.python-poetry.org | python -

COPY poetry.lock pyproject.toml alembic.ini entrypoint.sh  /app/
COPY todo/ /app/todo
COPY alembic/ /app/alembic
ENV PATH="${PATH}:/root/.local/bin"

RUN poetry install --no-dev
RUN chmod +x ./entrypoint.sh
ENTRYPOINT ["./entrypoint.sh"]
CMD ["poetry", "run", "uvicorn", "todo.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]