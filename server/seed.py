from app import app
from models import *

with app.app_context():
        county = Location(name="v",ward_id=1)
        db.session.add(county)
        db.session.commit()
        print("Seeding successful!")

