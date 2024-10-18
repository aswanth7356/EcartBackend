const users = require('../Models/userModel')
const jwt = require('jsonwebtoken')


exports.userReg = async (req, res) => {
    const { email, username, password } = req.body

    try {
        const existingUser = await users.findOne({ email })
        if (existingUser) {
            res.status(406).json("User Already Exist!!")
        }
        else {
            const newUser = new users({ email, username, password })
            await newUser.save()
            res.status(200).json(newUser)
        }
    }
    catch (err) {
        console.log(err);
        res.status(400).json(err)
    }
}




exports.userLogin = async (req, res) => {
    const { email, password } = req.body

    try {
        const existingUser =await users.findOne({ email, password })
        if (existingUser) {
            const token = jwt.sign({ userId: existingUser._id }, process.env.SECRET_KEY)
            res.status(200).json({ token, username: existingUser.username })
        }
        else {
            res.status(400).json("Invlad email/password")
        }
    }
    catch (err) {
        // console.log(err);
        
        res.status(406).json(err)
    }

}


