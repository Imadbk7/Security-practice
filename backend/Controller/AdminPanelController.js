const app = require('../app');
const jwtHelper = require('../helpers/jwt');
const adminRepository = require('../Repositories/AdminPanelRepository');


app.app.get('/GetUsers', async (req, res) => {
    if (jwtHelper.readTokenData(req.header('Authorization')) === 'token expired') {
        res.send('token expired');
        return;
    }

    if (jwtHelper.readTokenData(req.header('Authorization')).role === 'admin') {
        res.send(await adminRepository.getAllUsers());
    }
})


app.app.post('/unBlockUser', (req, res) => {
    res.send(adminRepository.unBlockUser(req.body.id))
})


app.app.post('/deleteUser', async (req, res) => {
    if (jwtHelper.readTokenData(req.header('Authorization')) === 'token expired') {
        res.send('token expired');
        return;
    }
    if (jwtHelper.readTokenData(req.header('Authorization')).role === 'admin'){
       if (req.body.id === jwtHelper.readTokenData(req.header('Authorization')).id){
           res.send('you cannot delete yourself');
           return;
       }
        res.send(await adminRepository.deleteUser(req.body.id));
    } else res.send('no admin role');

})
