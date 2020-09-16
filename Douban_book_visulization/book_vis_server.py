# -*- coding: UTF-8 -*-
from flask import Flask, render_template
from flask_bootstrap import Bootstrap
# ...
from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired

from py2neo import Graph, Node, Relationship
import json
import csv
import random

import argparse
from pathlib import Path
import sys
import os

app = Flask(__name__)
app.config["SECRET_KEY"] = "four scores and seven years ago"

bootstrap = Bootstrap(app)


class NameForm(FlaskForm):
    name = StringField('你想查哪本书的关系网?', validators=[DataRequired()])
    submit = SubmitField('Submit')


def push_to_gData(gData, unique_nodes, cur):
    links = gData["links"]
    nodes = gData["nodes"]
    for data in cur:
        source_node = data[0]
        target_node = data[1]
        if source_node["bid"] not in unique_nodes:
            unique_nodes[source_node["bid"]] = dict(source_node)
            nodes.append({"id": source_node["bid"], "book_data": dict(source_node)})
        if target_node["bid"] not in unique_nodes:
            unique_nodes[target_node["bid"]] = dict(target_node)
            nodes.append({"id": target_node["bid"], "book_data": dict(target_node)})

        link_obj = {"source": source_node["bid"], "target": target_node["bid"]}
        links.append(link_obj)

    gData = {"nodes": nodes, "links": links}
    return gData, unique_nodes


def load_csv_to_gdata(gData, unique_nodes, limits=100, p_load=0.5):
    links = gData["links"]
    nodes = gData["nodes"]

    #path1 = os.path.dirname(os.getcwd())
    #path1 = sys.path[0]
    path1 = Path(__file__).parent.parent
    data_folder = os.path.join(path1, "csv_data")
    book_data_file = "book_data.csv"
    book_rel_file = "book_rel.csv"

    book_data_props = ["name", "authors", "rating", "publisher", "ISBN", "pages", "pub_year", "pub_mon",
                       "collections", "book_tags", "bid"]
    #book_rel_props = ["book_name", "book_id", "ref_name", "ref_id"]

    f1_path = os.path.join(data_folder, book_data_file)
    csv_file1 = open(f1_path, "r", newline='', encoding="utf-8-sig")
    csvreader = csv.reader(csv_file1)
    for i, row_data in enumerate(csvreader):
        if i >= 1:
            bid = row_data[10]
            if (bid not in unique_nodes) and (len(unique_nodes)<=limits) and (random.uniform(0,1)<p_load):
                temp_data_dict = dict()
                for j in range(0, len(book_data_props)):
                    temp_data_dict[book_data_props[j]] = row_data[j]
                unique_nodes[bid] = temp_data_dict
                nodes.append({"id": temp_data_dict["bid"], "book_data": temp_data_dict})
    csv_file1.close()

    f2_path = os.path.join(data_folder, book_rel_file)
    csv_file2 = open(f2_path, "r", newline='', encoding="utf-8-sig")
    csvreader = csv.reader(csv_file2)
    for i, row_data in enumerate(csvreader):
        if i >= 1:
            if (row_data[1] in unique_nodes) and (row_data[3] in unique_nodes) and (random.uniform(0,1)<p_load):
                link_obj = {"source": row_data[1], "target": row_data[3]}
                links.append(link_obj)
    csv_file2.close()

    gData = {"nodes": nodes, "links": links}
    return gData, unique_nodes

@app.route('/')
def index():
    return render_template('index_with_2dfg_basic.html')


@app.route('/a', methods=['GET'])
def book_connection_query_test():
    if app.config["use_db"]:
        graph = Graph('http://localhost:7474', username='neo4j', password='123')
        cur = graph.run("MATCH (m:Book) WHERE rand()<0.50 MATCH (m)<-[:readers_like]-(p) RETURN * limit 100")

        gData = {"nodes": [], "links": []}
        cur_data = [item for item in cur]
        gData, unique_nodes = push_to_gData(gData, {}, cur_data)
    else:
        gData = {"nodes": [], "links": []}
        gData, unique_nodes = load_csv_to_gdata(gData, {})
    return render_template('gData_display_test0.html', gData=json.dumps(gData))


@app.route('/b', methods=['GET', 'POST'])
def book_connection_query_test2():
    if app.config["use_db"]:
        graph = Graph('http://localhost:7474', username='neo4j', password='123')

    book_name = None
    form = NameForm()
    if form.validate_on_submit():
        book_name = form.name.data
    form.name.data = ''
    gData = {"nodes": [], "links": []}
    depth = 3

    if book_name is not None:
        if app.config["use_db"]:
            blist_temp = [book_name]
            unique_nodes = {}
            for i in range(0, depth):
                query = "MATCH (n:Book)-[:readers_like]->(m:Book) where m.name in {0} return n,m limit 100".format(
                    str(blist_temp))
                cur = graph.run(query)
                cur_data = [item for item in cur]
                gData, unique_nodes = push_to_gData(gData, unique_nodes, cur_data)
                blist_temp = []
                for data in cur_data:
                    blist_temp.append(data[0]["name"])
        else:
            book_name = 'NSP'

    return render_template('gData_display_test1.html', form=form, name=book_name, gData=json.dumps(gData))


app.add_url_rule('/', 'index', index)

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('-csv', '--csv', action="store_true", default=False, help='use csv file instead of database')
    args = parser.parse_args()

    if args.csv:
        app.config["use_db"] = False
    else:
        app.config["use_db"] = True
    app.run(debug=True)
