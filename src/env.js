const fs = require('fs');
require('dotenv').config();

const env = process.env;

let smtpPassword = '';
if (env.MS_SMTP_PASSWORD) {
    smtpPassword = env.MS_SMTP_PASSWORD;
} else if (env.MS_SMTP_PASSWORD__FILE) {
    smtpPassword = fs.readFileSync(env.MS_SMTP_PASSWORD__FILE);
}

let adminPassword = '';
if (env.ADMIN_PASSWORD) {
    adminPassword = env.ADMIN_PASSWORD;
} else if (env.ADMIN_PASSWORD__FILE) {
    adminPassword = fs.readFileSync(env.ADMIN_PASSWORD__FILE);
}

let jwtSecret = '';
if (env.JWT_SECRET) {
    jwtSecret = env.JWT_SECRET;
} else if (env.JWT_SECRET__FILE) {
    jwtSecret = fs.readFileSync(env.JWT_SECRET__FILE);
}

let kycToken = '';
if (env.KYC_TOKEN) {
    kycToken = env.KYC_TOKEN;
} else if (env.KYC_TOKEN__FILE) {
    kycToken = fs.readFileSync(env.KYC_TOKEN__FILE);
}

let onfidoWebhookSecret = '';
if (env.ONFIDO_WEBHOOK_SECRET){
    onfidoWebhookSecret = env.ONFIDO_WEBHOOK_SECRET;
}else if (env.ONFIDO_WEBHOOK_SECRET__FILE){
    onfidoWebhookSecret = fs.readFileSync(env.ONFIDO_WEBHOOK_SECRET__FILE, 'utf8')
}

module.exports = {
    db: {
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        address: process.env.DB_HOST,
        port: process.env.DB_PORT
    },
    server: {
        port: process.env.LISTEN_API
    },
    sign_up: {
        admin_email: process.env.ADMIN_EMAIL
    },
    kyc: {
        url: process.env.KYC_URL,
        token: kycToken
    },
    admin: {
        login: process.env.ADMIN_LOGIN,
        password: adminPassword
    },
    jwt: {
        secret: jwtSecret
    },
    mail_server: {
        smtp: {
            host: env.MS_SMTP_HOST,
            port: env.MS_SMTP_PORT,
            auth: {
                user: env.MS_SMTP_USER,
                pass: smtpPassword,
            },
            from_name: env.MS_SMTP_FROM_NAME,
            from_address: env.MS_SMTP_FROM_ADDRESS
        }
    },
    onfido: {
        webhook: {
            secret: onfidoWebhookSecret
        }
    },
    lightning: {
        url: env.LIGHTNING_URL,
        api_key: env.API_KEY,
        fee_rate_per_month_in_eur: env.FEE_RATE_PER_MONTH_IN_EUR
    }
};
