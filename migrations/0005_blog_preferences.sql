-- Migration number: 0005 	 2025-04-13T16:36:24.087Z

CREATE TABLE IF NOT EXISTS blog_preferences (
    blog_id INTEGER PRIMARY KEY,
    updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    posts_per_page INTEGER DEFAULT 100,
    default_homepage_view TEXT DEFAULT 'links',
    custom_head TEXT DEFAULT '',
    FOREIGN KEY (blog_id) REFERENCES blogs(blog_id) ON DELETE CASCADE
);