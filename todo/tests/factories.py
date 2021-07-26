from datetime import date
import factory
from faker import Faker
from .. import models, schemas, utils
from .common import Session


class ToDoModelFactory(factory.alchemy.SQLAlchemyModelFactory):
    class Meta:
        model = models.ToDo
        sqlalchemy_session = Session

    description = factory.Faker('job')
    priority = schemas.PriorityEnum.low
    due_date = date(2021, 6, 12)
    completed = False


class ToDoCreateFactory(factory.Factory):
    class Meta:
        model = schemas.ToDoBase
    
    description = factory.Faker('job')
    priority = schemas.PriorityEnum.low
    due_date = date(2021, 6, 12)
    completed = False


class UserCreateFactory(factory.Factory):
    class Meta:
        model = schemas.UserCreate
    
    username = factory.Faker('user_name')
    password = factory.Faker('pystr')
    first_name = factory.Faker('first_name')
    last_name = factory.Faker('last_name')


class UserModelFactory(factory.alchemy.SQLAlchemyModelFactory):
    class Meta:
        model = models.User
        sqlalchemy_session = Session

    username = factory.Faker('user_name')
    hashed_password = factory.Faker('pystr')
    first_name = factory.Faker('first_name')
    last_name = factory.Faker('last_name')

    @factory.lazy_attribute
    def hashed_password(self):
        fake = Faker()
        return utils.get_password_hash(fake.pystr())