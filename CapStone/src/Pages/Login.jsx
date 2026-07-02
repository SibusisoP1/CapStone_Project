import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login, register } from "../action/userActions";
import "../style/Login.css";
import Logo from "../assets/Red_Logo.png";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("host");

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      navigate("/admin");
    }
  }, [userInfo, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isRegister) {
      dispatch(register(username, password, role));
    } else {
      dispatch(login(username, password));
    }
  };

  return (
    <>
      <div className="login_nav">
        <Link to="/">
          <img src={Logo} alt="" />
        </Link>
      </div>
      <div className="Login">
        <form className="Login_Container" onSubmit={handleSubmit}>
          <h1>{isRegister ? "Sign up" : "Login"}</h1>
          {error && <p className="login_error">{error}</p>}
          {loading && <p>Loading...</p>}
          <div className="username">
            <span>Username</span>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="password">
            <span>Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {isRegister && (
            <div className="role">
              <span>Role</span>
              <select value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="host">Host</option>
                <option value="guest">Guest</option>
              </select>
            </div>
          )}
          {!isRegister && <span className="Forgot">Forgot Password ?</span>}
          <button className="btn_login" type="submit" disabled={loading}>
            {isRegister ? "Sign up" : "Login"}
          </button>
          <span
            className="toggle_auth"
            onClick={() => setIsRegister(!isRegister)}
          >
            {isRegister
              ? "Already have an account? Login"
              : "Don't have an account? Sign up"}
          </span>
        </form>
      </div>
    </>
  );
};

export default Login;
