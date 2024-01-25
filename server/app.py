from flask import Flask,jsonify
from flask_migrate import Migrate
from models import *

# Create a Flask application
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False



migrate = Migrate(app, db)

db.init_app(app)

# Define a route
@app.route('/')
def index():
    return 'Hello, World!'

#Gets all
@app.route('/county/<int:id>')
def countyDetails(id):
    # Get the county with the given id
    county = County.query.get(id)
    if county is None:
        return "County not found"
    data=county.serialize()
    return data

#Gets wards in that subcounty
@app.route('/county/<int:cid>/subcounty/<int:sid>')
def getSubCountyWards(cid, sid):
    subcounty = Subcounty.query.filter_by(county_id=cid).filter_by(id=sid).first()
    if subcounty is None:
        return "Sub-County Not Found", 404
    else:
        data = subcounty.subWard()
        return data

@app.route('/county/<int:id>/subcounty')        
def getSubCounties(id):
    county = County.query.get(id)
    if county is None:
      return "County not found"
    data=county.couSub()
    return data


# Run the application
if __name__ == '__main__':
   app.run(debug=True)