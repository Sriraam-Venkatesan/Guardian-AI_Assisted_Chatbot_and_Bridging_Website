from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from Schema.model import UserRole
from models.Authenticatior import LoginModel, RegisterModel
from Service.authenticationService import Authenticator
from db.db import get_db, User_DAO

router = APIRouter()

@router.post("/login")
def login(req: LoginModel, db: Session = Depends(get_db)):
    try:
        user = Authenticator.check_login(db, req.email, req.password)

        if not user:
            raise HTTPException(
                status_code=401, detail="Invalid email or password"
            )
        
        return {
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "phone": user.phone,
            "role": user.role.value,
            "is_verified_Advocate": user.is_verified_Advocate            
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail="Internal server error")

@router.post("/register")
def register(req: RegisterModel, db: Session = Depends(get_db)):
    try:
        
        if Authenticator.user_exists(db, req.email):
            raise HTTPException(
                status_code=400, detail="User already exists"
            )
        
        user = Authenticator.create_user(
            db, req.name, req.email, req.phone, req.password, area=req.region, aadhar=req.aadhar, cost_preferences=req.cost_preferences
        )
        
        return {
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "phone": user.phone,
            "role": user.role.value,
            "is_verified_Advocate": user.is_verified_Advocate
        }
    except HTTPException:
        raise
    except Exception as e:
        import traceback
        print("REGISTER ERROR:", str(e))
        print(traceback.format_exc())
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")

@router.get("/profile/{user_id}")
def get_profile(user_id: int, db: Session = Depends(get_db)):
    user = User_DAO.get_user_by_id(db, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    return {
        "id": user.id,
        "name": user.name,
        "email": user.email,
        "phone": user.phone,
        "role": user.role.value,
        "area": user.area,
        "aadhar": user.aadhar,
        "cost_preferences": user.cost_preferences,
        "created_at": user.created_at.isoformat() if user.created_at else None
    }

