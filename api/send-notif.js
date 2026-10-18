export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { judul, isi } = req.body;

  try {
    const response = await fetch("https://onesignal.com/api/v1/notifications", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Key os_v2_app_nhytn5kybze5xbltqp532iez2ghnjmqzvsfesxe4srpxsy55v6tbgktkagft3n2qfi57ytpz4zdjxmzgawnzmzdjqhntw2453tk3ana"
      },
      body: JSON.stringify({
        app_id: "69f136f5-580e-49db-8573-83fbbd2099d1",
        included_segments: ["Total Subscriptions", "Subscribed Users"],
        headings: { "en": judul },
        contents: { "en": isi },
        url: "https://ankraixmotionruangdengar.vercel.app"
      })
    });

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
