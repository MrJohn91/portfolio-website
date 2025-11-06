// Simple script to create a favicon using Node.js
const fs = require('fs');
const { createCanvas } = require('canvas');

const size = 32;
const canvas = createCanvas(size, size);
const ctx = canvas.getContext('2d');

// Create gradient background matching website colors
const gradient = ctx.createLinearGradient(0, 0, size, size);
gradient.addColorStop(0, '#64FFDA'); // Teal
gradient.addColorStop(0.5, '#a78bfa'); // Purple
gradient.addColorStop(1, '#60a5fa'); // Blue

ctx.fillStyle = gradient;
ctx.fillRect(0, 0, size, size);

// Draw 'JI' text
ctx.fillStyle = '#121218'; // Dark background color for contrast
ctx.font = 'bold 18px Arial';
ctx.textAlign = 'center';
ctx.textBaseline = 'middle';
ctx.fillText('JI', size / 2, size / 2);

// Save as PNG first, then we'll convert to ICO
const buffer = canvas.toBuffer('image/png');
fs.writeFileSync('frontend/app/favicon-temp.png', buffer);
console.log('Favicon PNG created');

