-- Montu Travel / Hostinger travel catalog schema.
-- The supplied exports contain INSERT statements only. These tables are kept
-- separate from the Prisma property/auth tables and use utf8mb4 JSON text so
-- the multilingual source data can be imported without losing any locale.
SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

CREATE TABLE IF NOT EXISTS categories (
  id VARCHAR(64) NOT NULL PRIMARY KEY,
  created_at DATETIME NULL,
  images LONGTEXT NULL,
  name LONGTEXT NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS cities (
  id VARCHAR(64) NOT NULL PRIMARY KEY,
  created_at DATETIME NULL,
  images LONGTEXT NULL,
  name LONGTEXT NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS currency_rates (
  id VARCHAR(64) NOT NULL PRIMARY KEY,
  currency VARCHAR(12) NOT NULL,
  rate DECIMAL(12,4) NOT NULL,
  updated_at DATETIME NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS trips (
  id VARCHAR(64) NOT NULL PRIMARY KEY,
  title LONGTEXT NOT NULL,
  description LONGTEXT NULL,
  cover_image VARCHAR(1000) NULL,
  solo_price DECIMAL(12,2) NULL,
  group_price DECIMAL(12,2) NULL,
  created_at DATETIME NULL,
  priceLevel VARCHAR(40) NULL,
  updated_at DATETIME NULL,
  duration INT NULL,
  currency VARCHAR(12) NULL,
  duration_unit VARCHAR(24) NULL,
  gallery_images LONGTEXT NULL,
  discount_percent DECIMAL(7,2) NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS trip_categories (
  id VARCHAR(64) NOT NULL PRIMARY KEY,
  created_at DATETIME NULL,
  trip_id VARCHAR(64) NOT NULL,
  category_id VARCHAR(64) NOT NULL,
  KEY idx_trip_categories_trip (trip_id),
  KEY idx_trip_categories_category (category_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS trip_cities (
  id VARCHAR(64) NOT NULL PRIMARY KEY,
  created_at DATETIME NULL,
  trip_id VARCHAR(64) NOT NULL,
  city_id VARCHAR(64) NOT NULL,
  KEY idx_trip_cities_trip (trip_id),
  KEY idx_trip_cities_city (city_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS trip_days (
  id VARCHAR(64) NOT NULL PRIMARY KEY,
  created_at DATETIME NULL,
  trip_id VARCHAR(64) NOT NULL,
  day_number INT NOT NULL,
  KEY idx_trip_days_trip (trip_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS day_activities (
  id VARCHAR(64) NOT NULL PRIMARY KEY,
  created_at DATETIME NULL,
  time VARCHAR(32) NULL,
  activity_translations LONGTEXT NOT NULL,
  day_id VARCHAR(64) NOT NULL,
  KEY idx_day_activities_day (day_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS includes (
  id VARCHAR(64) NOT NULL PRIMARY KEY,
  created_at DATETIME NULL,
  trip_id VARCHAR(64) NOT NULL,
  include_translations LONGTEXT NOT NULL,
  KEY idx_includes_trip (trip_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS reviews (
  id VARCHAR(64) NOT NULL PRIMARY KEY,
  created_at DATETIME NULL,
  trip_id VARCHAR(64) NOT NULL,
  user_id VARCHAR(64) NULL,
  comment TEXT NULL,
  avatar_url VARCHAR(1000) NULL,
  time VARCHAR(64) NULL,
  name VARCHAR(190) NULL,
  rating TINYINT UNSIGNED NULL,
  KEY idx_reviews_trip (trip_id),
  KEY idx_reviews_user (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS site_reviews (
  id VARCHAR(64) NOT NULL PRIMARY KEY,
  user_id VARCHAR(64) NULL,
  name VARCHAR(190) NOT NULL,
  comment TEXT NOT NULL,
  rating TINYINT UNSIGNED NOT NULL DEFAULT 5,
  avatar_url VARCHAR(1000) NULL,
  status VARCHAR(24) NOT NULL DEFAULT 'published',
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  KEY idx_site_reviews_status_created (status, created_at),
  KEY idx_site_reviews_user (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS purchases (
  id VARCHAR(64) NOT NULL PRIMARY KEY,
  created_at DATETIME NULL,
  trip_id VARCHAR(64) NOT NULL,
  user_id VARCHAR(64) NULL,
  has_children TINYINT(1) NULL,
  has_pets TINYINT(1) NULL,
  has_guide TINYINT(1) NULL,
  num_persons INT NULL,
  num_children INT NULL,
  pet_type LONGTEXT NULL,
  guide_languages LONGTEXT NULL,
  arrival_date DATETIME NULL,
  departure_date DATETIME NULL,
  updated_at DATETIME NULL,
  platform VARCHAR(32) NULL,
  status VARCHAR(40) NULL,
  user_name VARCHAR(190) NULL,
  user_email VARCHAR(191) NULL,
  user_image VARCHAR(1000) NULL,
  KEY idx_purchases_trip (trip_id),
  KEY idx_purchases_user (user_id),
  KEY idx_purchases_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS messages (
  id VARCHAR(64) NOT NULL PRIMARY KEY,
  created_at DATETIME NULL,
  content TEXT NULL,
  sender_type VARCHAR(32) NULL,
  user_name VARCHAR(190) NULL,
  user_image VARCHAR(1000) NULL,
  status VARCHAR(32) NULL,
  updated_at DATETIME NULL,
  admin_id VARCHAR(64) NULL,
  reply_to VARCHAR(64) NULL,
  user_id VARCHAR(64) NULL,
  KEY idx_messages_user (user_id),
  KEY idx_messages_admin (admin_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS notifications (
  id VARCHAR(64) NOT NULL PRIMARY KEY,
  admin_id VARCHAR(64) NULL,
  event_type VARCHAR(64) NULL,
  message TEXT NULL,
  created_at DATETIME NULL,
  is_read TINYINT(1) NULL,
  user_name VARCHAR(190) NULL,
  user_email VARCHAR(191) NULL,
  user_image VARCHAR(1000) NULL,
  trip_id VARCHAR(64) NULL,
  user_id VARCHAR(64) NULL,
  message_id VARCHAR(64) NULL,
  type VARCHAR(64) NULL,
  comment_id VARCHAR(64) NULL,
  KEY idx_notifications_admin (admin_id),
  KEY idx_notifications_user (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS push_tokens (
  id VARCHAR(64) NOT NULL PRIMARY KEY,
  user_id VARCHAR(64) NULL,
  token VARCHAR(1000) NOT NULL,
  created_at DATETIME NULL,
  KEY idx_push_tokens_user (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

SET FOREIGN_KEY_CHECKS = 1;
