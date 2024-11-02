const express = require("express");
const dotenv = require('dotenv').config();
const dbConnect = require("./config/dbConnect");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");



const app = express();
dbConnect();



//MiddlewaRE
app.use(express.json());

//Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

//Start the Server
const PORT = process.env.PORT || 7002;
app.listen(PORT, () => {
    console.log(`Server is runnig at port ${PORT}`)
});