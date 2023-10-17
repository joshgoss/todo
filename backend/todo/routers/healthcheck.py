from fastapi import APIRouter
from ..schemas import Message

router = APIRouter(
    prefix="/healthcheck",
    tags=["healthcheck"],
    dependencies=[]
)

@router.get('/', response_model=Message)
async def healthcheck():
    return {"message": "Success"}