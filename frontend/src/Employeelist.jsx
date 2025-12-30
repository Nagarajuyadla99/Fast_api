import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "./api";

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  const loadEmployees = async () => {
    const res = await api.get("/employees/");
     console.log("API RESPONSE:", res.data);
    
    setEmployees(res.data);
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  const deleteEmployee = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    await api.delete(`/employees/${id}`);
    loadEmployees();
  };

  return (
    <div>
      <h2 >Employees</h2>
      <h3>React + Mysql +FastApi</h3>
      <button onClick={() => navigate("/logout")}>Logout</button>

      <button onClick={() => navigate("/add")}>Add Employee</button>

      <table border="1" cellPadding="10" width={1490} >
        <thead>
          <tr>
            <th>S.No</th>
            <th>Name</th>
            <th>Age</th>
            <th>Salary</th>
            <th>Dept</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((e, i) => (
            <tr key={e.emp_id}>
              <td>{i + 1}</td>
              <td>{e.emp_name}</td>
              <td>{e.age}</td>
              <td>{e.salary}</td>
              <td>{e.dep_id}</td>
              <td>
                <button onClick={() => navigate(`/edit/${e.emp_id}`)}>
                  Edit
                </button>
                <br /><br />
                <button className="delete-btn" onClick={() => deleteEmployee(e.emp_id)}>
  Delete
</button>

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeList;
