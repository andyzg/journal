import base

class EntryModel(base.BaseModel):

    def __init__(self, user_id, content):
        super(EntryModel, self).__init__()
        self.userId = user_id
        self.content = content
        self.isLocked = 'True'
