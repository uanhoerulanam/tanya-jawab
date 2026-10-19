module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  let body = req.body || {};
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch (e) { body = {}; }
  }

  const judul = body.judul || "Pesan Baru!";
  const isi = body.isi || "Ada pesan baru di Ruang Dengar.";

  try {
    // 1. Gunakan endpoint terbaru: api.onesignal.com
    const response = await fetch("https://api.onesignal.com/notifications", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        // 2. Pastikan ada spasi setelah kata 'Key'
        "Authorization": "Key os_v2_app_nhytn5kybze5xbltqp532iez2ghnjmqzvsfesxe4srpxsy55v6tbgktkagft3n2qfi57ytpz4zdjxmzgawnzmzdjqhntw2453tk3ana"
      },
      body: JSON.stringify({
        app_id: "69f136f5-580e-49db-8573-83fbbd2099d1",
        included_segments: ["All"],
        headings: { "en": judul },
        contents: { "en": isi },
        url: "https://maungomongapasibyuan.vercel.app"
      })
    });

    const data = await response.json();
    console.log("Balasan OneSignal:", data);

    // 3. Kembalikan status asli dari OneSignal
    return res.status(response.status).json(data);
    
  } catch (error) {
    console.error("Error sistem:", error);
    return res.status(500).json({ error: error.message });
  }
};
