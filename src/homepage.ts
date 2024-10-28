import { Context } from "hono";
import { renderHTML } from "./htmltools";
import { raw } from "hono/html";

export const handleHomepage = async (c: Context) => {
    const inner = `
        <h1>Exotext</h1>
        <h2>Simple blogging platform</h2>
        `
    return c.html(
        renderHTML(
            'Exotext',
            raw(inner),
            c.get('USER_LOGGED_IN'),
        ),
    );
}
