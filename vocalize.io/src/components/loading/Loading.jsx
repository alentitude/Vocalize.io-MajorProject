import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Loading.css";
function Loading() {
  const navigate = useNavigate();
  const redirectDelay = 20;
  const messages = [
    "Please wait. Summarising in progress...",
    "Generating summary for you...",
    "Almost there...",
    "Any minute now...",
  ];

  const [messageIndex, setMessageIndex] = useState(0);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     navigate("/generate");
  //   }, redirectDelay * 1000);
  //   return () => clearTimeout(timer);
  // }, [navigate]);

  useEffect(() => {
    const slideInterval = 5000;
    const messageTimer = setInterval(() => {
      setMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, slideInterval);

    const redirectTimer = setTimeout(() => {
      navigate("/generate");
    }, redirectDelay * 1000);

    return () => {
      clearInterval(messageTimer);
      clearTimeout(redirectTimer);
    };
  }, []);

  return (
    <div className="loading-box">
      <div className="banter-loader">
        {Array.from({ length: 9 }).map((_, index) => (
          <div key={index} className="banter-loader__box"></div>
        ))}
      </div>
      <div className="loadingtext">
        <p>{messages[messageIndex]}</p>
      </div>
    </div>
  );
}

export default Loading;
