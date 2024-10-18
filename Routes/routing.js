const express=require('express')
const userController=require('../Controllers/userController')
const productController=require('../Controllers/productController')
const wishController=require('../Controllers/wishListController')
const jwtMiddle=require('../middleware/jwtMiddleWare')
const cartController=require('../Controllers/cartController')


const route=express.Router()


route.post('/reg',userController.userReg)
route.post('/log',userController.userLogin)


route.get('/products',productController.allProduct) 
route.get('/product/:id',productController.getProduct)


route.post('/wishlist',jwtMiddle,wishController.addToWish)
route.get('/wishlist',jwtMiddle,wishController.getWishList)
route.delete('/wishlist/:id',jwtMiddle,wishController.removeWishList)



route.post('/cart',jwtMiddle,cartController.addToCart)
route.get('/cart',jwtMiddle,cartController.getCartItem)
route.delete('/cart/:id',jwtMiddle,cartController.removeFromCart)
route.get('/inccart/:id',jwtMiddle,cartController.increaseQuantity)
route.get('/deccart/:id',jwtMiddle,cartController.decreaseQuantity)
route.delete('/emptyCart',jwtMiddle,cartController.emptyCart)




module.exports=route