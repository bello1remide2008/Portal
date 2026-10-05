import { useNavigate } from "react-router-dom";
import "./LoginChoice.css";

const LoginChoice = () => {
  const navigate = useNavigate();

  return (
    <div className="login-choice">
      <h2>Select Login Type</h2>

      <button onClick={() => navigate("/admin/adminLogin")}>
        Login as Admin
      </button>

      <button onClick={() => navigate("/login")}>
        Login as User
      </button>
    </div>
  );
};

export default LoginChoice;
