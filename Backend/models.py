# Imports
import mongoengine as me
from config import db
import datetime

# User model
class User(me.Document):
    email = me.EmailField(unique=True, required=True)
    password = me.StringField(required=True)
    user_name = me.StringField(reqired=True)
    first_name = me.StringField(required=True)
    last_name = me.StringField(required=True)
    settings = me.DictField(default={})
    profile_picture = me.StringField()
    created_at = me.DateTimeField()
    updated_at = me.DateTimeField()
    total_xp = me.IntField(default=0)
    current_trip = me.IntField(default=0)
    completed_quests = me.StringField(default="")
    active_quests = me.StringField(default="")


    def to_json(self):
        return {
            "id": str(self.id),
            "email": self.email,
            "password": self.password,
            "user_name": self.user_name,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "settings": self.settings,
            "profile_picture": self.profile_picture,
            "total_xp": self.total_xp,
            "current_trip": self.current_trip,
            "completed_quests": self.completed_quests,
            "active_quests": self.active_quests,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None
        }

    meta = {
        "collection": "users"
    }

class Quest(me.Document):
    name = me.StringField(required=True)
    description = me.StringField(required=True)
    landmark = me.StringField(reqired=True)
    reward = me.IntField(required=True)


    def to_json(self):
        return {
            "id": str(self.id),
            "name": self.name,
            "description": self.description,
            "landmark": self.landmark,
            "reward": self.reward,
        }

    meta = {
        "collection": "quests"
    }