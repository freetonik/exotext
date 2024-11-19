import type { Context } from 'hono';
import { raw } from 'hono/html';
import { renderHTMLGeneral } from './htmltools';

export const handleWaitlistRequest = async (c: Context) => {
    const email = c.req.query('email_address');
    if (!email) return c.notFound();
    return c.html(
        renderHTMLGeneral(
            'Exotext Waitlist',
            raw(
                `<div class="flash">We have sent you a confirmation email to <strong>${email}</strong><br>Please, confirm your intent by clicking a link in that email.</div>`,
            ),
            false,
            { footer: false },
        ),
    );
};
