// route.js
export async function POST(req) {
  const { message } = await req.json();

  const reply = await sendMessageToGemini(message);
  return Response.json({ reply });
}

// Fungsi langsung ditulis di sini (tidak lagi import dari lib/gemini.js)
async function sendMessageToGemini(userMessage) {
  const apiKey = process.env.GEMINI_API_KEY;
  const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=' + apiKey;

  const requestBody = {
    contents: [
      {
        parts: [{ text: userMessage }]
      }
    ]
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody)
    });

    const data = await response.json();

    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    return text || 'Maaf, saya tidak bisa menjawab saat ini.';
  } catch (error) {
    console.error('Error talking to Gemini:', error);
    return 'Terjadi kesalahan saat menghubungi AI.';
  }
}
