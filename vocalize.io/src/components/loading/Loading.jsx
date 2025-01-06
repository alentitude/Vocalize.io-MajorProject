import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Assuming React Router is used
// import "./Loading.css"; // Add any styling if needed

function Loading() {
  const navigate = useNavigate();
  const redirectDelay = 5; // Variable for redirection time (in seconds)

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/generate"); // Redirect to 'Generate' component
    }, redirectDelay * 1000); // Convert to milliseconds

    return () => clearTimeout(timer); // Cleanup the timer
  }, [navigate]);

  return (
    <div className="loading-container">
      <h1>Loading...</h1>
      <p>Please wait while we process your request.</p>
    </div>
  );
}

export default Loading;
