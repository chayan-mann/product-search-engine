const productMapping = {
  mappings: {
    properties: {
      name: {
        type: 'text',
        fields: {
          keyword: { type: 'keyword' },
        },
      },
      description: { type: 'text' },
      category: {
        type: 'text',
        fields: {
          keyword: { type: 'keyword' },
        },
      },
      price: { type: 'float' },
      rating: { type: 'float' },
      tags: { type: 'keyword' },
      createdAt: { type: 'date' },
    },
  },
};

module.exports = productMapping;
