require('dotenv').config();

const app = require('./app');
const { createIndex } = require('./services/indexService');

const PORT = process.env.PORT || 3000;

async function start() {
  await createIndex();
  app.listen(PORT, () => {
    console.log(`Product search engine listening on port ${PORT}`);
  });
}

start().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
