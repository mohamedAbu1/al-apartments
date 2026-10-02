-- General website reviews, independent from any journey.
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
