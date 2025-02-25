import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./generate.css";
import Tloading from "../tloading/tloading";
import { Link } from "react-router-dom";

const Generate = () => {
  const location = useLocation();
  const [language, setLanguage] = useState("English");
  const [summary, setSummary] = useState("");
  const [originalSummary, setOriginalSummary] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  const [loading, setLoading] = useState(false);

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
    if (location.state) {
      setSummary(location.state.summary || "");
      setOriginalSummary(location.state.originalSummary || "");
      
      const selectedLang = Object.keys(languageCodes).find(
        (key) => languageCodes[key] === location.state.language
      );
      
      setLanguage(selectedLang ? selectedLang : "English");
    }
  }, [location.state]);

  const handleLanguageChange = async (e) => {
    const selectedLanguage = e.target.value;
    setLanguage(selectedLanguage);
    
    if (languageCodes[selectedLanguage] === "en") {
      setSummary(originalSummary);
      return;
    }
    
    setLoading(true);
    const targetLang = languageCodes[selectedLanguage];
    if (targetLang) {
      try {
        const chunks = originalSummary.split(/(?<=[.!?])\s+/);
        const translatedChunks = [];

        for (const chunk of chunks) {
          const response = await fetch(
            `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLang}&dt=t&q=${encodeURIComponent(
              chunk
            )}`
          );

          if (response.ok) {
            const result = await response.json();
            translatedChunks.push(result[0][0][0]);
          } else {
            console.error("Translation failed for chunk:", chunk, response.status);
          }
        }

        setSummary(translatedChunks.join(" "));
      } catch (error) {
        console.error("Error while translating text:", error);
      }
    }
    setLoading(false);
  };

  const handleDownload = (filePath) => {
    const url = `https://eminent-monthly-bluegill.ngrok-free.app/download?file_path=${filePath}`;
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filePath.split("/").pop());
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="generate-container">
      <h1 className="logo">
        <Link to="/" className="home-link">Vocalize.io</Link>
      </h1>
      <p className="tagline">smart transcription. simplified.</p>
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
            {loading ? <Tloading /> : (
              <textarea
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                placeholder="Text will be displayed here."
              />
            )}
          </div>
          <div className="download-section">
            <button className="download-btn pdf" onClick={() => handleDownload("./outputs/summary.pdf")}>DOWNLOAD .pdf</button>
            <button className="download-btn braille" onClick={() => handleDownload("./outputs/summary.brf")}>DOWNLOAD .brf (BRAILLE)</button>
            <button className="download-btn audio" onClick={() => handleDownload("./outputs/summary.mp3")}>DOWNLOAD AUDIO SUMMARY</button>
          </div>
          <div className="audio-section">
            <p className="play" style={{ color: "white" }}>Listen to the summarized content</p>
            <div className="audio-player">
              {audioUrl ? (
                <audio controls>
                  <source src={audioUrl} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              ) : (
                <button className="play-btn" onClick={() => setAudioUrl("https://eminent-monthly-bluegill.ngrok-free.app/download?file_path=./outputs/summary.mp3")}>
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
