-- Migration number: 0001 	 2024-10-28T12:30:53.219Z

CREATE TABLE IF NOT EXISTS users (
    user_id INTEGER PRIMARY KEY,
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    username TEXT UNIQUE NOT NULL,
    email TEXT,
    email_verified BOOLEAN NOT NULL DEFAULT FALSE,
    password_hash TEXT,
    password_salt TEXT
);
CREATE INDEX IF NOT EXISTS idx_users_on_username ON users(username);

CREATE TABLE IF NOT EXISTS email_verifications (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    verification_code TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE IF NOT EXISTS password_resets (
    id INTEGER PRIMARY KEY,
    user_id INTEGER NOT NULL,
    reset_code TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (user_id)
);

CREATE TABLE IF NOT EXISTS blogs (
    blog_id INTEGER PRIMARY KEY,
    description TEXT,
    slug TEXT NOT NULL,
    user_id INTEGER NOT NULL,
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    title TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);
CREATE INDEX IF NOT EXISTS idx_blogs_on_slug ON blogs(slug);

CREATE TABLE IF NOT EXISTS posts (
  	post_id INTEGER PRIMARY KEY,
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  	blog_id INTEGER NOT NULL,
    slug TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'draft',
  	title TEXT NOT NULL,
    description TEXT,
    content_md TEXT,
    content_html TEXT,
    pub_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  	FOREIGN KEY(blog_id) REFERENCES blogs(blog_id) ON DELETE CASCADE
);
CREATE INDEX IF NOT EXISTS idx_posts_on_slug ON posts(slug);
CREATE INDEX IF NOT EXISTS idx_posts_pub_date ON posts(pub_date);
