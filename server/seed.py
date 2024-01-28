from app import app
from models import *

with app.app_context():
        county = Ward(name="Kolwa", subcounty_id=5)
        db.session.add(county)
        db.session.commit()
        print("Seeding successful!")

