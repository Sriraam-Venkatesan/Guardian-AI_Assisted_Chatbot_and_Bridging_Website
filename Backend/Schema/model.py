import enum
from datetime import datetime
from sqlalchemy import TIMESTAMP, Column, Integer, String, Boolean, Enum
from db.db import Base

class UserRole(enum.Enum):
    Advocate = "Advocate"
    Client = "Client"

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    email = Column(String(150), unique=True, nullable=False)
    phone = Column(String(20), nullable=True)
    password_hash = Column(String(255), nullable=False)
    role = Column(Enum(UserRole), nullable=False, default=UserRole.Client)
    is_verified_Advocate = Column(Boolean, nullable=False, default=False)
    created_at = Column(TIMESTAMP, nullable=False)
    area = Column(String(50))
    aadhar = Column(String(20), nullable=True)
    cost_preferences = Column(String(100), nullable=True)

