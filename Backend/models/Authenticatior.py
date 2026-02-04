from pydantic import BaseModel


class LoginModel(BaseModel):
    email: str
    password: str
    
class RegisterModel(BaseModel):
    name: str
    region: str
    email: str
    phone: str
    password: str
    aadhar: str
    cost_preferences: str
