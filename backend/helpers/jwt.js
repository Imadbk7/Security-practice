const jwt = require("jsonwebtoken");

const authToken = (id, role) => {
    let jwtSecretKey = process.env.SECRET_PHRASE;
    let data = {
        id: id,
        role: role,
    }

    return jwt.sign(data, jwtSecretKey, {expiresIn: '800s'});
}

const verifyToken = (token) => {
    const token1 = token.split(' ')[1];

    try {
        const verified = jwt.verify(token1, process.env.SECRET_PHRASE);
        return !!verified;
    } catch (error) {
        // Access Denied
        return false
    }
}

const readTokenData = (token) => {
    try {
        return jwt.verify(token.split(' ')[1], process.env.SECRET_PHRASE);
    } catch (error) {
        console.log(error);
        return 'token expired';
    }
}

module.exports.authToken = authToken;
module.exports.verifyToken = verifyToken;
module.exports.readTokenData = readTokenData;
