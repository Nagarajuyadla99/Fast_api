import { useNavigate } from "react-router-dom"

function Logout() {
    const navigate=useNavigate();
    const handleLogout=()=>{
        localStorage.removeItem("employee");
        navigate("/");
    }
  return (
    <div>
      <button
      onClick={handleLogout}
      style={{
        padding: "8px 16px",
        backgroundColor: "#dc3545",
        color: "#fff",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
        fontSize: "14px",
      }}
    >
      Logout
    </button>
    </div>
  )
}

export default Logout
