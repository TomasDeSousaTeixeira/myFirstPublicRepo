import { useNavigate } from "react-router-dom";
import React from "react";
import { useUser } from "../../context/userContext";
import { logOutUser } from "../../services/apiCalls/auth/logout";

export default function LogOutButton() {

  const navigate = useNavigate()

  const {setUser, setId } = useUser();

  async function logOut() {
    try {
      const response = await logOutUser()
      const data = await response.json()
      console.log(data.message)
     
      if(response.status == 200){
        setUser(null);
        setId(null);
        navigate("/");
        
      }
    } catch (error) {
      console.error("Error during logout:", error);
      alert("Logout failed!");
    }
  }

  return (
    <button onClick={logOut}>
    👋
    </button>
  );
}
