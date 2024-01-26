from app import app
from models import *

with app.app_context():
        county = Ward(name="Nyayo highrise",subcounty_id=1)
        db.session.add(county)
        db.session.commit()
        print("Seeding successful!")

