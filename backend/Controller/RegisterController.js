const app = require('../app');
const pw_hash = require('../helpers/pw_hash');
const registerRepo = require('../Repositories/RegisterRepository');

app.app.post('/register', async (req, res) => {
    res.send(await registerRepo.adduser(req.body.name, req.body.email, pw_hash.hash(req.body.password + process.env.PEPPER)));
})



app.app.post('/checkPw', async (req, res) => {
    res.send(await registerRepo.checkPw(req.body.pw));
})
