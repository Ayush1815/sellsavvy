const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const publicDir = path.join(__dirname, 'public');
const srcDir = path.join(__dirname, 'src');

function walk(dir, fileList = []) {
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walk(fullPath, fileList);
    } else {
      fileList.push(fullPath);
    }
  });
  return fileList;
}

const allMediaFiles = walk(publicDir).filter(f => /\.(png|jpe?g|webp|webm|mp4)$/i.test(f));

let deletedCount = 0;
let recoveredBytes = 0;

for (const filePath of allMediaFiles) {
  const filename = path.basename(filePath);
  // Exception for PWA/manifest icons or SEO images that aren't strictly imported in src/
  if (['og-image.png', 'favicon.ico'].includes(filename)) continue;

  try {
    // Search the src directory for the exact filename
    execSync(`findstr /S /M /C:"${filename}" "${path.join(srcDir, '*')}"`, { stdio: 'ignore' });
    // If it doesn't throw, the file was found in the source code
  } catch (err) {
    // findstr exits with code 1 if no match is found, which throws an error
    // This means the file is NOT used in the codebase.
    try {
      const stats = fs.statSync(filePath);
      recoveredBytes += stats.size;
      fs.unlinkSync(filePath);
      console.log(`Deleted unused file: ${filename}`);
      deletedCount++;
    } catch (deleteErr) {
      console.error(`Failed to delete ${filePath}`, deleteErr);
    }
  }
}

console.log(`\nPruning Complete: Deleted ${deletedCount} unused files.`);
console.log(`Recovered Space: ${(recoveredBytes / 1024 / 1024).toFixed(2)} MB`);
