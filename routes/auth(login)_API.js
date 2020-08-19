const router = require('express').Router();
const Joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');

const { User ,userSchema} = require('../models/user_model');


router.post('/', async (req,res) =>{
    const { error } = validateUser(req.body);
    if(error) { return res.status(400).send(error.details[0].message) };

    let user = await User.findOne({email : req.body.email});
    if(!user) {return res.status(400).send('Invalid Email or Password ')};

    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) {return res.status(400).send('Invalid Email or Password ')};

    const token = user.genrateAuthToken();
    res.send(token);
});

const validateUser = (req) =>{
    const joiSchema = {
        email : Joi.string().email().max(255).required(),
        password : Joi.string().trim().required()
    };
    return Joi.validate(req, joiSchema);
};

module.exports = router;