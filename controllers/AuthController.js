const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../models/user');
const Config = require('../config/roles');
const Response = require('../config/response');
const Facebook = require('../models/facebook');
const { getJWTDetails } = require('../middleware/verifyJWT');

const login = (req, res) => {
    if (!req.body.email || !req.body.password) return res.status(400).json({'error': "Email and password are required."});
    const user = {
        email: req.body.email
    }
    try {
        User.findOne(user, 'email fullName password role _id', function(err,usr) {
            if ( err ) {
                res.status(500).json({'error': Response.status[500]});
            }

            if (!usr || usr.length < 0) {
                return res.status(500).json({'error': Response.auth.loginError});
            }

            // Correct Password
            if (usr.password == req.body.password) {

                // Sign the JWT with the secret key for 2 hours
                const accessToken = jwt.sign(
                    {
                        "UserInfo": {
                            "email": usr.email,
                            "fullName": usr.fullName,
                            "role": usr.role,
                            "_id": usr._id
                        }
                    },
                    process.env.ACCESS_TOKEN_SECRET,
                    { expiresIn: '2h' }
                );

                // Set the JWT as cookie
                res.cookie('jwt', accessToken, { httpOnly: false, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000});
                res.cookie('userId', usr._id);
                res.cookie('email', usr.email);
                // Return /admin for admins and /personal for guests
                if ( usr.role == Config.ROLES.admin ) {
                    res.status(200).json({"redirect": "/admin"});
                }
                else {
                    res.status(200).json({"redirect": "/personal"});
                }
            }
            // Wrong Password
            else {
                res.status(401).json({'error': Response.auth.authFailed});
            }
        })
    }
    catch (err) {
        // An error occurred
        res.status(500).json({'error': Response.status[500]});
    }
}

const logout = (req, res) => {
    res.clearCookie("jwt");
    res.clearCookie("userId");
    res.clearCookie("email");
    res.status(200).render('partials/header', {jwt: false})
}

// Get facebook access token (MongoDB)
const getFacebookAccessToken = async (req, res) => {
    try {
        const token = await Facebook.findOne().exec();
        res.status(200).json({ "token": token.token});
    }
    catch (err) {
        res.status(500).json({'error': Response.status[500] });
    }
}

const parseJWT = (req, res) => {
    try {
        const info = getJwtDetails(req.cookies.jwt);
        res.status(200).json(info);
    }
    catch (err) {
        res.status(500).json({'error': Response.status[500] });
    }
}

module.exports = {
    login,
    logout,
    getFacebookAccessToken,
    parseJWT
}