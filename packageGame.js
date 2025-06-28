const fs = require('fs');
const path = require('path');
const JSZip = require('jszip');

/**
 * Packages a game directory into a ZIP archive.
 * @param {string} gameDir - Path to the directory containing the game files.
 * @param {string} outputZip - Destination path for the generated ZIP file.
 * @returns {Promise<void>} Resolves when the ZIP file has been written.
 */
async function packageGame(gameDir, outputZip) {
  if (!fs.existsSync(gameDir)) {
    throw new Error(`Game directory not found: ${gameDir}`);
  }

  const zip = new JSZip();

  function addDirToZip(dir, zipFolder) {
    const entries = fs.readdirSync(dir);
    for (const entry of entries) {
      const fullPath = path.join(dir, entry);
      const stats = fs.statSync(fullPath);
      if (stats.isDirectory()) {
        const childFolder = zipFolder.folder(entry);
        addDirToZip(fullPath, childFolder);
      } else {
        const data = fs.readFileSync(fullPath);
        zipFolder.file(entry, data);
      }
    }
  }

  addDirToZip(gameDir, zip);

  // Ensure index.html exists and is placed at the root of the ZIP
  const indexPath = path.join(gameDir, 'index.html');
  if (fs.existsSync(indexPath)) {
    zip.file('index.html', fs.readFileSync(indexPath));
  }

  const content = await zip.generateAsync({ type: 'nodebuffer' });
  fs.writeFileSync(outputZip, content);
}

module.exports = packageGame;
