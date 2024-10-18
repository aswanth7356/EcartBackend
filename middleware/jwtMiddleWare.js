const jwt =require('jsonwebtoken')


const jwtMiddle = (req, res, next) => {

    try {
        const token = req.headers.authorization.split(" ")[1]

        const { userId } = jwt.verify(token, process.env.SECRET_KEY)

        if (userId) {
            req.payload = userId
            next()
        }
        else {
            res.status(404).json("Invalid User/token")
        }
    }
    catch (err) {
        console.log(err,"JwtMiddle")
        res.status(400).json(err)
    }

}



module.exports=jwtMiddle
