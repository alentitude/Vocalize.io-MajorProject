import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Loading.css";
function Loading() {
  const navigate = useNavigate();
  const messages = [
    "Please wait. Summarising in progress...",
    "Generating summary for you...",
    "Almost there...",
    "Any minute now...",
  ];

  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const slideInterval = 5000;
    const messageTimer = setInterval(() => {
      setMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, slideInterval);

    const fetchData = async () => {
      const storedFormData = sessionStorage.getItem("summaryFormData");
      if (!storedFormData) {
        alert("No input data found. Redirecting...");
        navigate("/");
        return;
      }

      const formData = new FormData();
      const parsedData = JSON.parse(storedFormData);

      for (const key in parsedData) {
        formData.append(key, parsedData[key]);
      }

      try {
        const response = await fetch(
          "https://eminent-monthly-bluegill.ngrok-free.app/summarize",
          {
            method: "POST",
            body: formData,
          }
        );

        if (!response.ok) {
          throw new Error("Failed to summarize input.");
        }

        const data = await response.json();
        console.log("Summary:", data.summary);

        navigate("/generate", {
          state: {
            summary: data.translated_summary,
            originalSummary: data.summary,
            language: parsedData.language,
          },
        });
      } catch (error) {
        console.error("Error:", error);
        alert("Something went wrong.");
        navigate("/");
      }
    };

    fetchData();

    return () => {
      clearInterval(messageTimer);
    };
  }, [navigate]);

  return (
    <div className="loadcontainer">
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
    </div>
  );
}

export default Loading;
