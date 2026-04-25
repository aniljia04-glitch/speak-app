export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    const text = body?.text;

    if (!text) {
      return res.status(400).json({ error: "Text required" });
    }

    const API_KEY = process.env.GOOGLE_TTS_API_KEY;

    const response = await fetch(
      `https://texttospeech.googleapis.com/v1/text:synthesize?key=${API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          input: { text },
          voice: {
            languageCode: "en-US",
            name: "en-US-Wavenet-F", // female voice
          },
          audioConfig: {
            audioEncoding: "MP3",
          },
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(400).json(data);
    }

    res.status(200).json({ audioContent: data.audioContent });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}