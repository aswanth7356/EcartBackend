require('dotenv').config()
const express=require('express')
const cors=require('cors')
require('./Connection/db')
const router=require('./Routes/routing')



const ekartServer=express()

ekartServer.use(cors())
ekartServer.use(express.json())
ekartServer.use(router)




const PORT=3000 || process.env.PORT

ekartServer.listen(PORT,()=>{
    console.log(`Server Running at ${PORT}` );
})