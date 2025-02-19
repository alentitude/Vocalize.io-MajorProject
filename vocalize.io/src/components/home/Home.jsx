import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const [language, setLanguage] = useState("en");
  const [isSummaryGenerated, setIsSummaryGenerated] = useState(false);
  const navigate = useNavigate();

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  const handleInputChange = (e) => {
    setUrl(e.target.value);
  };

  const handleTextInputChange = (e) => {
    setTextInput(e.target.value); // Update the state with text input value
  };

  const handleInputTypeChange = (e) => {
    setInputType(e.target.value);
    setUrl("");
    setUploadedFile(null);
    setTextInput("");
  };

  const handleSubmit = async () => {
    const formData = new FormData();

    formData.append("language", language); // Change language as needed

    if (inputType === "text" && textInput.trim() !== "") {
      formData.append("input_type", "text");
      formData.append("text", textInput);
    } else if (inputType === "url" && url.trim() !== "") {
      formData.append("input_type", "youtube");
      formData.append("youtube_url", url);
    } else if (inputType === "url" && uploadedFile) {
      formData.append("input_type", "file");
      formData.append("file", uploadedFile);
    } else {
      alert("Invalid input. Please enter valid data.");
      return;
    }

    console.log("Data being sent:", [...formData.entries()]);
    setIsLoading(true);

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
      alert("Summary generated! Check the console for details.");
      setIsSummaryGenerated(true);
      navigate("/generate", { state: { summary: data.summary } });
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="home-container">
      {!isLoading ? (
        !isSummaryGenerated ? (
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
                    <label htmlFor="inputType" className="input-label">
                      Choose Input Type:
                    </label>
                    <select
                      className="selbox"
                      id="inputType"
                      value={inputType}
                      onChange={handleInputTypeChange}
                    >
                      <option value="url">URL / Document</option>
                      <option value="text">Text</option>
                    </select>
                    <label htmlFor="inputType" className="lan-label">
                      Choose Language:
                    </label>
                    <select
                      className="lanbox"
                      id="language"
                      value={language}
                      onChange={handleLanguageChange}
                    >
                      <option value="en">English</option>
                      <option value="es">Spanish</option>
                      <option value="fr">French</option>
                      <option value="de">German</option>
                      <option value="it">Italian</option>
                      <option value="pt">Portuguese</option>
                      <option value="pl">Polish</option>
                      <option value="tr">Turkish</option>
                      <option value="ru">Russian</option>
                      <option value="nl">Dutch</option>
                      <option value="cs">Czech</option>
                      <option value="ar">Arabic</option>
                      <option value="zh-cn">Chinese</option>
                      <option value="ja">Japanese</option>
                      <option value="hu">Hungarian</option>
                      <option value="ko">Korean</option>
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
                  (inputType === "url" &&
                    (url.trim() !== "" || uploadedFile)) ? (
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
          <div className="summary-container">
            {/* Render the next page content here */}
            <h2>Summary Generated!</h2>
            <p>Check the console for details.</p>
          </div>
        )
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default Home;
