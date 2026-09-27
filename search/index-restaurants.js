const { Client } = require('@elastic/elasticsearch');

const client = new Client({ node: process.env.ELASTICSEARCH_URL || 'http://localhost:9200' });

async function createIndex() {
  const indexName = 'restaurants';

  const exists = await client.indices.exists({ index: indexName });

  if (!exists) {
    await client.indices.create({
      index: indexName,
      body: {
        mappings: {
          properties: {
            name: { type: 'text' },
            food_type: { type: 'keyword' },
            halal: { type: 'boolean' },
            buffet: { type: 'boolean' },
            new_shop: { type: 'boolean' },
            latitude: { type: 'geo_point' },
            longitude: { type: 'geo_point' },
          },
        },
      },
    });
  }

  const docs = [
    {
      name: 'Saffron Bites',
      food_type: 'Indian',
      halal: true,
      buffet: false,
      new_shop: true,
      latitude: 1.3521,
      longitude: 103.8198,
    },
    {
      name: 'Harbor Grill',
      food_type: 'Seafood',
      halal: true,
      buffet: true,
      new_shop: false,
      latitude: 1.2903,
      longitude: 103.8519,
    },
    {
      name: 'Garden Table',
      food_type: 'Mediterranean',
      halal: false,
      buffet: false,
      new_shop: true,
      latitude: 1.3344,
      longitude: 103.742,
    },
  ];

  for (const doc of docs) {
    await client.index({
      index: indexName,
      document: doc,
    });
  }

  await client.indices.refresh({ index: indexName });

  const result = await client.search({
    index: indexName,
    body: {
      query: {
        match_all: {},
      },
    },
  });

  console.log('Indexed documents:', result.body.hits.total.value);
}

createIndex().catch((error) => {
  console.error('Elasticsearch setup failed:', error.message);
  process.exit(1);
});
