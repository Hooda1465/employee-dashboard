import {useState} from "react";
import api from "../utils/api";
import { Link } from "react-router-dom";
import "../Login.css"


function Login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e)=>{

        e.preventDefault();
       try {
        const res = await api.post( "/auth/login", {email, password})

        localStorage.setItem("token", res.data.token);
        window.location.href = "/dashboard" ;

        } catch(error){
           alert(error.response?.data?.message || "Login Failed");
        }
    };

    
return (
  <div className="login-container">
    <form onSubmit={handleLogin} className="login-form">
      <h2>Welcome Back 👋</h2>
      <p className="subtitle">Login to your account</p>

      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button type="submit">Login</button>

      <p className="signup-text">
        Don't have an account?
        <Link to="/signup"> Signup</Link>
      </p>
    </form>
  </div>
);
}
export default Login;

