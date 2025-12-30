from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
import models
import schemas
from database import SessionLocal, engine
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

models.Base.metadata.create_all(bind=engine)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"], 
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db(): 
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/employees/", response_model=list[schemas.EmployeeResponse])
def get_employees(db: Session = Depends(get_db)):
    try:
        employees = db.query(models.Employee).all()
        return employees
    except Exception as e:
        print("ERROR:", e)
        raise HTTPException(status_code=500, detail=str(e))
@app.get("/employees/{emp_id}", response_model=schemas.EmployeeResponse)
def get_employee(emp_id: int, db: Session = Depends(get_db)):
    employee = db.query(models.Employee).filter(models.Employee.emp_id == emp_id).first()
    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")
    return employee

@app.post("/employees/", response_model=schemas.EmployeeResponse)
def create_employee(emp: schemas.EmployeeCreate, db: Session = Depends(get_db)):
    new_emp = models.Employee(**emp.dict())
    db.add(new_emp)
    db.commit()
    db.refresh(new_emp)
    return new_emp

@app.put("/employees/{emp_id}", response_model=schemas.EmployeeResponse)
def update_employee(emp_id: int, emp_update: schemas.EmployeeUpdate, db: Session = Depends(get_db)):
    employee = db.query(models.Employee).filter(models.Employee.emp_id == emp_id).first()
    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")
    
    for key, value in emp_update.dict(exclude_unset=True).items():
        setattr(employee, key, value)
    
    db.commit()
    db.refresh(employee)
    return employee

     

@app.delete("/employees/{emp_id}", response_model=dict)
def delete_employee(emp_id: int, db: Session = Depends(get_db)):
    employee = db.query(models.Employee).filter(models.Employee.emp_id == emp_id).first()
    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")
    
    db.delete(employee)
    db.commit()
    return {"message": "Employee deleted successfully"}


@app.get("/api/health")
def health():
    return {"status": "ok"}