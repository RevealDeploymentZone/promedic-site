export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const {
    orderNum, fullName, email, phone,
    address, city, state, zip,
    items, subtotal, shipping, total,
    paymentMethod, notes
  } = req.body;

  const fullAddress = `${address}, ${city}, ${state} ${zip}`;

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px">
      <h2 style="color:#4E8B88;border-bottom:2px solid #4E8B88;padding-bottom:10px">
        🛒 New Order Received — #${orderNum}
      </h2>
      <table style="width:100%;border-collapse:collapse;margin:16px 0">
        <tr style="background:#f9f9f9"><td style="padding:10px;font-weight:bold;width:35%">Customer</td><td style="padding:10px">${fullName}</td></tr>
        <tr><td style="padding:10px;font-weight:bold">Email</td><td style="padding:10px">${email}</td></tr>
        <tr style="background:#f9f9f9"><td style="padding:10px;font-weight:bold">Phone</td><td style="padding:10px">${phone}</td></tr>
        <tr><td style="padding:10px;font-weight:bold">Ship To</td><td style="padding:10px">${fullAddress}</td></tr>
        <tr style="background:#f9f9f9"><td style="padding:10px;font-weight:bold">Payment</td><td style="padding:10px">${paymentMethod}</td></tr>
      </table>
      <h3 style="color:#4E8B88">Items Ordered</h3>
      <pre style="background:#f4f4f4;padding:14px;border-radius:8px;font-size:14px">${items}</pre>
      <table style="width:100%;margin-top:10px">
        <tr><td style="padding:6px"><strong>Subtotal:</strong></td><td style="padding:6px">${subtotal}</td></tr>
        <tr><td style="padding:6px"><strong>Shipping:</strong></td><td style="padding:6px">${shipping}</td></tr>
        <tr style="font-size:18px;color:#4E8B88"><td style="padding:8px"><strong>TOTAL:</strong></td><td style="padding:8px"><strong>${total}</strong></td></tr>
      </table>
      ${notes ? `<p style="margin-top:16px"><strong>Notes:</strong> ${notes}</p>` : ''}
      <p style="color:#888;font-size:12px;margin-top:24px">Promedic — Automated Order Notification</p>
    </div>
  `;

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'Promedic Orders <orders@promediic.com>',
        to: ['promedic.rx@gmail.com'],
        subject: `New Order #${orderNum} — ${fullName} — ${total}`,
        html
      })
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Resend error');
    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
