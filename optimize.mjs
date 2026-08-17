import sharp from "sharp";
import fs from "fs";
import path from "path";

const dirs = ["client/public", "client/public/images"];

async function optimize() {
  for (const dir of dirs) {
    if (!fs.existsSync(dir)) continue;
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const ext = path.extname(file).toLowerCase();
      if (![".jpg", ".jpeg", ".png"].includes(ext)) continue;
      
      const inputPath = path.join(dir, file);
      const name = path.basename(file, ext);
      const outputPath = path.join(dir, name + ".webp");
      
      if (fs.existsSync(outputPath)) continue;
      
      try {
        const img = sharp(inputPath);
        await img.webp({ quality: 95, effort: 4 }).toFile(outputPath);
        
        const oldSize = (fs.statSync(inputPath).size / 1024).toFixed(1);
        const newSize = (fs.statSync(outputPath).size / 1024).toFixed(1);
        const saved = ((1 - fs.statSync(outputPath).size / fs.statSync(inputPath).size) * 100).toFixed(1);
        
        console.log(name + ext + " -> " + name + ".webp | " + oldSize + "KB -> " + newSize + "KB (%" + saved + " kuculdu)");
      } catch(e) {
        console.log("HATA: " + inputPath + " - " + e.message);
      }
    }
  }
  console.log("\nTamam!");
}

optimize();
