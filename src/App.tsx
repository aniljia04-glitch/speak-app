import { useState } from "react";

export default function App() {
  const [text, setText] = useState("");

  const generateAudio = async () => {
    try {
      const res = await fetch("/api/tts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert("Error: " + JSON.stringify(data));
        return;
      }

      const audioBlob = new Blob(
        [Uint8Array.from(atob(data.audioContent), c => c.charCodeAt(0))],
        { type: "audio/mp3" }
      );

      const url = URL.createObjectURL(audioBlob);

      // ▶️ Play audio
      new Audio(url).play();

      // ⬇️ Download audio
      const a = document.createElement("a");
      a.href = url;
      a.download = "speech.mp3";
      a.click();

    } catch (err) {
      alert("Something went wrong");
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>Text to Speech App 🎤</h1>

      <textarea
        rows={5}
        style={{ width: "100%", padding: 10 }}
        placeholder="Type something..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <br /><br />

      <button
        onClick={generateAudio}
        style={{
          padding: "10px 20px",
          fontSize: 16,
          cursor: "pointer",
        }}
      >
        Generate Audio
      </button>
    </div>
  );
}