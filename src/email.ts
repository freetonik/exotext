import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';

export const sendEmail = async (
    env: CloudflareBindings,
    to: string,
    subject: string,
    body: string,
    from = 'no-reply@exotext.com',
) => {
    const mail = new SendEmailCommand({
        Source: from,
        ReturnPath: from,
        Destination: { ToAddresses: [to] },
        Message: {
            Subject: { Data: subject },
            Body: {
                Html: { Data: body },
            },
        },
    });

    if (env.ENVIRONMENT === 'dev') {
        console.log(`Would send email to ${to} with subject ${subject}`);
        console.log(`Body: ${body}`);
    }

    const client = new SESClient({
        region: 'eu-north-1',
        credentials: {
            accessKeyId: env.AWS_SES_ACCESS_KEY,
            secretAccessKey: env.AWS_SES_ACCESS_KEY_SECRET,
        },
    });

    try {
        await client.send(mail);
    } catch (e: unknown) {
        console.error(e);
        return e instanceof Error ? e.toString() : 'An unknown error occurred';
    }
    return true;
};
