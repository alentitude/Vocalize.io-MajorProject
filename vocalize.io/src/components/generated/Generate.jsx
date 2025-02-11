import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./generate.css";

const Generate = () => {
  const location = useLocation();
  const [language, setLanguage] = useState("English");
  const [summary, setSummary] = useState("");
  const [originalSummary, setOriginalSummary] = useState(""); // To store the original English summary
  const [audioUrl, setAudioUrl] = useState("");

  const languageCodes = {
    English: "en",
    Malayalam: "ml",
    Spanish: "es",
    French: "fr",
    Hindi: "hi",
    German: "de",
    Chinese: "zh-CN",
    Japanese: "ja",
    Korean: "ko",
    Russian: "ru",
    Portuguese: "pt",
    Italian: "it",
    Arabic: "ar",
    Bengali: "bn",
    Tamil: "ta",
    Telugu: "te",
  };

  useEffect(() => {
    if (location.state && location.state.summary) {
      setSummary(location.state.summary);
      setOriginalSummary(location.state.summary); // Store the original summary
    }
  }, [location.state]);

  const handleLanguageChange = async (e) => {
    const selectedLanguage = e.target.value;
    setLanguage(selectedLanguage);

    if (selectedLanguage === "English") {
      setSummary(originalSummary); // Revert to the original summary when English is selected
      return;
    }

    const targetLang = languageCodes[selectedLanguage];

    if (targetLang) {
      try {
        // Split the summary into smaller chunks (e.g., by sentences)
        const chunks = summary.split(/(?<=[.!?])\s+/); // Splitting by sentence
        const translatedChunks = [];

        for (const chunk of chunks) {
          const response = await fetch(
            `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLang}&dt=t&q=${encodeURIComponent(
              chunk
            )}`
          );

          if (response.ok) {
            const result = await response.json();
            translatedChunks.push(result[0][0][0]); // Add the translated chunk to the array
          } else {
            console.error("Translation failed for chunk:", chunk, response.status);
          }
        }

        // Join the translated chunks and update the summary
        setSummary(translatedChunks.join(" "));
      } catch (error) {
        console.error("Error while translating text:", error);
      }
    }
  };

  const handleDownload = (filePath) => {
    const url = `https://eminent-monthly-bluegill.ngrok-free.app/download?file_path=${filePath}`;
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filePath.split("/").pop()); // Set the download attribute with the file name
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadPDF = () => {
    handleDownload("./outputs/summary.pdf");
  };

  const handleDownloadBraille = () => {
    handleDownload("./outputs/summary.brf");
  };

  const handleDownloadAudio = () => {
    handleDownload("./outputs/summary.mp3");
  };

  const handlePlayAudio = () => {
    setAudioUrl(
      "https://eminent-monthly-bluegill.ngrok-free.app/download?file_path=./outputs/summary.mp3"
    );
  };

  return (
    <div className="generate-container">
      <h1 className="logo">Vocalize.io</h1>

      <div className="main-content">
        <div className="input-section">
          <div className="language-selector">
            <label className="lang">Language:</label>
            <select value={language} onChange={handleLanguageChange}>
              {Object.keys(languageCodes).map((lang) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
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
            <p className="play">Listen to your summarized content</p>
            <div className="audio-player">
              {audioUrl ? (
                <audio controls>
                  <source src={audioUrl} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              ) : (
                <button className="play-btn" onClick={handlePlayAudio}>
                  Play Audio
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Generate;
