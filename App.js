import { startTransition, useEffect, useState } from "react";

function App() {
  const [employees, setEmployees] = useState([]); // array, not string
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/employees/")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        return res.json();
      })
      .then((data) => setEmployees(data))
      .catch((err) => {
        console.error(err);Transition
        setError("Unable to load employees");
      });
  }, []);

  return (
    <div style={{ padding: "30px" }}>
      <h1>React + 111FastAPI (Employees)</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <table border="1" cellPadding="10" cellSpacing="0" width="500px">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Name</th>
            <th>Age</th>
            <th>Salary</th>
            <th>Dept ID</th>
            <th>Emp ID</th>
            <th>Edit</th>
          </tr>
        </thead>

        <tbody>
          {employees.length > 0 ? (
            employees.map((emp, index) => (
              <tr key={emp.emp_id}>
                <td>{index + 1}</td>
                <td>{emp.emp_name}</td>
                <td>{emp.age}</td>
                <td>{emp.salary}</td>
                <td>{emp.dep_id}</td>
                <td>{emp.emp_id}</td>
                <td></td>
                
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" style={{ textAlign: "center" }}>
                No data found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;
