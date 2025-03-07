-- Migration number: 0004 	 2025-03-02T10:20:35.915Z

ALTER TABLE blogs ADD COLUMN description_md TEXT;
ALTER TABLE blogs ADD COLUMN description_html TEXT;
ALTER TABLE blogs DROP COLUMN description;
