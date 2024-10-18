const products = require('../Models/productModel')


exports.allProduct = async (req, res) => {

    try {
        const productSet = await products.find()
        res.status(200).json(productSet)
    }
    catch (err) {
        console.log(err);
        res.status(400).json(err)
    }
}



exports.getProduct = async (req, res) => {
    try {
        const { id } = req.params
        const product = await products.findOne({ id })
        res.status(200).json(product)
    }
    catch (err) {
        console.log(err);
        res.status(400).json(err)
    }
}