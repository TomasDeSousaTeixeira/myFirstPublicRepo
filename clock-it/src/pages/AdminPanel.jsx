import { useEffect, useRef } from "react";
import QrScanner from "qr-scanner";
import { clockUser } from "../services/apiCalls/userLogs/clockUser";


const QRCodeScanner = () => {
  
  const videoRef = useRef(null);
  const scannerRef = useRef(null);
  const lastScanTimeRef = useRef(0);

  async function clockToApi(qrData) {
    try{
        const response = await clockUser(qrData);
        if (!response.ok) {
          console.log("entrámos aqui no !response.ok!!!!")
          const errorData = await response.json();
          throw new Error("Logout failed: ",errorData.message);
          }else{
          const responseData = await response.json();
          const actionText = responseData.action === "I" ? "IN" : "OUT";
          alert(`User clocked ${actionText} successfully!`);
          }
        }catch(err){
         alert("Failed to clock user.", err.message); 
    }
  }

  useEffect(() => {
    if (!videoRef.current) return;

    // Manually request camera access
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        window.localStream = stream;
     
        videoRef.current.srcObject = stream;
      })
      .catch((error) => {
        console.error("Camera access error:", error);
      });

    // Initialize QR Scanner after video is set up
    const scanner = new QrScanner(
      videoRef.current,
      (result) => {
        const now = Date.now();
        if (now - lastScanTimeRef.current < 1500) return; // Block scanner for 1.5s

        lastScanTimeRef.current = now; // Update last scan time
        clockToApi(result.data);
      },
      {
        highlightScanRegion: true,
        highlightCodeOutline: true,
        
      }
    );

    scanner
      .start()
      .then(() => console.log("Scanner started"))
      .catch((err) => console.error("Scanner error:", err));

    scannerRef.current = scanner;

    return () => {
      scanner.stop();
      scanner.destroy();

      // stop both video and audio
      localStream.getTracks().forEach( (track) => {
        track.stop();
  });
    };
  }, []);

  return (
    <div>
     
      <h2>QR Code Scanner</h2>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        style={{ width: "100%", maxWidth: "400px", border: "1px solid black" }}
      />
    </div>
  );
};

export default QRCodeScanner;
