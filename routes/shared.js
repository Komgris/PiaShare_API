const router = require('express').Router();
const SharedRoom = require('../model/SharedRoomModel');
const RequestRoom = require('../model/RequestRoomModel');
const UserRoom = require('../model/UserRoomModel');
const jwt = require('jsonwebtoken');
const { sharedRoomValidation, requestRoomValidation, userRoomValidation } = require('../validate/validation');

//get room by ownerId
router.get('/get/:owner?', async(req, res)=> {
    req.params.owner = jwt.verify(req.params.owner,process.env.TOKEN)._id
    const result = await SharedRoom.find(req.params)
    return res.status(200).send(result);
})

//get room by keyword
router.get('/find/:keyword?', async(req, res)=>{
    // const result = await SharedRoom.find({name: { $regex: '.*' + req.params.keyword + '.*' } })
    // .populate('requestrooms');
    const result = await RequestRoom({})
    .populate('requestrooms');
    return res.status(200).send(result);
})

//create room
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

//request to join room
router.post('/requestRoom', async(req,res)=>{
    const {error} = requestRoomValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const requestRoom =new RequestRoom({
        userId: jwt.verify(req.body.userId,process.env.TOKEN)._id,
        roomId: req.body.roomId,
        isAccept: req.body.isAccept,
    })

    try{
        await requestRoom.save();
        res.status(200).send('OK');
    }
    catch(err){
        res.status(400).send(err);
    }
})

//accept to join room
router.post('/acceptRequest', async(req,res)=>{
    const {error} = userRoomValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const request = await RequestRoom.findOne({userId: jwt.verify(req.body.userId,process.env.TOKEN)._id, roomId:req.body.roomId});
    if(request){

        request.isAccept = true;

        const userRoom = new UserRoom({
            userId: jwt.verify(req.body.userId,process.env.TOKEN)._id,
            roomId: req.body.roomId,
            isOwner: req.body.isOwner
        })

        try{
            await request.save();
            await userRoom.save();
            res.status(200).send('OK');
        }
        catch(err){
            res.status(400).send(err);
        }
    }


})
module.exports = router;