const router = require('express').Router();
const SharedRoom = require('../model/SharedRoomModel');
const jwt = require('jsonwebtoken');
const { sharedRoomValidation } = require('../validate/validation');

router.get('/get/:owner', async(req, res)=> {
    req.params.owner = jwt.verify(req.params.owner,process.env.TOKEN)._id
    const result = await SharedRoom.find(req.params)
    return res.status(200).send(result);
})
router.post('/create', async(req,res)=>{

    const {error} = sharedRoomValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const sharedRoom = new SharedRoom({
        name: req.body.name,
        budget : req.body.budget,
        member : req.body.member,
        peroid : req.body.peroid,
        start : req.body.start,
        finish : req.body.finish,
        owner : jwt.verify(req.body.owner,process.env.TOKEN)._id
    })

    try{
        await sharedRoom.save();
        res.status(200).send('OK');
    }
    catch(err){
        res.status(400).send(err);
    }
})

module.exports = router;