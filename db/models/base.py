import json
import time

class BaseModel(object):

    def __init__(self):
        self.timestamp = int(time.time())
