const router = require('express').Router();
const User = require('../model/UserModel');
const jwt = require('jsonwebtoken');
const {registerValidation ,logInValidation } = require('../validate/validation');
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
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //Create new user
    const user = new User({
        username: req.body.username,
        password: hashedPassword
    });
    try{
        await user.save();
        const token = jwt.sign({_id: user._id},process.env.TOKEN);
        res.header('auth-token',token).send(token);

    }
    catch(err){
        res.status(400).send(err);
    }

});

//LOGIN ******************************************************************************************************************
router.post('/login', async(req,res)=>{
    const {error} = logInValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

        //Check if exist
        const usernameExist = await User.findOne({
            username:req.body.username
        })
        if(!usernameExist) return res.status(400).send('Invalid Username or Password');

        const validPass = await bcrypt.compare(
            req.body.password, 
            usernameExist.password
            );
        if(!validPass)return res.status(400).send('Invalid Username or Password');

        //Create Token
        const token = jwt.sign({_id: usernameExist._id},process.env.TOKEN);
        res.header('auth-token',token).send(token);

        res.send('Logged in');
    
});

module.exports = router;