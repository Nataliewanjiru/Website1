from app import app
from models import *
datas=[{
  "name": 'Baringo',
  "ward_id": 1
}, {
  "name": 'Bomet',
  "ward_id": 2
}, {
  "name": 'Bungoma',
  "ward_id": 3
}, {
  "name": 'Busia',
  "ward_id": 4
}, {
  "name": 'Elgeyo-Marakwet',
  "ward_id": 5
}, {
  "name": 'Embu',
  "ward_id": 6
}, {
  "name": 'Garissa',
  "ward_id": 7
}, {
  "name": 'Homa Bay',
  "ward_id": 8
}, {
  "name": 'Isiolo',
  "ward_id": 9
}, {
  "name": 'Kajiado',
  "ward_id": 10
}, {
  "name": 'Kakamega',
  "ward_id": 11
}, {
  "name": 'Kericho',
  "ward_id": 12
}, {
  "name": 'Kiambu',
  "ward_id": 13
}, {
  "name": 'Kilifi',
  "ward_id": 14
}, {
  "name": 'Kirinyaga',
  "ward_id": 15
}, {
  "name": 'Kisii',
  "ward_id": 16
}, {
  "name": 'Kisumu',
  "ward_id": 17
}, {
  "name": 'Kitui',
  "ward_id": 18
}, {
  "name": 'Kwale',
  "ward_id": 19
}, {
  "name": 'Laikipia',
  "ward_id": 20
}]


with app.app_context():
        for data in datas:
                county = Location(**data)
                db.session.add(county)
        db.session.commit()
        print("Seeding successful!")

