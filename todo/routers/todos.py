from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from .. import crud, dependencies, models, schemas

router = APIRouter(
    prefix="/todos",
    tags=["todos"],
    dependencies=[]
)

@router.post("/", status_code=201, response_model=schemas.ToDo)
def create_todo(data: schemas.ToDoBase, current_user: models.User = Depends(dependencies.get_current_user), db: Session = Depends(dependencies.get_db)):
    print("BEFORE SAVING: \n\n")
    todo = crud.create_todo(db, {**data.__dict__, 'user_id': current_user.id})
    print('\n\nAFTER SAVING: todo is: ', todo)
    return todo