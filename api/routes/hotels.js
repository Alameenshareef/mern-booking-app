const express = require("express")
const router = express.Router()
const Hotel = require("../models/Hotel")
const { createError } = require("../utils/error")
const { createHotel, updateHotel, deleteHotel, getHotel, getHotels, countByCity, countByType, getHotelRooms } = require("../controllers/hotel")
const { verifyAdmin } = require("../utils/verifyToken")

//CREATE
router.post("/", verifyAdmin, createHotel)

//UPDATE
router.put("/:id", verifyAdmin, updateHotel)

//DELETE
router.delete("/:id", verifyAdmin, deleteHotel)
//GET
router.get("/find/:id", getHotel)
//GETALL
router.get("/", getHotels)


router.get("/countByCity", countByCity)
router.get("/countByType", countByType)
router.get("/room/:id", getHotelRooms)





module.exports = router    