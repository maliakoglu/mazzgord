import sharp from "sharp";
import fs from "fs";

const dir = "client/public/images";
const files = fs.readdirSync(dir).filter(f => f.endsWith(".webp"));

async function resize() {
  for (const file of files) {
    const inputPath = `${dir}/${file}`;
    const name = file.replace(".webp", "");
    const outputPath = `${dir}/${name}-thumb.webp`;
    
    try {
      const img = sharp(inputPath);
      const meta = await img.metadata();
      
      // Max 400px genislik - galeri thumbnalleri icin ideal
      await img.resize(400).webp({ quality: 85 }).toFile(outputPath);
      
      const oldSize = (fs.statSync(inputPath).size / 1024).toFixed(1);
      const newSize = (fs.statSync(outputPath).size / 1024).toFixed(1);
      
      console.log(`${file}: ${oldSize}KB -> ${newSize}KB (thumb)`);
    } catch(e) {
      console.log(`HATA: ${file} - ${e.message}`);
    }
  }
  console.log("\nTamam!");
}

resize();
