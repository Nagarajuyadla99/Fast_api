from sqlalchemy import Column, Integer, String,  Numeric
from database import Base

class Employee(Base):
    __tablename__ = "employees"

    emp_id = Column(Integer, primary_key=True, index=True)
    emp_name = Column(String(100), nullable=False)
    age = Column(Integer)
    salary = Column(Numeric(10,0))
    dep_id = Column(Integer)
   
