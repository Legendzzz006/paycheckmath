const fs = require('fs');
const path = require('path');

const salaries = [
  30000, 35000, 40000, 45000, 50000, 55000, 60000, 65000, 70000, 75000,
  80000, 85000, 90000, 95000, 100000, 110000, 120000, 130000, 140000, 150000,
  160000, 170000, 180000, 190000, 200000, 250000, 300000
];

salaries.forEach(salary => {
  const filePath = path.join(__dirname, '..', 'app', `${salary}-a-year-is-how-much-an-hour`, 'page.tsx');
  
  if (!fs.existsSync(filePath)) {
    console.log(`Skipping ${salary} - file not found`);
    return;
  }
  
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Check if already has canonical
  if (content.includes('alternates:')) {
    console.log(`Skipping ${salary} - already has canonical`);
    return;
  }
  
  const url = `https://paycheckmath.com/${salary}-a-year-is-how-much-an-hour`;
  
  // Replace the metadata export
  const oldMetadata = `export const metadata: Metadata = {
  title: content.title,
  description: content.metaDescription,
  openGraph: {
    title: content.title,
    description: content.metaDescription,
    type: 'website',
  },
};`;

  const newMetadata = `export const metadata: Metadata = {
  title: content.title,
  description: content.metaDescription,
  alternates: {
    canonical: '${url}',
  },
  openGraph: {
    title: content.title,
    description: content.metaDescription,
    type: 'website',
    url: '${url}',
  },
  twitter: {
    card: 'summary_large_image',
    title: content.title,
    description: content.metaDescription,
  },
};`;

  content = content.replace(oldMetadata, newMetadata);
  
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`✓ Updated ${salary}`);
});

console.log('\nDone! All salary pages updated with canonical URLs.');
