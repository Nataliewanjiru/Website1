from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.ext.declarative import declarative_base
from flask_sqlalchemy import SQLAlchemy


Base = declarative_base()
metadata = Base.metadata


db = SQLAlchemy(metadata=metadata)

class Location(db.Model):
    __tablename__ = 'locations'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    ward_id = db.Column(db.Integer, db.ForeignKey('wards.id'), nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
        }
    
    def identity(self):
          return{
             "id": self.id,
             "name": self.name, 
          }
    

class Ward(db.Model):
    __tablename__ = 'wards'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)

    subcounty_id = db.Column(db.Integer, db.ForeignKey('subcounties.id'), nullable=False)
    locations = db.relationship('Location', backref='ward', lazy=True)

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "locations": [loc.serialize() for loc in self.locations],
        }
    
    def identity(self):
        return{
           "id": self.id,
           "name": self.name, 
        }
    
    def swarLoc(self):
     return {
       "id": self.id,
       "name": self.name,
       "locations": [loc.identity() for loc in self.locations],
        }

class Subcounty(db.Model):
    __tablename__ = 'subcounties'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    county_id = db.Column(db.Integer, db.ForeignKey('counties.id'), nullable=False)
    wards = db.relationship('Ward', backref='subcounty', lazy=True)

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "wards": [ward.serialize() for ward in self.wards],
        }
    
    def identity(self):
       return{
          "id": self.id,
          "name": self.name, 
       }

    def subWard(self):
        return {
          "id": self.id,
          "name": self.name,
          "wards": [ward.identity() for ward in self.wards],
           }

class County(db.Model):
    __tablename__ = 'counties'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    
    subcounties = db.relationship('Subcounty', backref='county', lazy=True)

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "subcounties": [subcounty.serialize() for subcounty in self.subcounties],
        }
    
    def couSub(self):
     return {
       "id": self.id,
       "name": self.name,
       "subCounties": [sub.identity() for sub in self.subcounties],
        }
    