const fs = require('fs');
const path = require('path');
const packageGame = require('./packageGame');

async function run() {
  const gameDir = path.join(__dirname, 'example-game');
  const zipPath = path.join(__dirname, 'example-game.zip');

  // Create a sample game directory with index.html
  if (!fs.existsSync(gameDir)) {
    fs.mkdirSync(gameDir);
  }
  fs.writeFileSync(path.join(gameDir, 'index.html'), '<html><body>Example Game</body></html>');
  fs.writeFileSync(path.join(gameDir, 'asset.txt'), 'Example asset');

  await packageGame(gameDir, zipPath);
  if (fs.existsSync(zipPath)) {
    console.log('ZIP created:', zipPath);
  } else {
    throw new Error('ZIP was not created');
  }
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
