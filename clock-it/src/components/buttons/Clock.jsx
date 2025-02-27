import React, { useState } from "react";
import { useUser } from "../../context/userContext.jsx";
import { createQR } from "../../services/apiCalls/QR/createQR.js";
export default function ClockButton({ action, setQrData, setAction }) {
  const { id } = useUser();
  const RED = "#ff0000";
  const GREEN = "#008000";
  const [isDisabled, setIsDisabled] = useState(false);

  async function handleOnclick(id, action) {
    setIsDisabled(true);

    await getQRData(id, action);
    setAction(action);
    //unblock button after 10s so user does not spam QR Code requests to the DB
    setTimeout(() => {
      setIsDisabled(false);
    }, 10000); 
  }

  async function getQRData(id, action) {
    try {
      const response = await createQR(id, action);
  
      if (response.ok) {
        const responseData = await response.json();
        setQrData(responseData.data); 
        return;
      }
    } catch (error) {
      alert(error.message); 
    }
  }

  return (
    <button
      disabled={isDisabled}
      style={{ backgroundColor: action === "I" ? GREEN : RED }}
      onClick={() => handleOnclick(id, action)}
    >
      Clock {action === "I" ? "IN" : "OUT"}!
    </button>
  );
}
