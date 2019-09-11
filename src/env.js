require('dotenv').config();

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
    email: {
        MS_SMTP_ENABLED: true,
        MS_SMTP_FROM_ADDRESS: 'ill_input_email_here@mainstay.xyz',
        MS_SMTP_FROM_NAME: 'MainStay Name',
        MS_SMTP_HOST: 'email-smtp.eu-west-1.amazonaws.com:465',
        MS_SMTP_USER: 'WEFEWFGWERGWERGEWEWGWEGWEQ',
    },
    admin: {
        login: process.env.ADMIN_LOGIN,
        password: process.env.ADMIN_PASSWORD
    },
    jwt: {
        secret: process.env.JWT_SECRET
    }
};
