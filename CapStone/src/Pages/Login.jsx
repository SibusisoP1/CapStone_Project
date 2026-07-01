import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../action/userActions";
import "../style/Login.css";
import Logo from "../assets/Red_Logo.png";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      //later
    }
  }, [userInfo]);

  const handleLogin = async (e) => {
    e.preventDefault();
    await dispatch(login(email, password));
    navigate("/admin");
  };

  return (
    <>
      <div className="login_nav">
        <Link to="/">
          <img src={Logo} alt="" />
        </Link>
      </div>
      <div className="Login">
        <div className="Login_Container">
          <h1>Login</h1>
          {error && <h1>{error}</h1>}
          {loading && <h1>Loading...</h1>}
          <div className="username">
            <span>Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="password">
            <span>Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <span className="Forgot">Forgot Password ?</span>
          <button className="btn_login" onClick={handleLogin}>
            Login
          </button>
        </div>
      </div>
    </>
  );
};

export default Login;
