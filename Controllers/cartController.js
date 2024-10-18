const carts = require('../Models/cartModel')


exports.addToCart = async (req, res) => {

    try {
        const { id, title, image, price } = req.body
        const userId = req.payload
        const quantity = 1

        const existing = await carts.findOne({ id, userId })
        if (existing) {
            existing.quantity += 1
            await existing.save()
            res.status(200).json("Item Quantity Updated!!")
        }
        else {
            const newItem = new carts({ id, title, price, image, quantity, userId })
            await newItem.save()
            res.status(200).json("Item Added To cart!!")
        }
    }
    catch (err) {
        console.log(err);
        res.status(400).json(err)
    }

}



exports.getCartItem = async (req, res) => {

    try {
        const userId = req.payload
        const item = await carts.find({ userId })
        res.status(200).json(item)
    }
    catch (err) {
        console.log(err)
        res.status(400).json(err)
    }

}


exports.removeFromCart = async (req, res) => {

    try {
        const _id = req.params.id
        const item = await carts.findOneAndDelete({ _id })
        res.status(200).json(item)
    }
    catch (err) {
        console.log(err)
        res.status(400).json(err)
    }

}


exports.increaseQuantity = async (req, res) => {
    try {
        const _id = req.params.id
        const item = await carts.findOne({ _id })
        if (item) {
            item.quantity += 1
            await item.save()
            res.status(200).json(item)
        }
        else {
            res.status(406).json("Invalid Item ID!!")
        }
    }
    catch (err) {
        console.log(err)
        res.status(400).json(err)
    }
}



exports.decreaseQuantity = async (req, res) => {
    try {
        const _id = req.params.id
        const item = await carts.findOne({ _id })
        if (item) {
            if (item.quantity > 1) {
                item.quantity -= 1
                await item.save()
                res.status(200).json(item)
            }
            else {
                await item.deleteOne()
                res.status(200).json("Item Removed!!")
            }
        }
        else {
            res.status(406).json("Invalid Item ID!!")
        }

    }
    catch (err) {
        console.log(err)
        res.status(400).json(err)
    }
}



exports.emptyCart = async (req, res) => {

    try {
        const  userId  = req.payload
        // console.log(userId)
        const data = await carts.deleteMany( {userId} )
        // console.log(data)
        res.status(200).json("Cart is Empty!!")
    }
    catch(err){
        res.status(400).json(err)
    }
   
}