#!/bin/sh
poetry run alembic upgrade head
poetry run uvicorn todo.main:app --host 0.0.0.0 --port 8000 --reload