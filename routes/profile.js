const router = require('express').Router();
const Profile = require('../model/ProfileModel');
const {profileValidate} = require('../validate/validation');
const jwt = require('jsonwebtoken');

// router.get('/get/:name', async(req,res)=>{ 
//     const result = await Profile.find(`${req.params.name}`);
//     return res.status(200).send(result)
// })

router.post('/create', async(req,res)=>{
    const {error} = profileValidate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //console.log(req.body)
    const profile = new Profile({
        name : req.body.name,
        systemId : jwt.verify(req.body.systemId,process.env.TOKEN)._id
    })

    try{
        await profile.save();
        res.status(200).send('OK');
    }
    catch(err){
        res.status(400).send(err);
    }
})

module.exports = router;