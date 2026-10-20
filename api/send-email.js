module.exports = async (req, res) => {
  // Izinkan akses dari website Vercel kamu
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { to, subject, html } = req.body;

  if (!to || !subject || !html) {
    return res.status(400).json({ error: 'Data tidak lengkap.' });
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // API KEY KAMU SUDAH DIMASUKKAN DI SINI
        'Authorization': 'Bearer re_6ziA7og4_AC8vqHwyEmcyto2sWnDsRbJK' 
      },
      body: JSON.stringify({
        from: 'Ankraix Motion <onboarding@resend.dev>',
        to: to,
        subject: subject,
        html: html
      })
    });

    const data = await response.json();
    
    if (response.ok) {
      return res.status(200).json({ success: true, data });
    } else {
      console.error("Resend Error:", data);
      return res.status(response.status).json({ success: false, error: data });
    }
  } catch (error) {
    console.error("System Error:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
};
