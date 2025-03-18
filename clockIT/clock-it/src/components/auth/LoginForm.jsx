import React, { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useUser } from "../../context/userContext";
import { logInUser } from "../../services/apiCalls/auth/login";

function LoginForm() {

  const { setUser, setId, setUserRole } = useUser();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   
    try {
      
      const response = await logInUser(formData)
      
      const data = await response.json();
      
      if (data.userRole === "admin") {
  
        setUserRole("admin")
        setUser(data.username); 
        setId(data.userID);
        navigate('/adminPanel');
        return;
      } else if(data.userRole === "user") {
       
        setUserRole("user")
        setUser(data.username); 
        setId(data.userID); 

        navigate("/home");
     
    }
    } catch (error) {
      console.error("Error during login:", error);
      alert("Login failed! Please check your username and password.");
    }
  };

  return (
    <section id='form'>
      <h1>Login</h1>
      <p>
        Not registered yet? <Link to="/register">Register here</Link>
      </p>
      <form onSubmit={handleSubmit}>
        
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
       
       
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
       
        <button id='formButton' type="submit">Login</button>
      </form>
    </section>
  );
}
export default LoginForm;
