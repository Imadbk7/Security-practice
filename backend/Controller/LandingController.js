const app = require('../app');
const jwt = require('../helpers/jwt');
const landingRepository = require('../Repositories/LandingRepository')

app.app.post('/getUserInfo', async(req, res) => {
    if (jwt.verifyToken(req.header('Authorization')) === false){
        res.send('token expired');
        return;
    }
    res.send(await landingRepository.findUser(jwt.readTokenData(req.header('Authorization')).id));
});

