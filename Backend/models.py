# Imports
import mongoengine as me
from config import db
import datetime

# User model
class User(me.Document):
    email = me.EmailField(unique=True, required=True)
    password = me.StringField(required=True)
    user_name = me.StringField(required=True)
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
    group_id = me.StringField()
    profileId = me.StringField()


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
            "group_id": self.group_id,
            "profileId": self.profileId,
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
    address = me.StringField(required=True)

    def to_json(self):
        return {
            "id": str(self.id),
            "name": self.name,
            "description": self.description,
            "landmark": self.landmark,
            "reward": self.reward,
            "address": self.address,
        }

    meta = {
        "collection": "quests"
    }

class Group(me.Document):
    start_location = me.StringField(required=True)
    end_location = me.StringField(required=True)
    current_location = me.StringField()
    users = me.ListField() 
    completed_quests = me.ListField(me.StringField())  
    active_quests = me.ListField(me.StringField())

    def to_json(self):
        return {
            "id": str(self.id),
            "start_location": self.start_location,
            "end_location": self.end_location,
            "current_location": self.current_location,
            "users": self.users,
            "completed_quests": self.completed_quests,
            "active_quests": self.active_quests,
        }

    meta = {
        "collection": "groups"
    }