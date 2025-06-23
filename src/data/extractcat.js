// import fs from 'fs';

// // Adjust the relative path to your JSON file as needed
// const productsJsonPath = new URL('./merged_products.json', import.meta.url);

// const productsData = await fs.promises.readFile(productsJsonPath, 'utf-8');
// const products = JSON.parse(productsData);

// const categoriesSet = new Set();

// products.forEach(p => {
//   if (p.category) categoriesSet.add(p.category.trim());
// });

// console.log("All unique categories:", Array.from(categoriesSet).sort());
