import React, { useState } from "react";
import "./generate.css";

const Generate = () => {
  const [language, setLanguage] = useState("English");
  const [summary, setSummary] = useState("");

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  const handleDownloadPDF = () => {
    console.log("Downloading PDF...");
  };

  const handleDownloadBraille = () => {
    console.log("Downloading Braille...");
  };

  const handleDownloadAudio = () => {
    console.log("Downloading Audio Summary...");
  };

  return (
    <div className="generate-container">
      <h1 className="logo">Vocalize.io</h1>

      <div className="main-content">
        <div className="input-section">
          <div className="language-selector">
            <label className="lang">Language:</label>
            <select value={language} onChange={handleLanguageChange}>
              <option value="English">English</option>
              <option value="Malayalam">Malayalam</option>
              <option value="Spanish">Spanish</option>
              <option value="French">French</option>
            </select>
          </div>
          <div className="summary-section">
            <textarea
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Text will be displayed here."
            />
          </div>
          <div className="download-section">
            <button className="download-btn pdf" onClick={handleDownloadPDF}>
              DOWNLOAD .pdf
            </button>
            <button
              className="download-btn braille"
              onClick={handleDownloadBraille}
            >
              DOWNLOAD .brf (BRAILLE)
            </button>
            <button
              className="download-btn audio"
              onClick={handleDownloadAudio}
            >
              DOWNLOAD AUDIO SUMMARY
            </button>
          </div>
          <div className="audio-section">
            <p className="play">listen to your summarized content</p>
            <div className="audio-player">
              <audio controls>
                <source src="path_to_audio_file.mp3" type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Generate;