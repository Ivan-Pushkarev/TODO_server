const User = require("../../../GQL-server-passport/api/models/Model.js");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

async function signUp(req, res){
    const { email, password} = req.body
    try {
        const existedUser = await User.findOne({ email })
        if (!existedUser) return res.status(400).json( "user doesn't exist")
    
        const isPasswordCorrect = await bcrypt.compare(password, existedUser.password);
        if (!isPasswordCorrect) return res.status(400).json("Invalid credentials");
       
        const token = jwt.sign( { email: existedUser.email, id: existedUser._id },
            'super secret',
            { expiresIn: "1d" } )
        
        res.status(200).json({ result: existedUser, token })
    }
    catch(err){
        res.status(500).json("Something went wrong")
    }
}
module.exports = signUp