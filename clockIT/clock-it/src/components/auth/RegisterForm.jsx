
import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../services/apiCalls/auth/register';

function RegisterForm() {
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    username: '',
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    
    await registerUser(formData)
          
     alert("You are now registered!")
     navigate('/');
    
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div id="form">
      <h1>Register</h1>
      <p>
        Already registered? <Link to="/">Login here</Link>
      </p>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button id="formButton" type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterForm;
