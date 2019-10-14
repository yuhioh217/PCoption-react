#!/usr/bin/python
""" api/route by python flask """
import sys
import logging
import json
import requests
import re
import hashlib
import logging_utility
from pymongo import MongoClient
from data_broker.db_keeper import DBKeeper
from flask import Flask, request, jsonify, abort, make_response
APP = Flask(__name__)
logging_utility.basicConfig(
    filename='server.log',
    format='%(levelname)-8s %(asctime)s %(name)s:%(lineno)d| %(message)s',
    level=logging.INFO,
)

with open('conf/config.json', 'r') as f:
    try:
        CONFIG = json.load(f)
    except ValueError:
        logging.info('LOAD CONFIG ERROR')
        exit()

@APP.route('/search', methods=['POST'])
def search_by_keyword():
    """ search data by keyword """
    content = request.json
    if content['keywords'] != '':
        result = DBKeeper(CONFIG['mongodb_ip'], CONFIG['mongodb_port'], CONFIG['mongodb_db'], CONFIG['mongodb_collection']).find_data_by_keyword(content['keywords'])
    else:
        result = DBKeeper(CONFIG['mongodb_ip'], CONFIG['mongodb_port'], CONFIG['mongodb_db'], CONFIG['mongodb_collection']).find_popular_data()
    return jsonify(result)

@APP.route('/add', methods=['POST'])
def add_data():
    """ add data """
    content = request.json
    DBKeeper(CONFIG['mongodb_ip'], CONFIG['mongodb_port'], CONFIG['mongodb_db'], CONFIG['mongodb_collection']).add_data(content)
    return jsonify({})

@APP.route('/delete', methods=['DELETE'])
def delete_data():
    """ delete data """
    content = request.json
    DBKeeper(CONFIG['mongodb_ip'], CONFIG['mongodb_port'], CONFIG['mongodb_db'], CONFIG['mongodb_collection']).delete_data(content['keyword'])
    return jsonify({})
    
def main():
    """ main function """
    logging.info('Server is starting')
    APP.run(host='0.0.0.0', port=58787, threaded=False)
    logging.info('Server is closing')
    sys.exit(0)

if __name__ == '__main__':
    main()

