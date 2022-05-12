const User = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('config');
const { isEmail } = require('validator');
//const bcrypt = require('bcrypt');


module.exports.signup = (req, res) => {
    const { name, email, password } = req.body;

    if(!name || !email || !password) {
        res.status(400).json({message: 'Please enter all fields'});
    }
    
    User.findOne({email})
    .then(user => {
        if(user) return res.status(409).json({message: 'User already exists'});

        const newUser = new User({ name, email, password });
        
        newUser.save().then(user => {
            jwt.sign(
                {id: user._id},
                config.get('jwtsecret'),
                {expiresIn: 3600},
                (err, token) => {
                    if(err) throw err;
                    res.json({
                        token,
                        user: {
                            id: user._id,
                            name: user.name,
                            email: user.email
                        }
                    });
                }
            );
        })
        .catch(err => res.status(400).send(err));
    });
}

module.exports.login = (req, res) => {
    const { email, password } = req.body;
    if(!email || !password) {
        res.status(400).json({msg: 'Please enter all fields'});
    }

    if(!isEmail(email)) return res.status(400).send({msg: 'Please enter valid email'});
    
    User.findOne({email})
    .then(user => {
        if(!user) return res.status(400).json({msg: 'User does not exist'});

        //Validate Password
        if(password != user.password) return res.status(400).json({msg: 'Invalid credentials'});

        jwt.sign(
            {id: user._id},
            config.get('jwtsecret'),
            {expiresIn: 3600},
            (err, token) => {
                if(err) throw err;
                res.json({
                    token,
                    user: {
                        id: user._id,
                        name: user.name,
                        email: user.email
                    }
                });
            }
        );
    });
}

module.exports.get_user = (req, res) => {
    console.log(req.user);
}