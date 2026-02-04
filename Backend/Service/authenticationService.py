from Schema.model import User, UserRole
from passlib.context import CryptContext
from datetime import datetime, timezone
from db.db import User_DAO
from sqlalchemy.orm import Session
import hashlib

from passlib.hash import pbkdf2_sha256

print("LOADING Authentication Service with PBKDF2...")

def hash_password(password: str) -> str:
    # PBKDF2 has no 72-byte limit.
    return pbkdf2_sha256.hash(password)

def verify_password(password: str, hashed: str) -> bool:
    try:
        return pbkdf2_sha256.verify(password, hashed)
    except Exception:
        return False



class Authenticator:

    @staticmethod
    def create_user(db: Session, name: str, email: str, phone: str, password: str, area: str = None, aadhar: str = None, cost_preferences: str = None):
        hashed_pwd = hash_password(password)

        user = User(
            name=name,
            email=email,
            phone=phone,
            password_hash=hashed_pwd,
            role=UserRole.Client,
            created_at = datetime.now(timezone.utc),
            is_verified_Advocate=False,
            area=area,
            aadhar=aadhar,
            cost_preferences=cost_preferences
        )

        created_user = User_DAO.add_user(db, user)
                
        return created_user


    @staticmethod
    def user_exists(db: Session, email: str) -> bool:
        user = User_DAO.is_user_present(db=db, email=email)
        exists = user is not None
        return exists

    @staticmethod
    def check_login(db: Session, email: str, password: str):
        user = User_DAO.is_user_present(db=db, email=email)
        if not user:
            return False

        if verify_password(password, user.password_hash):
            return user
        
        return False
