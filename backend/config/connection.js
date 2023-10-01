const mongoose=require('mongoose')


mongoose.connect('mongodb://127.0.0.1:27017/poduppil').then(()=>{
    console.log("DB connected");
})
.catch(()=>{
    console.log("DB not connected");
})