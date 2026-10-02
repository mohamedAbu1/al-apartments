-- Normalize imported travel media to the current site's canonical image URL.
-- Run once in Hostinger phpMyAdmin after confirming a database backup exists.
-- The operation only changes URL strings; it does not delete image files.

UPDATE trips
SET cover_image = CONCAT('https://montutraveleg.com/images/',
  SUBSTRING_INDEX(
    SUBSTRING_INDEX(REPLACE(cover_image, '/iamges/', '/images/'), '/images/', -1),
    '?', 1
  )
)
WHERE cover_image LIKE '%/images/%';

UPDATE trips
SET gallery_images = REPLACE(
  REPLACE(
    REPLACE(
      REPLACE(gallery_images, '/iamges/', '/images/'),
      'https://onetimelifetravel.com/images/', 'https://montutraveleg.com/images/'
    ),
    'https://www.onetimelifetravel.com/images/', 'https://montutraveleg.com/images/'
  ),
  'https://montutraveleg.com/images/', 'https://montutraveleg.com/images/'
)
WHERE gallery_images IS NOT NULL;

UPDATE trips
SET gallery_images = REPLACE(REPLACE(REPLACE(REPLACE(gallery_images,
  'https://wasettravel.com/images/', 'https://montutraveleg.com/images/'),
  'https://www.wasettravel.com/images/', 'https://montutraveleg.com/images/'),
  'http://onetimelifetravel.com/images/', 'https://montutraveleg.com/images/'),
  'http://montutraveleg.com/images/', 'https://montutraveleg.com/images/')
WHERE gallery_images IS NOT NULL;

UPDATE categories
SET images = REPLACE(
  REPLACE(
    REPLACE(images, 'https://onetimelifetravel.com/images/', 'https://montutraveleg.com/images/'),
    'https://www.onetimelifetravel.com/images/', 'https://montutraveleg.com/images/'
  ),
  'https://montutraveleg.com/images/', 'https://montutraveleg.com/images/'
)
WHERE images IS NOT NULL;

UPDATE categories
SET images = REPLACE(REPLACE(REPLACE(images,
  'https://wasettravel.com/images/', 'https://montutraveleg.com/images/'),
  'https://www.wasettravel.com/images/', 'https://montutraveleg.com/images/'),
  'http://montutraveleg.com/images/', 'https://montutraveleg.com/images/')
WHERE images IS NOT NULL;

UPDATE cities
SET images = REPLACE(
  REPLACE(
    REPLACE(images, 'https://onetimelifetravel.com/images/', 'https://montutraveleg.com/images/'),
    'https://www.onetimelifetravel.com/images/', 'https://montutraveleg.com/images/'
  ),
  'https://montutraveleg.com/images/', 'https://montutraveleg.com/images/'
)
WHERE images IS NOT NULL;

UPDATE cities
SET images = REPLACE(REPLACE(REPLACE(images,
  'https://wasettravel.com/images/', 'https://montutraveleg.com/images/'),
  'https://www.wasettravel.com/images/', 'https://montutraveleg.com/images/'),
  'http://montutraveleg.com/images/', 'https://montutraveleg.com/images/')
WHERE images IS NOT NULL;
