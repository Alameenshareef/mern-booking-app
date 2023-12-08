const express = require("express")
const app = express()
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const authRoute = require("./routes/auth")
const usersRoute = require("./routes/users")
const hotelsRoute = require("./routes/hotels")
const roomsRoute = require("./routes/rooms")
const cookieParser = require("cookie-parser")
const cors = require("cors")
dotenv.config()
const connect = () => {
    try {
        mongoose.connect(process.env.MONGO)
        console.log("connected to mongodb");
    } catch (error) {
        throw error
    }
}

mongoose.connection.on("disconnected", () => {
    console.log("mongodb disconnected!");
})


// MiddleWares
app.use(cookieParser())
app.use(cors())
app.use(express.json())

app.use("/api/auth", authRoute)
app.use("/api/users", usersRoute)
app.use("/api/hotels", hotelsRoute)
app.use("/api/rooms", roomsRoute)

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500
    const errorMessage = err.message || "something went wrong"
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack
    })
})


app.listen(8800, () => {
    connect()
    console.log("connected to backend...")
})