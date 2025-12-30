from pydantic import BaseModel

from decimal import Decimal

class EmployeeBase(BaseModel):
    emp_name: str
    age: int
    salary: Decimal
    dep_id: int
    
    
class EmployeeUpdate(BaseModel):
    emp_name:str |None=None
    age:int |None=None
    salary:Decimal| None=None
    dep_id:int |None=None


class EmployeeCreate(EmployeeBase):
    pass

class EmployeeResponse(EmployeeBase):
    emp_id: int

    class Config:
        from_attributes = True  
