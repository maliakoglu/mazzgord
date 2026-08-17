import sharp from "sharp";
import fs from "fs";

const dir = "client/public/images";
const targets = ["proje-5-thumb.webp", "proje-6-thumb.webp"];

async function shrink() {
  for (const file of targets) {
    const inputPath = `${dir}/${file}`;
    if (!fs.existsSync(inputPath)) continue;
    
    const oldSize = (fs.statSync(inputPath).size / 1024).toFixed(1);
    
    await sharp(inputPath)
      .resize(350)
      .webp({ quality: 75 })
      .toFile(inputPath + ".tmp");
    
    fs.renameSync(inputPath + ".tmp", inputPath);
    
    const newSize = (fs.statSync(inputPath).size / 1024).toFixed(1);
    console.log(`${file}: ${oldSize}KB -> ${newSize}KB`);
  }
  console.log("\nTamam!");
}

shrink();
