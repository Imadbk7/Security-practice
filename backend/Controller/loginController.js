const app = require('../app')
const loginrepo = require('../Repositories/LoginRepository');
const pw_hash = require('../helpers/pw_hash');
const axios = require('axios');
const mail = require('../helpers/mailer');

app.app.post('/auth', async (req, res) => {
    res.send(await loginrepo.auth(req.body.email, pw_hash.hash(req.body.password + process.env.PEPPER)));
});


app.app.post('/multifactorAuth', (req, res) => {
    const random = Math.floor(Math.random() * 10000);
    mail.mailer(req.body.email, random);
    res.send(random + '');
})


app.app.post('/verifyRecaptcha', async (req, res) => {
    const token =req.body.token;
    await axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.SECRET_KEY}&response=${token}`);
    if (res.status(200)) {
        res.send("Human");
    }else{
        res.send("Robot");
    }


})
