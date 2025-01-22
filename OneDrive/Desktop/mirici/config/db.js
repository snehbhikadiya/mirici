const { default: mongoose } = require("mongoose");

mongoose.set('strictQuery',false);
mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log('data-base conected');
}).catch((err)=>{
    console.log(err);
})