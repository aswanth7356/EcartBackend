const mongoose=require('mongoose')


const connectionString=process.env.DATABASE
mongoose.connect(connectionString).then((res)=>{
    console.log("Server Connected To MongoDB Database!!");
}).catch((err)=>{
    console.log(err);
})