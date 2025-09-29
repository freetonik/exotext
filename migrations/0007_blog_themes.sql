-- Migration number: 0007 	 2025-09-29T09:25:02.043Z

ALTER TABLE blog_preferences ADD COLUMN theme TEXT NOT NULL DEFAULT 'default';