import sgMail from '@sendgrid/mail';

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY || '';
const SENDGRID_FROM_MAIL = process.env.SENDGRID_FROM_MAIL || '';

if (!SENDGRID_API_KEY) {
    console.warn(
        '[TechCat Facility Management] Logging emails to console because no SendGrid API key is set in the .env file',
    );
}

sgMail.setApiKey(SENDGRID_API_KEY);

interface Email {
    to: string;
    subject: string;
    content: string;
}

export const sendEmail = async (email: Email) => {
    if (process.env.NODE_ENV !== 'production') {
        console.warn(
            '[Friendly Butler] Hhrrmm, by the way sir, this mail will not actually be sent because we are in development mode',
        );
        console.log('-----');
        console.log('Sie haben Post!\n');
        console.log(`TO: ${email.to}`);
        console.log(`SUBJECT: ${email.subject}`);
        console.log(`CONTENT: ${email.content}`);
        console.log('-----');

        // YEAH I REALLY SPENT ONE HOUR FIGURING OUT WHY THE MAIL WASNT ACTUALLY SENDING. I WONDER WHY... :) (forced smile)
        return;
    }

    if (!SENDGRID_API_KEY) return;

    await sgMail.send({
        to: email.to,
        from: SENDGRID_FROM_MAIL,
        subject: email.subject,
        html: email.content,
    });
};
