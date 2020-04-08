const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');

const env = require('../../src/env');

function getMailTransport() {
    return nodemailer.createTransport(env.mail_server.smtp);
}

/**
 * send email
 * @param path
 * @returns {Promise<unknown>}
 */
function loadTemplate(path) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, 'utf8', (error, html) => {
            if (error) {
                reject(error);
            } else {
                resolve(html);
            }
        });
    });
}

function getLogosCIDs() {
    const cbLogo = {
        filename: 'logo-commerce-block',
        path: path.resolve(__dirname, '../../public/logo-commerce-block.png'),
        cid: 'logo-commerce-block.png',
        contentType: 'image/png'
    };
    const msLogo = {
        filename: 'logo-main-stay',
        path: path.resolve(__dirname, '../../public/logo-main-stay.png'),
        cid: 'logo-main-stay.png',
        contentType: 'image/png'
    };
    return {
        cbLogo,
        msLogo
    };
}

async function sendSignupEmail(signup) {
    const {cbLogo, msLogo} = getLogosCIDs();
    let html = await loadTemplate(path.resolve(__dirname, '../view/emails/signup/client.html'));
    html = html.replace('$$NAME$$', signup.first_name + ' ' + signup.last_name);
    html = html.replace('$$COMMERCE-BLOCK-LOGO-URL$$', `cid:${cbLogo.cid}`);
    html = html.replace('$$MAIN-STAY-LOGO-URL$$', `cid:${msLogo.cid}`);

    return new Promise((resolve, reject) => {
        getMailTransport().sendMail({
            from: {
                name: 'Mainstay Support',
                address: 'support@mainstay.xyz'
            },
            to: signup.email,
            subject: 'MainStay - Thank you for signing up! Here are the next steps',
            html: html,
            attachments: [cbLogo, msLogo],
        }, (error, info) => {
            if (error) {
                return reject(error);
            }
            console.log('email sent to ' + signup.email);
            resolve(info);
        });
    }).catch(error => {
        console.log('error while sending an email to ' + signup.email);
        console.error(error);
    });
}

/**
 * send this email after success onfido check
 * @param signup
 * @returns {Promise<T>}
 */
async function sendOnfidoVerificationSuccessEmail(signup) {
    const {cbLogo, msLogo} = getLogosCIDs();
    let html = await loadTemplate(path.resolve(__dirname, '../view/emails/signup/subscribe.html'));
    html = html.replace('$$NAME$$', signup.first_name + ' ' + signup.last_name);
    html = html.replace('$$CODE$$', signup.code);
    html = html.replace('$$COMMERCE-BLOCK-LOGO-URL$$', `cid:${cbLogo.cid}`);
    html = html.replace('$$MAIN-STAY-LOGO-URL$$', `cid:${msLogo.cid}`);

    return new Promise((resolve, reject) => {
        getMailTransport().sendMail({
            from: {
                name: 'Mainstay Support',
                address: 'support@mainstay.xyz'
            },
            to: signup.email,
            subject: 'MainStay - KYC verification successful!',
            html: html,
            attachments: [cbLogo, msLogo],
        }, (error, info) => {
            if (error) {
                return reject(error);
            }
            console.log('email sent to ' + signup.email);
            resolve(info);
        });
    }).catch(error => {
        console.log('error while sending an email to ' + signup.email);
        console.error(error);
    });
}

/**
 * send email
 * @param user
 * @returns {Promise<unknown>}
 */
async function sendNewSignupMail(user) {
    const html = `
        <b>First Name</b>: ${user.first_name}<br>
        <b>Last Name</b>: ${user.last_name}<br>
        <b>Email</b>: ${user.email}<br>
        ${user.company ? `<b>Company</b>: ${user.company}<br>` : ''}
        ${user.pubkey ? `<b>Public Key</b>: ${user.pubkey}<br>` : ''}
    `;

    return new Promise((resolve, reject) => {
        getMailTransport().sendMail({
            from: {
                name: env.mail_server.smtp.from_name,
                address: env.mail_server.smtp.from_address
            },
            to: env.sign_up.admin_email,
            subject: 'New SignUp',
            html: html,
        }, (error, info) => {
            if (error) {
                return reject(error);
            }
            resolve(info);
        });
    });
}

async function sendPaymentOkEmail(signup, clientCommitment, clientDetails) {
    // TODO: not implemented
    const html = `New email`;
    return new Promise((resolve, reject) => {
        getMailTransport().sendMail({
            from: {
                name: env.mail_server.smtp.from_name,
                address: env.mail_server.smtp.from_address
            },
            to: env.sign_up.admin_email,
            subject: '',
            html: html,
        }, (error, info) => {
            if (error) {
                return reject(error);
            }
            resolve(info);
        });
    });
}

module.exports = {
    sendSignupEmail,
    sendNewSignupMail,
    sendOnfidoVerificationSuccessEmail
};
