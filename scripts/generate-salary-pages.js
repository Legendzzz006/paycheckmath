const fs = require('fs');
const path = require('path');

const popularSalaries = [
  30000, 35000, 40000, 45000, 50000, 55000, 60000, 65000, 70000, 75000,
  80000, 85000, 90000, 95000, 100000, 110000, 120000, 130000, 140000, 150000,
  160000, 170000, 180000, 190000, 200000, 250000, 300000
];

const outDir = path.join(__dirname, '../out');
const templatePath = path.join(outDir, '[salary]-a-year-is-how-much-an-hour/index.html');

// Check if template exists
if (!fs.existsSync(templatePath)) {
  console.error('Template not found at:', templatePath);
  process.exit(1);
}

const template = fs.readFileSync(templatePath, 'utf8');

console.log('Generating salary pages...');

popularSalaries.forEach(salary => {
  const dirName = `${salary}-a-year-is-how-much-an-hour`;
  const dirPath = path.join(outDir, dirName);
  
  // Create directory
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
  
  // Copy template
  const outputPath = path.join(dirPath, 'index.html');
  fs.writeFileSync(outputPath, template);
  
  console.log(`Created: ${dirName}/`);
});

console.log(`\nGenerated ${popularSalaries.length} salary pages successfully!`);
