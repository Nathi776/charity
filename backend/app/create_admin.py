from app.database import SessionLocal, engine
from app.models import User, Base
from app.security import get_password_hash

def create_admin():
    Base.metadata.create_all(bind=engine)

    db = SessionLocal()
    try:
        if db.query(User).filter_by(username="admin").first():
            print("Admin already exists")
        else:
            hashed = get_password_hash("admin123")
            admin = User(username="admin", hashed_password=hashed)
            db.add(admin)
            db.commit()
            print("Admin user created ✅")
    finally:
        db.close()
