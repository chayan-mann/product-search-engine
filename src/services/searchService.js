const client = require('../config/elasticsearch');
const { INDEX } = require('./indexService');

async function searchProducts({ q, category, minPrice, maxPrice, minRating, page = 1, size = 10 }) {
  const must = [];
  const filter = [];

  if (q) {
    must.push({
      multi_match: {
        query: q,
        fields: ['name^3', 'description', 'category'],
        fuzziness: 'AUTO',
      },
    });
  } else {
    must.push({ match_all: {} });
  }

  if (category) {
    filter.push({ term: { 'category.keyword': category } });
  }

  if (minPrice !== undefined || maxPrice !== undefined) {
    const range = {};
    if (minPrice !== undefined) range.gte = minPrice;
    if (maxPrice !== undefined) range.lte = maxPrice;
    filter.push({ range: { price: range } });
  }

  if (minRating !== undefined) {
    filter.push({ range: { rating: { gte: minRating } } });
  }

  const from = (Math.max(page, 1) - 1) * size;

  const result = await client.search({
    index: INDEX,
    from,
    size,
    query: {
      bool: { must, filter },
    },
  });

  return {
    total: result.hits.total.value,
    page: Number(page),
    size: Number(size),
    results: result.hits.hits.map((hit) => ({ id: hit._id, score: hit._score, ...hit._source })),
  };
}

module.exports = { searchProducts };
