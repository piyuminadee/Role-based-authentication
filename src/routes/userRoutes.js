const express = require("express");
const verifyToken = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/admin", verifyToken("admin"), (req, res) => {
    res.json({message: "Welcome Admin"});
})

router.get("/user", verifyToken("user"), (req, res) => {
    res.json({message: "Welcome User"});
})

router.get("/manager", verifyToken("manager"), (req, res) => {
    res.json({message: "Welcome Manager"});
});

module.exports = router;