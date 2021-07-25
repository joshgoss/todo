import factory
from faker import Faker
from .. import models, schemas, utils
from .common import Session

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
        sqlalchemy_get_or_create = ('username',)

    username = factory.Faker('user_name')
    hashed_password = factory.Faker('pystr')
    first_name = factory.Faker('first_name')
    last_name = factory.Faker('last_name')

    @factory.lazy_attribute
    def hashed_password(self):
        fake = Faker()
        return utils.get_password_hash(fake.pystr())