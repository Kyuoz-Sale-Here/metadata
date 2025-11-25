export const config = {
  runtime: "nodejs18.x",
};

import sharp from "sharp";

export default async function handler(req, res) {
  try {
    const { url } = req.query;

    if (!url) {
      return res.status(400).json({ error: "Missing image url" });
    }

    const response = await fetch(url);
    if (!response.ok) {
      return res.status(400).json({ error: "Cannot fetch image" });
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const metadata = await sharp(buffer).metadata();

    return res.status(200).json(metadata);
  } catch (error) {
    console.error("🔥 Server Error:", error);
    return res.status(500).json({ error: error.message });
  }
}
