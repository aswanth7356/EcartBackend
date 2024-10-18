const wishList=require('../Models/wishModel')




exports.addToWish=async(req,res)=>{
    const {id,title,price,description,category,image,rating}=req.body
    const userId=req.payload


    try{
        const existing=await wishList.findOne({userId,id})
        if(existing){
            res.status(406).json("Product Already added")
        }
        else{
            const newProduct=new wishList({id,title,price,description,category,image,rating,userId})
            await newProduct.save()
            res.status(200).json(newProduct)
        }
    }
    catch(err){
        res.status(400).json(err)
    }
    
}


exports.getWishList=async(req,res)=>{

    try{
        const userId=req.payload
        const products=await wishList.find({userId})
        res.status(200).json(products)
    }
    catch(err){
        res.status(400).json(err)
    }
   
}




exports.removeWishList=async(req,res)=>{
    const _id=req.params.id

    try{
        const existing=await wishList.findByIdAndDelete({_id})
        if(existing){
            res.status(200).json(existing)
        }
        else{
            res.status(406).json("Deletion Failed")
        }
    }
    catch(err){
        res.status(400).json(err)
    }
   

}