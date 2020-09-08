# -*- coding: UTF-8 -*-
from flask import Flask, render_template
from flask_bootstrap import Bootstrap
# ...
from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired

from py2neo import Graph, Node, Relationship
import json

app = Flask(__name__)
app.config["SECRET_KEY"] = "four scores and seven years ago"

bootstrap = Bootstrap(app)

class NameForm(FlaskForm):
    name = StringField('你想查哪本书的关系网?', validators=[DataRequired()])
    submit = SubmitField('Submit')

def push_to_gData(gData, unique_nodes, cur):
    links = gData["links"]
    nodes = gData["nodes"]
    #unique_nodes = {}
    for data in cur:
        source_node = data[0]
        target_node = data[1]
        if source_node["bid"] not in unique_nodes:
            unique_nodes[source_node["bid"]] = dict(source_node)
            nodes.append({"id": source_node["name"], "book_data": dict(source_node)})
        if target_node["bid"] not in unique_nodes:
            unique_nodes[target_node["bid"]] = dict(target_node)
            nodes.append({"id": target_node["name"], "book_data": dict(target_node)})

        link_obj = {"source": source_node["name"], "target": target_node["name"]}
        links.append(link_obj)

    #gData = json.dumps({"nodes": nodes, "links": links})
    gData = {"nodes": nodes, "links": links}
    return gData, unique_nodes

@app.route('/')
def index():
    return render_template('index_with_2dfg_basic.html')

@app.route('/a', methods=['GET'])
def book_connection_query_test():
    graph = Graph('http://localhost:7474', username='neo4j', password='123')
    #cur = graph.run("MATCH (n:Book)-[:readers_like]->(m:Book) return n,m limit 200")
    cur = graph.run("MATCH (m:Book) WHERE rand()<0.50 MATCH (m)<-[:readers_like]-(p) RETURN * limit 100")

    gData = {"nodes":[],"links":[]}
    cur_data =[item for item in cur]
    gData, unique_nodes = push_to_gData(gData, {}, cur_data)

    return render_template('gData_display_test0.html',  gData=json.dumps(gData))


@app.route('/b', methods=['GET', 'POST'])
def book_connection_query_test2():
    graph = Graph('http://localhost:7474', username='neo4j', password='123')

    book_name = None
    form = NameForm()
    if form.validate_on_submit():
        book_name = form.name.data
    form.name.data = ''
    gData = {"nodes": [], "links": []}
    depth = 3

    if book_name is not None:
        blist_temp = [book_name]
        unique_nodes ={}
        for i in range(0,depth):
            query = "MATCH (n:Book)-[:readers_like]->(m:Book) where m.name in {0} return n,m limit 100".format(str(blist_temp))
            cur = graph.run(query)
            cur_data = [item for item in cur]
            gData, unique_nodes = push_to_gData(gData, unique_nodes, cur_data)
            blist_temp =[]
            for data in cur_data:
                blist_temp.append(data[0]["name"])
            pass

    return render_template('gData_display_test1.html', form=form, name=book_name, gData=json.dumps(gData))

app.add_url_rule('/', 'index', index)

if __name__ == '__main__':
    #app.run()
    app.run(debug=True)

