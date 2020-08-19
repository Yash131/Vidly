const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
const _ = require('lodash');

const { User, validate} = require('../models/user_model');
const auth = require('../middlewares/auth');

// for getting all the users
router.get('/', async (req,res)=>{
    const user = await User.find().select('-password').sort('name')
    res.send(user);
});

// For Getting Current LoggedIn User
router.get('/me', auth, async (req,res) =>{
    const user = await User.findById(req.user._id).select('-password');
    res.send(user);
});

// Registering/Creating a User
router.post('/', async (req,res) =>{

    const { error } = validate(req.body);
    if(error) { return res.status(400).send(error.details[0].message); };

    user = await User.findOne({email : req.body.email});
    if(user) { return res.status(400).send('User Already Registered')};

    // user = new User({
    //     name : req.body.name,
    //     email : req.body.email,
    //     password : req.body.password
    // });
    user = new User( _.pick(req.body, ['name','email','password'])) /*Using lodash to simplify the object*/

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    user = await user.save();

    const token = user.genrateAuthToken();

    res.header('x-auth-token',token).send(_.pick(user,['_id','name','email','isAdmin']));
   
});

module.exports = router;