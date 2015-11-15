from .base import BaseModel

class EntryModel(BaseModel):

    def __init__(self, user_id, content, date):
        self.user_id = user_id
        self.content = content
        self.date = date
