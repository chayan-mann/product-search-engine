# Setup & Usage

All commands below assume you're in the project root (`product-search-engine/`) and that Docker is already running.

## 1. Start Elasticsearch

```bash
docker compose up -d
```

## 2. Verify Elasticsearch is up

```bash
curl http://localhost:9200
```

You should see a JSON response with cluster/version info. If it's not ready yet, wait a few seconds and retry.

## 3. Install dependencies

```bash
npm install
```

## 4. Configure environment

```bash
cp .env.example .env
```

## 5. Create the index and load sample data

This creates the `products` index with the correct mapping and bulk-loads ~25 sample products.

```bash
npm run seed
```

## 6. Start the API server

```bash
npm run dev
```

The server starts on `http://localhost:3000` (health check at `GET /health`).

---

## API Examples

### Full-text search

```bash
curl "http://localhost:3000/api/products/search?q=wireless+headphones"
```

### Filter by category

```bash
curl "http://localhost:3000/api/products/search?category=Electronics"
```

### Filter by price range

```bash
curl "http://localhost:3000/api/products/search?minPrice=20&maxPrice=100"
```

### Filter by minimum rating

```bash
curl "http://localhost:3000/api/products/search?minRating=4.5"
```

### Combined search + filters

```bash
curl "http://localhost:3000/api/products/search?q=shoes&category=Sportswear&minPrice=50&maxPrice=150&minRating=4&page=1&size=10"
```

### Get a single product by ID

```bash
curl "http://localhost:3000/api/products/<product_id>"
```

(Use an `id` returned from a search response above.)

### Create a new product

```bash
curl -X POST "http://localhost:3000/api/products" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Smart Fitness Watch",
    "description": "Tracks heart rate, sleep, and workouts with GPS",
    "category": "Electronics",
    "price": 149.99,
    "rating": 4.6,
    "tags": ["wearable", "fitness"]
  }'
```

### Bulk create products

```bash
curl -X POST "http://localhost:3000/api/products/bulk" \
  -H "Content-Type: application/json" \
  -d '{
    "products": [
      { "name": "Ceramic Coffee Mug", "description": "12oz ceramic mug, dishwasher safe", "category": "Home & Kitchen", "price": 9.99, "rating": 4.3, "tags": ["kitchen"] },
      { "name": "Desk Lamp LED", "description": "Adjustable LED desk lamp with USB charging port", "category": "Electronics", "price": 34.99, "rating": 4.5, "tags": ["lighting", "desk"] }
    ]
  }'
```

### Delete a product

```bash
curl -X DELETE "http://localhost:3000/api/products/<product_id>"
```

---

## Teardown

```bash
docker compose down
```

Add `-v` to also remove the Elasticsearch data volume:

```bash
docker compose down -v
```
