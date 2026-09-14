CREATE DATABASE IF NOT EXISTS nook;
USE nook;

CREATE TABLE IF NOT EXISTS listings (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  source_url VARCHAR(500) NOT NULL,
  property_type VARCHAR(50) NOT NULL,
  furnished VARCHAR(50),
  bedrooms INT NOT NULL,
  bathrooms INT NOT NULL,
  size_sqm DECIMAL(6,2),
  price_per_month DECIMAL(10,2) NOT NULL,
  original_price DECIMAL(10,2),
  deposit DECIMAL(10,2),
  listed_at DATE,
  description TEXT,
  area VARCHAR(100),
  street VARCHAR(255),
  borough VARCHAR(100),
  postcode VARCHAR(20),
  nearest_station VARCHAR(150),
  crime_score DECIMAL(5,2),
  energy_rating VARCHAR(5),
  internet_speed_mbps INT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS listing_images (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  listing_id BIGINT NOT NULL,
  image_url VARCHAR(500) NOT NULL,
  is_hero BOOLEAN NOT NULL DEFAULT FALSE,
  display_order INT NOT NULL DEFAULT 0,
  FOREIGN KEY (listing_id) REFERENCES listings(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS price_history (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  listing_id BIGINT NOT NULL,
  price_per_month DECIMAL(10,2) NOT NULL,
  recorded_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (listing_id) REFERENCES listings(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS watchlist_items (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  listing_id BIGINT NOT NULL,
  user_reference VARCHAR(100) NOT NULL DEFAULT 'demo-user',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE (listing_id, user_reference),
  FOREIGN KEY (listing_id) REFERENCES listings(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS listing_notes (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  listing_id BIGINT NOT NULL,
  user_reference VARCHAR(100) NOT NULL DEFAULT 'demo-user',
  note TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'saved',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (listing_id) REFERENCES listings(id) ON DELETE CASCADE
);