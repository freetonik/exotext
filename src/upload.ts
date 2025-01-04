import type { Context } from 'hono';
import { nanoid } from 'nanoid';

export const handleUploadImage = async (c: Context) => {
    const contentType = c.req.header('Content-Type') || '';
    if (!contentType.includes('multipart/form-data')) {
        return c.json({ error: 'Invalid content type' });
    }

    const body = await c.req.parseBody();
    const allowedFileTypes = ['image/png', 'image/jpeg', 'image/gif', 'image/webp'];
    const image = body.image as File;
    if (!image) {
        return c.json({ error: 'Bad file' });
    }

    const imageType = image.type;
    if (!allowedFileTypes.includes(imageType)) {
        c.status(400);
        return c.json({ error: 'Invalid file type' });
    }

    const extension = mimeToExtension[imageType];

    const arrayBuffer = await image.arrayBuffer();
    const blogSlug = c.get('SUBDOMAIN');
    const blogIdEntry = await c.env.DB.prepare('SELECT blogs.blog_id FROM blogs WHERE blogs.slug = ?')
        .bind(blogSlug)
        .first();
    const blogId = blogIdEntry.blog_id;

    const filename = `${blogId}/${nanoid()}.${extension}`;
    try {
        await c.env.IMG_BUCKET.put(filename, arrayBuffer);
    } catch (e) {
        console.log(e);
    }
    const imageUrl = `https://img.exotext.com/${filename}`;
    c.status(201);
    return c.json({ imageUrl: imageUrl });
};

const mimeToExtension: { [key: string]: string } = {
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/gif': 'gif',
    'image/webp': 'webp',
}; // more at https://github.com/fabiospampinato/mime-standard
