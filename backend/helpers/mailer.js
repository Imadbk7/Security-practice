const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PW
    }
});
const mailer = (email, token) => {
    const mailOptions = {
        from: 'authmailer',
        to: email,
        subject: 'multifactor code',
        text: 'this is your code:'+ token
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

}

module.exports.mailer = mailer;
