const router = require('express').Router();
const House = require('../models/house.model.js');
const Room = require('../models/rooms.model.js');
const {v4: uuidv4} = require('uuid');
const { cloudinary} = require('../config/cloudinary');

/**
 * addPost.
 *
 * @param {[req]} req [req has category, title, description, images, location, coordinates]
 * @param {} res [res send in response of json confirming the state of the action]
 * @param {} next
 */
const addRoomPost = async(req, res, next) => {
    console.log(req.body);
    let _ = req.body;
    try{
        const datas = JSON.parse(_.imageCollection);
        const arr = [];
        await Promise.all(
            datas.map(async(data)=>{
                let id = uuidv4();
                arr.push(id);
                let response = cloudinary.uploader.upload(data,{
                    upload_preset:'dev_setups',// changes will be made later on
                    public_id:id
                });
                return response;
            }))
            .then(()=>{
                const imageCollection = arr;
                const newRoom = new Room({
                    // createdBy: req.params.id,
                    name:_.name,
                    email:_.email,
                    number:_.number,
                    title: _.title,
                    location: _.location, 
                    description:_.description,
                    coordinates: {
                        latitude: _.coordinates.latitude,
                        longitude: _.coordinates.longitude,
                    },
                    rooms:{
                        bedroom: _.rooms.bedroom,
                        kitchen: _.rooms.kitchen,
                        toilet: _.rooms.toilet,
                        livingRoom:_.rooms.livingRoom
                    },
                    facilities:{
                        cabletv:_.facilities.cabletv,
                        water:_.facilities.water,
                        internet:_.facilities.internet,
                        telephone:_.facilities.telephone,
                        parking:_.facilities.parking
                    },
                    furnished:_.furnished,
                    price:_.price,
                    imageCollection: imageCollection
                });

                newRoom.save()
                    .then(()=> res.json('post added'))
                    .catch(err => res.status(400).json('error' + err));
            });
    }catch(err){
        res.status(500).json({err: 'Something went wrong'});
    }
};

/**
 * addHousePost.
 *
 * @param {} req [id, title, location, coordinates,house details, price, imageCollection ]
 * @param {} res [status of the process]
 * @param {} next
 */

const addHousePost = async(req, res, next) => {
    let _ = req.body;
    console.log(_)
    // try{
    //     const datas = JSON.parse(_.data);
    //     const arr = [];
    //     await Promise.all(
    //         datas.map(async(data)=>{
    //             let id = uuidv4();
    //             arr.push(id);
    //             let response = cloudinay.uploader.upload(data,{
    //                 upload_preset:'dev_setups',// changes will be made later on
    //                 public_id:id
    //             });
    //             return response;
    //         }))
    //         .then(()=>{
    //             const imageCollection = arr;
    //             const newHouse = new House({
    //                 createdBy: req.params.id,
    //                 title: _.title,
    //                 location: _.location, 
    //                 coordinates: {
    //                     latitude: _.coordinates.latitude,
    //                     longitude: _.coordinates.longitude,
    //                 },
    //                 house:{
    //                     rooms:_.house.rooms,
    //                     area: _.house.area,
    //                     floors: _.house.floors,
    //                     bedroom: _.rooms.bedroom,
    //                     kitchen: _.rooms.kitchen,
    //                     toilet: _.rooms.toilet
    //                 },
    //                 price:_.price,
    //                 imageCollection: imageCollection
    //             });
    //             newHouse.save()
    //                 .then(()=> res.json('post added'))
    //                 .catch(err => res.status(400).json('error' + err));
    //         });
    // }catch(err){
    //     res.status(500).json({err: 'Something went wrong'});
    // }
};

const testPost = async(req,res,next) =>{
    console.log("It's working'");
    console.log(req.body)
}

module.exports = {addRoomPost, addHousePost, testPost}
