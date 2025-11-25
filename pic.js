import sharp from "sharp";

export default async function handler(req, res) {
  try {
    const url = req.query.url;

    if (!url) {
      return res.status(400).json({ error: "Missing ?url=" });
    }

    // โหลด binary จาก URL
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // อ่าน metadata
    const metadata = await sharp(buffer).metadata();

    return res.status(200).json(metadata);

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
}
