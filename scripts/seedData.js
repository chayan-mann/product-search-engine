require('dotenv').config();

const { createIndex, deleteIndex, bulkIndexProducts } = require('../src/services/indexService');

const products = [
  { name: 'Wireless Bluetooth Headphones', description: 'Over-ear noise cancelling headphones with 30-hour battery life', category: 'Electronics', price: 89.99, rating: 4.5, tags: ['audio', 'wireless', 'bluetooth'] },
  { name: 'Mechanical Keyboard RGB', description: 'Tactile mechanical keyboard with customizable RGB backlighting', category: 'Electronics', price: 129.99, rating: 4.7, tags: ['keyboard', 'gaming', 'rgb'] },
  { name: '4K Ultra HD Smart TV 55-inch', description: 'Smart television with HDR support and built-in streaming apps', category: 'Electronics', price: 549.99, rating: 4.3, tags: ['tv', 'smart-home', '4k'] },
  { name: 'Stainless Steel Water Bottle', description: 'Insulated water bottle that keeps drinks cold for 24 hours', category: 'Home & Kitchen', price: 24.99, rating: 4.6, tags: ['hydration', 'eco-friendly'] },
  { name: 'Non-Stick Frying Pan Set', description: 'Set of 3 non-stick frying pans with ergonomic handles', category: 'Home & Kitchen', price: 45.5, rating: 4.2, tags: ['cookware', 'kitchen'] },
  { name: 'Robot Vacuum Cleaner', description: 'Smart robot vacuum with mapping technology and app control', category: 'Home & Kitchen', price: 299.99, rating: 4.4, tags: ['smart-home', 'cleaning'] },
  { name: 'Running Shoes Men', description: 'Lightweight breathable running shoes with cushioned sole', category: 'Sportswear', price: 79.99, rating: 4.5, tags: ['running', 'footwear'] },
  { name: 'Yoga Mat Non-Slip', description: 'Extra thick yoga mat with non-slip surface for all workouts', category: 'Sportswear', price: 19.99, rating: 4.8, tags: ['yoga', 'fitness'] },
  { name: 'Adjustable Dumbbell Set', description: 'Space-saving adjustable dumbbells from 5 to 50 lbs', category: 'Sportswear', price: 199.99, rating: 4.6, tags: ['strength', 'home-gym'] },
  { name: 'Organic Cotton T-Shirt', description: 'Soft breathable organic cotton t-shirt in classic fit', category: 'Clothing', price: 22.0, rating: 4.1, tags: ['casual', 'organic'] },
  { name: 'Denim Jacket Unisex', description: 'Classic denim jacket with a timeless silhouette', category: 'Clothing', price: 59.99, rating: 4.3, tags: ['outerwear', 'denim'] },
  { name: 'Leather Wallet Bifold', description: 'Genuine leather bifold wallet with RFID blocking', category: 'Accessories', price: 34.99, rating: 4.4, tags: ['leather', 'wallet'] },
  { name: 'Sunglasses Polarized', description: 'UV400 polarized sunglasses with lightweight frame', category: 'Accessories', price: 27.5, rating: 4.2, tags: ['eyewear', 'summer'] },
  { name: 'Mystery Thriller Novel', description: 'Bestselling mystery thriller that keeps you guessing until the end', category: 'Books', price: 14.99, rating: 4.7, tags: ['fiction', 'thriller'] },
  { name: 'Cookbook for Beginners', description: 'Easy recipes and step-by-step guides for beginner cooks', category: 'Books', price: 18.99, rating: 4.5, tags: ['cooking', 'nonfiction'] },
  { name: 'Wooden Building Blocks', description: 'Educational wooden building blocks set for toddlers', category: 'Toys', price: 29.99, rating: 4.9, tags: ['educational', 'toddler'] },
  { name: 'Remote Control Car', description: 'High-speed remote control car with rechargeable battery', category: 'Toys', price: 39.99, rating: 4.3, tags: ['rc', 'outdoor'] },
  { name: 'Facial Cleansing Brush', description: 'Electric facial cleansing brush for deep pore cleaning', category: 'Beauty', price: 32.99, rating: 4.1, tags: ['skincare', 'electric'] },
  { name: 'Hair Dryer Ionic', description: 'Fast-drying ionic hair dryer with multiple heat settings', category: 'Beauty', price: 44.99, rating: 4.4, tags: ['haircare', 'ionic'] },
  { name: 'Stainless Steel Cookware Set', description: '10-piece stainless steel cookware set for every kitchen', category: 'Home & Kitchen', price: 149.99, rating: 4.6, tags: ['cookware', 'kitchen'] },
  { name: 'Wireless Gaming Mouse', description: 'Ergonomic wireless gaming mouse with adjustable DPI', category: 'Electronics', price: 49.99, rating: 4.5, tags: ['gaming', 'wireless'] },
  { name: 'Portable Bluetooth Speaker', description: 'Waterproof portable speaker with 12-hour playtime', category: 'Electronics', price: 59.99, rating: 4.4, tags: ['audio', 'portable'] },
  { name: 'Camping Tent 4-Person', description: 'Weatherproof camping tent that fits up to 4 people', category: 'Sportswear', price: 129.99, rating: 4.5, tags: ['camping', 'outdoor'] },
  { name: 'Winter Puffer Jacket', description: 'Warm insulated puffer jacket for cold weather', category: 'Clothing', price: 89.0, rating: 4.2, tags: ['winter', 'outerwear'] },
  { name: 'Science Fiction Box Set', description: 'Complete box set of an acclaimed science fiction series', category: 'Books', price: 49.99, rating: 4.8, tags: ['fiction', 'sci-fi'] },
];

async function seed() {
  console.log('Resetting index...');
  await deleteIndex();
  await createIndex();

  console.log(`Indexing ${products.length} products...`);
  const result = await bulkIndexProducts(products);

  console.log(`Done. Indexed ${result.indexed} products.`);
  process.exit(0);
}

seed().catch((err) => {
  console.error('Seeding failed:', err);
  process.exit(1);
});
