from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from .. import crud, dependencies, models, schemas

router = APIRouter(
    prefix="/todos",
    tags=["todos"],
    dependencies=[]
)

def get_path_todo(id: int, db: Session = Depends(dependencies.get_db), current_user: models.User = Depends(dependencies.get_current_user)):
    todo = crud.get_todo(db, id)

    if not todo:
        raise HTTPException(404, details="Resource not found")

    if todo.user_id != current_user.id:
        raise HTTPException(401, details="Not authorized for this action")

    return todo

@router.post("/", status_code=201, response_model=schemas.ToDo)
def create_todo(data: schemas.ToDoBase, current_user: models.User = Depends(dependencies.get_current_user), db: Session = Depends(dependencies.get_db)):
    todo = crud.create_todo(db, {**data.__dict__, 'user_id': current_user.id})
    return todo

@router.get("/", response_model=List[schemas.ToDo])
def get_todo(db: Session = Depends(dependencies.get_db), current_user: models.User = Depends(dependencies.get_current_user)):
    return crud.get_user_todos(db, current_user.id)

@router.get("/{id}", response_model=schemas.ToDo)
def get_todo(id, todo: models.ToDo = Depends(get_path_todo)):
    return todo