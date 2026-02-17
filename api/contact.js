export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  try {
    const SCRIPT_URL =
      "https://script.google.com/macros/s/AKfycbw9j05IH3-OibuV2FB81ngaIcSGdvxZoikDLoij2zDb_MDbN_YWiQ8R0NYyLag5m1kjNA/exec";

    const upstream = await fetch(SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(req.body),
    });

    const text = await upstream.text();

    try {
      const json = JSON.parse(text);
      return res.status(200).json(json);
    } catch {
      return res.status(200).json({ ok: true, raw: text });
    }
  } catch (err) {
    return res.status(500).json({ ok: false, error: String(err) });
  }
}
