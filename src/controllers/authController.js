const bcrypt = require('bcrypt');
const jwt =require("jsonwebtoken");
const User = require("../models/userModel");

const register = async (req, res) => {
    try{
        const {username, password, role} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
    
        const newUser = new User({username, password:hashedPassword, role});
        await newUser.save();
        res
        .status(201)
        .json({message: `User registered with username ${username}`})
    
    } catch (err) {
        res
        .status(500)
        .json({message: "Something went wrong"});
    
    }

   
};


const login = async (req, res) => {
    try{
        const {username, password} = req.body;
        const user = await User.findOne({username});
    
        if (!user) {
            return res
            .status(404)
            .json({message: `User with username ${username} not found`})
        }
        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res
            .status(404)
            .json({message: `Invalied credential`})
        }


        const token = jwt.sign(
            {id:user._id, role:user.role},  //Payload: Data to be encoded in the token
            process.env.JWT_SECRET,      // Secret key used for signing the token
            {expiresIn:"1h"}               // Options: Specifies the token expiration time
        );

        res.status(200).json({ message: `Login successful`, token });


    } catch (err) {
        res
        .status(500)
        .json({message: "Something went wrong"});
    
    }
};

module.exports = {
    register,
    login,
};