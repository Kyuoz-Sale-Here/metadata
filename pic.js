import sharp from 'sharp';
import fetch from 'node-fetch';

async function run() {
  const imageUrl = process.argv[2]; // รับ URL จาก argument เวลารัน

  if (!imageUrl) {
    console.error('❌ กรุณาใส่ URL ของภาพ เช่น: node pic.js "https://example.com/image.jpg"');
    process.exit(1);
  }

  try {
    const response = await fetch(imageUrl);

    if (!response.ok) {
      throw new Error(`โหลดรูปไม่ได้: ${response.status} ${response.statusText}`);
    }

    const buffer = await response.buffer();
    const metadata = await sharp(buffer).metadata();

    console.log(metadata);
  } catch (err) {
    console.error('❌ Error:', err.message);
  }
}

run();
