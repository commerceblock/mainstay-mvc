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
    }
};
