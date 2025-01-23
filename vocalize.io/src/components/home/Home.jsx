// src/components/Home.jsx
import React, { useState } from "react";
import { color, motion } from "framer-motion";
import Loading from "../loading/Loading";
import "./Home.css";

function Home() {
  const [isLogoShifted, setIsLogoShifted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [url, setUrl] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null);
  const [inputType, setInputType] = useState("url");
  const [textInput, setTextInput] = useState("");

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const handleInputChange = (e) => {
    setUrl(e.target.value);
  };

  const handleTextInputChange = (e) => {
    setTextInput(e.target.value); // Update the state with text input value
  };

  const handleInputTypeChange = (e) => {
    setInputType(e.target.value);
    setUploadedFile(null);
  };

  const handleSubmit = () => {
    if (url.trim() === "" && !uploadedFile) {
      alert("Please enter a valid URL.");
      return;
    }

    if (inputType === "text" && textInput.trim() === "") {
      alert("Please enter some text for summarization.");
      return;
    }

    setIsLoading(true); // Set loading state
    // setTimeout(() => {
    //   setIsLoading(false); // Simulate loading complete after 5 seconds
    //   alert("Summary generated!"); // Placeholder for further actions
    // }, 5000);
  };

  return (
    <div className="home-container">
      {!isLoading ? (
        <>
          <motion.div
            className="logo-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
            onAnimationComplete={() => setIsLogoShifted(true)}
            style={{
              top: "0",
              left: "0",
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
                <div className="input-selection">
                  <select
                    className="selbox"
                    id="inputType"
                    value={inputType}
                    onChange={handleInputTypeChange}
                  >
                    <option value="url">URL / Document</option>
                    <option value="text">Text</option>
                  </select>
                </div>

                {inputType === "url" ? (
                  <>
                    <input
                      type="text"
                      placeholder="Paste YouTube video URL here..."
                      onChange={handleInputChange}
                      value={url}
                      className="url-input"
                    ></input>
                    <p className="text">OR</p>

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
                          style={{ display: "none" }}
                        />
                        UPLOAD FILE +
                      </motion.label>
                      <span className="accepted-formats">
                        (Upload .mp3, .mp4, .txt, .pdf files)
                      </span>
                    </motion.div>
                  </>
                ) : (
                  <textarea
                    placeholder="Paste text to summarise here."
                    onChange={handleTextInputChange}
                    value={textInput}
                    className="text-input"
                    rows="6"
                  ></textarea>
                )}

                {/* <input
                  type="text"
                  placeholder="Paste YouTube video URL here..."
                  onChange={handleInputChange}
                  value={url}
                  className="url-input"
                ></input> */}

                {/* <p className="text">OR</p>

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
                    UPLOAD FILE +
                  </motion.label>
                  <span className="accepted-formats">
                    (Upload .mp3, .mp4, .txt, .pdf files)
                  </span>
                </motion.div> */}
                {inputType === "url" && uploadedFile && (
                  <motion.p
                    style={{ color: "white", marginBottom: 0 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    Uploaded File: {uploadedFile.name}
                  </motion.p>
                )}
                {(inputType === "text" && textInput.trim() !== "") ||
                (inputType === "url" && (url.trim() !== "" || uploadedFile)) ? (
                  <motion.button
                    className="generate-button"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleSubmit}
                  >
                    Summarise
                  </motion.button>
                ) : null}
              </motion.div>
            </motion.div>
          )}
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default Home;
