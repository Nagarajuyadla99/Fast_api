import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "./api";
import "./AddEmployee.css"; 

function EditEmployee() {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const [form, setForm] = useState({
    emp_name: "",
    age: "",
    salary: "",
    dep_id: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await api.get(`/employees/${id}/`);
        setForm(response.data);
      } catch (error) {
        console.error("Failed to fetch employee data", error);
      }
    };
    fetchEmployee();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validate = () => {
    let newErrors = {};
    if (!form.emp_name.trim()) newErrors.emp_name = "Name is required";
    else if (!/^[A-Za-z ]+$/.test(form.emp_name))
      newErrors.emp_name = "Name must contain only alphabets";

    if (!form.age) newErrors.age = "Age is required";
    else if (isNaN(form.age)) newErrors.age = "Age must be a number";
    else if (form.age < 18 || form.age > 60)
      newErrors.age = "Age must be between 18 and 60";

    if (!form.salary) newErrors.salary = "Salary is required";
    else if (isNaN(form.salary)) newErrors.salary = "Salary must be a number";
    else if (form.salary < 10000 || form.salary > 10000000)
      newErrors.salary = "Salary must be between 10,000 and 1,00,00,000";

    if (!form.dep_id) newErrors.dep_id = "Department is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await api.put(`/employees/${id}/`, form); 
      navigate("/"); 
    } catch (error) {
      console.error("Update failed", error);
    }
  };

  return (
    <div className="form-container">
      <div className="form-card">
        <h2 className="form-title">Edit Employee</h2>
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label>Employee Name</label>
            <input
              name="emp_name"
              placeholder="Enter Employee Name"
              value={form.emp_name}
              onChange={handleChange}
              type="text"
            />
            {errors.emp_name && <p className="error">{errors.emp_name}</p>}
          </div>

          <div className="form-group">
            <label>Age</label>
            <input
              name="age"
              placeholder="Enter Age"
              value={form.age}
              onChange={handleChange}
              type="number"
            />
            {errors.age && <p className="error">{errors.age}</p>}
          </div>

          <div className="form-group">
            <label>Salary</label>
            <input
              name="salary"
              placeholder="Enter Salary"
              value={form.salary}
              onChange={handleChange}
              type="number"
            />
            {errors.salary && <p className="error">{errors.salary}</p>}
          </div>

          <div className="form-group">
            <label>Department</label>
            <select name="dep_id" value={form.dep_id} onChange={handleChange}>
              <option value="">Select Department</option>
              <option value="1">HR</option>
              <option value="2">IT</option>
            </select>
            {errors.dep_id && <p className="error">{errors.dep_id}</p>}
          </div>

          <button type="submit" className="submit-btn">
            Update
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditEmployee;
