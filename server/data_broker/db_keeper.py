from pymongo import MongoClient
import json

class DBKeeper():
    def __init__(self, mongodb_ip, mongodb_port, mongodb_db, mongodb_col):
        self.db_name = mongodb_db
        self.db_col =  mongodb_col
        self.client = MongoClient(mongodb_ip, mongodb_port)
        self.db = self.client[self.db_name]
        self.col = self.db[self.db_col]

    def find_data_by_keyword(self, keywords):
        res = self.col.find({"key_word":{ "$regex" : keywords}})
        temp_list = []
        for doc in res:
           del doc['_id']
           temp_list.append(doc)

        return temp_list

    def find_popular_data(self):
        res = self.col.find({})
        temp_list = []
        for doc in res:
           del doc['_id']
           temp_list.append(doc)
        return temp_list

    def add_data(self, data):
        self.col.insert(data)

    def delete_data(self, keyword_target):
        self.col.remove({"keyword" : {"$elemMatch": { "$in" : [keyword_target]}}})
