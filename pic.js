import sharp from 'sharp';
import fs from 'fs';

async function run() {
  // อ่านไฟล์ภาพจากโฟลเดอร์เดียวกับ pic.js
  const buffer = fs.readFileSync('/Users/salehere/Downloads/ho.jpg');

  const metadata = await sharp(buffer).metadata();

  console.log(metadata);
}

run();
