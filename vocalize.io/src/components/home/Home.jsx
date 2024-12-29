// src/components/Home.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import "./Home.css";

function Home() {
  const [isLogoShifted, setIsLogoShifted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [url, setUrl] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null);

  // const handleGenerate = () => {
  //   setIsLoading(true);
  //   setTimeout(() => {
  //     setIsLoading(false);
  //     alert("Summary generated!"); // Replace with actual functionality
  //   }, 5000); // Simulate a 5-second loading time
  // };

  const handleFileUpload = (e) => {
    const file = e.target.files[0]; // Get the first file from the input
    if (file) {
      setUploadedFile(file);
      alert(`File uploaded: ${file.name}`);
    }
  };

  const handleInputChange = (e) => {
    setUrl(e.target.value); // Update the state with the input value
  };

  const handleSubmit = () => {
    if (url.trim() === "") {
      alert("Please enter a valid URL.");
      return;
    }
    alert(`URL Submitted: ${url}`);
    // You can process the URL here, e.g., send it to a server
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
        <motion.div className="home-content">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <input
              type="text"
              placeholder="Paste YouTube video URL here..."
              onChange={handleInputChange}
              value={url}
              className="url-input"
            ></input>
            <p className="text">OR</p>

            {/* <motion.button
              className="generate-button"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              // onClick={handleGenerate}
            >
              Generate Summary
            </motion.button> */}

            <motion.div
              className="upload-container"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <motion.label
                className="upload-button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <input
                  type="file"
                  accept=".txt, .pdf, .docx"
                  onChange={handleFileUpload}
                  style={{ display: "none" }} // Hide the default file input
                />
                UPLOAD DOCUMENT +
              </motion.label>
              <span className="accepted-formats">
                (Upload .mp3, .mp4, .txt, .pdf files)
              </span>
            </motion.div>
            {uploadedFile && <p>Uploaded File: {uploadedFile.name}</p>}
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

export default Home;
