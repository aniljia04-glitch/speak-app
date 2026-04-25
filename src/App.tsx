import { useState } from "react";

export default function App() {
  const [text, setText] = useState("");

  const speakText = () => {
    if (!text) {
      alert("Please enter text");
      return;
    }

    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "en-US"; // change language if needed

    window.speechSynthesis.speak(speech);
  };

  return (
    <div style={{ textAlign: "center", padding: "40px" }}>
      <h1>Text to Speech</h1>

      <textarea
        rows={5}
        cols={50}
        placeholder="Type something..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ padding: "10px", fontSize: "16px" }}
      />

      <br /><br />

      <button
        onClick={speakText}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer"
        }}
      >
        🔊 Speak
      </button>
    </div>
  );
}