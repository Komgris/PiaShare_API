const router = require('express').Router();
const User = require('../model/UserModel');
const {registerValidation} = require('../validate/validation');
const bcrypt = require('bcryptjs');

router.post('/register', async(req,res)=>{

    const {error} = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //Check if exist
    const usernameExist = await User.findOne({
        username:req.body.username
    })
    if(usernameExist) return res.status(400).send('Username Already Exist');

    //Hash passwoed
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    //Create new user
    const user = new User({
        username: req.body.username,
        password: req.body.password
    });
    try{
        const savedUser =  await user.save();
        res.json(savedUser);
    }
    catch(err){
        res.status(400).send(err);
    }

});

module.exports = router;