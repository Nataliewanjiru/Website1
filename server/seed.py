from app import app
from models import *

with app.app_context():
        county = Ward.query.get(6)
        db.session.delete(county)
        db.session.commit()
        print("Seeding successful!")

