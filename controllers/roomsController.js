const Room = require('../models/room');const Response = require('../config/response');var fs = require('fs');

// Get all the rooms in the DB
const getAllRooms = async (req,res) => {try {const rooms = await Room.find();res.status(200).json(rooms);}catch ( err ) {res.status(500).json({ "error": Response.status[500]});}}

// Adds new room to DB when admin adds new room
const addNewRoom = async (req,res) => {try{const room = new Room({roomType: req.body.roomType,cost: req.body.cost});await room.save();res.status(200).json({"status" : Response.status[200]});}    catch ( err ) {res.status(500).json({"status" : Response.status[500]});}}


const addNewRoomFile = (req,res) => {const fileName = req.file.filename;fs.readFile(`uploads/${fileName}`, 'utf8', function (err, data) {if (err) {res.status(500).json({"error": Response.file.parse})};try {const roomList = JSON.parse(data);Room.insertMany(roomList);res.status(200).json({"status": Response.status[200]})}catch(err) {res.status(500).json({"error": Response.file.saving});}});};

// Updates an existing room when called on by Admin
const updateRoom = (req,res) => {var newData = {"roomType": req.body["0"],"cost": req.body["1"],"reserved": req.body["2"]};try {Room.updateOne({'_id': req.params.id}, {$set:newData}, function(err, response) {if (err) {res.status(500).json({"error":Response.status[500]})}else {res.status(200).json({"status":"Room has been updated"})}});}catch (err) {res.status(500).json({"error": Response.status[500]});}}

// Deletes a room from DB when called on by admin
const deleteRoom = async (req,res) => {try {await Room.deleteOne({"_id": req.params.id});res.status(200).json({"status": "Room deleted!"});}catch (err) {res.status(500).json({"error": Response.status[500]});}}

module.exports = {
    getAllRooms,
    addNewRoom,
    updateRoom,
    deleteRoom,
    addNewRoomFile
}