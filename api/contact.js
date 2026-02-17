export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  try {
    const SCRIPT_URL =
      "https://script.google.com/macros/s/AKfycbw9j05IH3-OibuV2FB81ngaIcSGdvxZoikDLoij2zDb_MDbN_YWiQ8R0NYyLag5m1kjNA/exec";

    const body =
      typeof req.body === "string" ? JSON.parse(req.body) : req.body;

    const upstream = await fetch(SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(body),
    });

    const text = await upstream.text();

    // Important: bubble up upstream errors
    let parsed;
    try {
      parsed = JSON.parse(text);
    } catch {
      return res.status(500).json({
        ok: false,
        error: "Apps Script did not return JSON",
        raw: text.slice(0, 300),
      });
    }

    return res.status(upstream.ok ? 200 : 500).json(parsed);
  } catch (err) {
    return res.status(500).json({ ok: false, error: String(err) });
  }
}
