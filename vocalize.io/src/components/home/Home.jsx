// src/components/Home.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import "./Home.css";

function Home() {
  const [isLogoShifted, setIsLogoShifted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert("Summary generated!"); // Replace with actual functionality
    }, 5000); // Simulate a 5-second loading time
  };

  return (
    <div className="home-container">
      <motion.div
        className="logo-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        onAnimationComplete={() => setIsLogoShifted(true)}
        style={{
          // Position the logo-container above the content
          top: "0", // You can adjust this to control the position
          left: "0", // Center the logo horizontally// Center the logo perfectly
        }}
      >
        <motion.h1 className="main-text" transition={{ duration: 0.5 }}>
          Vocalize.io
        </motion.h1>
        <motion.p
          className="sub-text"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 1 }}
        >
          smart transcription. simplified.
        </motion.p>
      </motion.div>

      {/* Shifted Logo and Home Content */}
      {isLogoShifted && (
        <motion.div
          className="home-content"
          // style={{
          //   marginTop: "100px", // Adjust margin-top to create space below the logo
          // }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <h1>Welcome to the Summary Generator</h1>
            <p>Click the button below to generate your summary.</p>
            <motion.button
              className="generate-button"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleGenerate}
            >
              Generate Summary
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

export default Home;
