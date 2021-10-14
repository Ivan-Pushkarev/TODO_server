const User = require("./Model");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

async function signUp(req, res){
    const { email, password, confirmPassword } = req.body
    try {
        const existedUser = await User.findOne({ email })
        if (existedUser) return res.status(400).json( "user already exists")
        
        if(password !== confirmPassword) {
            return res.status(400).json("Invalid credentials. Confirm Password doesn't match")
        }
        const hashedPassword = await bcrypt.hash(password, 12)
    
        const result = await User.create({
            email,
            password: hashedPassword
        })
    
        const token = jwt.sign( { email: result.email, id: result._id },
            'super secret',
            { expiresIn: "1h" } )
    
        res.status(201).json({ result, token })
        
    }
    catch(err){
        res.status(500).json("Something went wrong")
    }
    
    
    
    
    
    
    
}
module.exports = signUp