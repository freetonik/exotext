-- Migration number: 0006 	 2025-04-21T14:15:09.668Z

CREATE TABLE IF NOT EXISTS blog_analytics (
    blog_id INTEGER PRIMARY KEY,
    updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    umami_script_url TEXT NOT NULL,
    umami_website_id TEXT NOT NULL,
    FOREIGN KEY (blog_id) REFERENCES blogs(blog_id) ON DELETE CASCADE
);