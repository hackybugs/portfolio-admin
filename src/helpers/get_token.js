const jwt = require('jsonwebtoken');
const moment = require('moment');

function generateAccessToken(user) {
    const accessTokenExpiry = moment().add(30, 'minutes').unix();

    const payload = {
        id: user.id,
        email: user.email,
        iat: moment().unix(), // Issued at time (current time)
        exp: accessTokenExpiry // Expiration time
    };
    const secret = 'secret';
    const accessToken = jwt.sign(payload, secret);

    return accessToken;
}

function generateRefreshToken(user) {
    const refreshTokenExpiry = moment().add(30, 'days').unix();

    const payload = {
        id: user.id,
        email: user.email,
        iat: moment().unix(), // Issued at time (current time)
        exp: refreshTokenExpiry // Expiration time
    };
    const secret = 'secret';
    const options = { expiresIn: '30d' };
    const refreshToken = jwt.sign(payload, secret);

    return refreshToken;
}

module.exports = { generateAccessToken, generateRefreshToken };
