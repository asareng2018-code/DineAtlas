CREATE TABLE IF NOT EXISTS restaurants (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  food_type VARCHAR(50),
  halal BOOLEAN DEFAULT false,
  buffet BOOLEAN DEFAULT false,
  new_shop BOOLEAN DEFAULT false,
  latitude FLOAT,
  longitude FLOAT
);

INSERT INTO restaurants (name, food_type, halal, buffet, new_shop, latitude, longitude)
VALUES
  ('Saffron Bites', 'Indian', true, false, true, 1.3521, 103.8198),
  ('Harbor Grill', 'Seafood', true, true, false, 1.2903, 103.8519),
  ('Garden Table', 'Mediterranean', false, false, true, 1.3344, 103.7420)
ON CONFLICT DO NOTHING;
