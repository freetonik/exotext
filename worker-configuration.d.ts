// Generated by Wrangler by running `wrangler types --env-interface CloudflareBindings`

interface CloudflareBindings {
	SESSIONS_KV: KVNamespace;
	ENVIRONMENT: string;
	AWS_SES_ACCESS_KEY: string;
	AWS_SES_ACCESS_KEY_SECRET: string;
	INVITATION_CODES: string;
	IMG_BUCKET: R2Bucket;
	DB: D1Database;
}
