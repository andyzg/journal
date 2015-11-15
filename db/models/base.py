
class BaseModel(object):

    def json(self):
        return json.dumps(self, default=lambda x: x.__dict__)
