const client = require('../config/elasticsearch');
const productMapping = require('../models/productSchema');

const INDEX = process.env.ES_INDEX || 'products';

async function createIndex() {
  const exists = await client.indices.exists({ index: INDEX });
  if (exists) {
    return { created: false };
  }
  await client.indices.create({ index: INDEX, ...productMapping });
  return { created: true };
}

async function deleteIndex() {
  const exists = await client.indices.exists({ index: INDEX });
  if (!exists) {
    return { deleted: false };
  }
  await client.indices.delete({ index: INDEX });
  return { deleted: true };
}

async function indexProduct(product) {
  const body = { ...product, createdAt: product.createdAt || new Date().toISOString() };
  const result = await client.index({
    index: INDEX,
    document: body,
    refresh: 'wait_for',
  });
  return { id: result._id, ...body };
}

async function bulkIndexProducts(products) {
  const operations = products.flatMap((product) => [
    { index: { _index: INDEX } },
    { ...product, createdAt: product.createdAt || new Date().toISOString() },
  ]);

  const bulkResponse = await client.bulk({ refresh: true, operations });

  if (bulkResponse.errors) {
    const erroredItems = bulkResponse.items.filter((item) => item.index && item.index.error);
    throw new Error(`Bulk indexing had ${erroredItems.length} error(s): ${JSON.stringify(erroredItems[0])}`);
  }

  return { indexed: products.length };
}

async function getProductById(id) {
  try {
    const result = await client.get({ index: INDEX, id });
    return { id: result._id, ...result._source };
  } catch (err) {
    if (err.meta && err.meta.statusCode === 404) {
      return null;
    }
    throw err;
  }
}

async function deleteProduct(id) {
  try {
    await client.delete({ index: INDEX, id, refresh: 'wait_for' });
    return true;
  } catch (err) {
    if (err.meta && err.meta.statusCode === 404) {
      return false;
    }
    throw err;
  }
}

module.exports = {
  INDEX,
  createIndex,
  deleteIndex,
  indexProduct,
  bulkIndexProducts,
  getProductById,
  deleteProduct,
};
