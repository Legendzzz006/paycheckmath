const fs = require('fs');
const path = require('path');

// Routes that need trailing slashes (excluding root "/" and external links)
const routesToFix = [
  '/salary-to-hourly',
  '/overtime-calculator',
  '/biweekly-paycheck-calculator',
  '/take-home-pay-calculator',
  '/monthly-income-calculator',
  '/part-time-salary-calculator',
  '/salary-comparison-calculator',
  '/raise-calculator',
  '/about',
  '/contact',
  '/privacy-policy',
  '/terms-of-service',
  '/disclaimer',
];

function fixTrailingSlashes(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  routesToFix.forEach(route => {
    // Fix href="route" to href="route/"
    const pattern1 = new RegExp(`href="${route}"`, 'g');
    if (content.match(pattern1)) {
      content = content.replace(pattern1, `href="${route}/"`);
      modified = true;
    }

    // Fix href='route' to href='route/'
    const pattern2 = new RegExp(`href='${route}'`, 'g');
    if (content.match(pattern2)) {
      content = content.replace(pattern2, `href='${route}/'`);
      modified = true;
    }
  });

  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Fixed: ${filePath}`);
    return true;
  }
  return false;
}

function getAllFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);

  files.forEach(file => {
    const filePath = path.join(dirPath, file);
    if (fs.statSync(filePath).isDirectory()) {
      if (!file.startsWith('.') && file !== 'node_modules' && file !== 'out') {
        arrayOfFiles = getAllFiles(filePath, arrayOfFiles);
      }
    } else if (file.endsWith('.tsx')) {
      arrayOfFiles.push(filePath);
    }
  });

  return arrayOfFiles;
}

const rootDir = path.join(__dirname, '..');
const files = getAllFiles(rootDir);

console.log(`Found ${files.length} TSX files to check...\n`);

let fixedCount = 0;
files.forEach(file => {
  if (fixTrailingSlashes(file)) {
    fixedCount++;
  }
});

console.log(`\n✅ Fixed ${fixedCount} files with trailing slashes!`);
console.log('\n🎯 Next steps:');
console.log('1. Review the changes');
console.log('2. Run: npm run build');
console.log('3. Redeploy to Cloudflare Pages');
