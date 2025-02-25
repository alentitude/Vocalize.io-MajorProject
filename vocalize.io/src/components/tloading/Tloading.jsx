import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./tloading.css";

function Tloading() {
  const navigate = useNavigate();
  const redirectDelay = 4; 
  const [message, setMessage] = useState("Translating your text...");

  useEffect(() => {
    const messageTimeout = setTimeout(() => {
      setMessage("Translation completed! Please wait...");
    }, (redirectDelay - 0.5) * 1000); 

    const redirectTimer = setTimeout(() => {
      navigate("/generate");
    }, redirectDelay * 1000);

    return () => {
      clearTimeout(messageTimeout);
      clearTimeout(redirectTimer);
    };
  }, [navigate]);

  return (
    <div className="tloading-box">
      <div className="tloadingtext">
        <p>{message}</p>
      </div>
    </div>
  );
}

export default Tloading;
