const fs = require('fs');
require('dotenv').config();

const env = process.env;

let smtpPassword = '';
if (env.MS_SMTP_PASSWORD) {
    smtpPassword = env.MS_SMTP_PASSWORD;
} else if (env.MS_SMTP_PASSWORD__FILE) {
    smtpPassword = fs.readFileSync(env.MS_SMTP_PASSWORD__FILE);
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
    admin: {
        login: process.env.ADMIN_LOGIN,
        password: process.env.ADMIN_PASSWORD
    },
    jwt: {
        secret: process.env.JWT_SECRET
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
    }
};
