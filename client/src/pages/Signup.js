import {useState} from "react";
import {useNavigate} from "react-router-dom";
import api from "../utils/api";
import { Link } from "react-router-dom";
import "../Signup.css"

function Signup(){
    const [name , setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();


const handleSignup = async (e)=> {
e.preventDefault();

try{

    await api.post("/auth/signup",{name, email, password});

    alert("Signup Succesful");
    navigate("/");

}catch(err){
    console.log(err)
    alert("Signup Failed");

}
};

return (
  <div className="signup-container">
    <form onSubmit={handleSignup} className="signup-form">
      <h2>Create Account 🚀</h2>
      <p className="subtitle">Signup to get started</p>

      <input
        type="text"
        placeholder="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <input
        type="email"
        placeholder="Email Address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button type="submit">Signup</button>

      <p className="login-text">
        Already have an account?
       <Link to="/"> Login</Link>
      </p>
    </form>
  </div>
);

}

export default Signup;