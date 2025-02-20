import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";

import QRCodeDisplay from "./QRCodeDisplay.jsx";
import ClockButton from "../buttons/Clock.jsx";
import { fetchLastLogs } from "../../services/apiCalls/userLogs/fetchLogs.js";
import { useUser } from "../../context/userContext.jsx";

function ClockIT({ setLastLogs }) {
  const { id } = useUser();
  const [qrData, setQrData] = useState(null);
  const [action, setAction] = useState(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (id) {
      //open a websocket so the API can alert that the QR Code on screen has been used
      const socket = io("https://localhost:5000", {
        query: { id },
        transports: ["websocket"],
        withCredentials: true,
      });
      //API alerts that the QR Code was used, and the front-end deletes it
      socket.on("qr-used", async (data) => {
        if (data.success) {
          const lastLogs = await fetchLastLogs(id);
          setLastLogs(lastLogs);
          clearTimeout(timeoutRef.current);
          setQrData(null);
          alert(`Successfully clocked ${data.action === "I" ? "IN" : "OUT"}!`);
        }
      });

      return () => {
        socket.disconnect();
        clearTimeout(timeoutRef.current);
      };
    }
  }, [id]);

  const handleSetQrData = (data) => {
    setQrData(data);
    // Clear if extisting timeout
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    // Set new timeout for QR Code to expire after creation if not used
    timeoutRef.current = setTimeout(() => {
      setQrData(null);
      console.log("QR Code expired");
    }, 50000);
  };

  return (
    <div>
      <ClockButton
        action="I"
        setAction={setAction}
        setQrData={handleSetQrData}
      />
      <ClockButton
        action="O"
        setAction={setAction}
        setQrData={handleSetQrData}
      />
      <QRCodeDisplay action={action} value={qrData} />
    </div>
  );
}

export default ClockIT;
