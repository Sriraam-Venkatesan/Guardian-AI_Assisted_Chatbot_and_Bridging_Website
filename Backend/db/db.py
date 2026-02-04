from sqlalchemy import create_engine
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import sessionmaker, Session, declarative_base
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

Base = declarative_base()

DATABASE_URL = os.getenv("DATABASE_URL")
if not DATABASE_URL:
    raise ValueError("DATABASE_URL environment variable not set. Check your .env file")

print(f"Connecting to: {DATABASE_URL}")
engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False} if "sqlite" in DATABASE_URL else {}
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def create_tables():
    try:
        from Schema.model import User, UserRole  # Imports User model which registers with Base
        Base.metadata.create_all(bind=engine)
        
        # Proactive Migration: Add columns if they don't exist
        with engine.connect() as conn:
            from sqlalchemy import text
            # Check and add aadhar
            try:
                conn.execute(text("ALTER TABLE users ADD COLUMN IF NOT EXISTS aadhar VARCHAR(20)"))
                conn.execute(text("ALTER TABLE users ADD COLUMN IF NOT EXISTS cost_preferences VARCHAR(100)"))
                conn.commit()
            except Exception as e:
                print(f"Migration note: {e}")
                
        print("Database tables created/updated successfully")
    except Exception as e:
        print(f"Error creating tables: {e}")
        raise


class User_DAO:
    @staticmethod
    def add_user(db: Session, user):
        try:
            db.add(user)
            db.commit()
            db.refresh(user)
            return user
        except Exception as e:
            db.rollback()
            raise

    @staticmethod
    def is_user_present(db: Session, email: str):
        try:
            from Schema.model import User
            user = db.query(User).filter(User.email == email).first()
            return user
        except Exception as e:
            raise

    @staticmethod
    def get_user_by_id(db: Session, user_id: int):
        try:
            from Schema.model import User
            user = db.query(User).filter(User.id == user_id).first()
            return user
        except Exception as e:
            raise

    @staticmethod
    def verify_user(db: Session, user_id: int):
        try:
            from Schema.model import User,UserRole
            user = db.query(User).filter(User.id == user_id, User.role == UserRole.Advocate).first()
            if not user:
                return None
            
            user.is_verified_Advocate = True
            db.commit()
            db.refresh(user)
            return user
        except Exception as e:
            raise

    @staticmethod
    def update_user(db: Session, user):
        existing_user = User_DAO.get_user_by_id(db, user.id)
        if not existing_user:
            raise ValueError(f"User with id={user.id} does not exist")

        existing_user.name = user.name
        existing_user.email = user.email
        existing_user.phone = user.phone
        existing_user.role = user.role
        existing_user.password_hash = user.password_hash

        try:
            db.commit()
            db.refresh(existing_user)
            return existing_user

        except IntegrityError as e:
            db.rollback()

            msg = str(e.orig)

            if "users_email_key" in msg:
                raise ValueError("Email already exists")
            
            raise ValueError("Database integrity error")
