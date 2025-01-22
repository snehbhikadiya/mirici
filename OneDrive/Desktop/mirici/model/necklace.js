const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const necklace=new Schema({
    necklaceimage:[String],
    productName:{
        type:String
    },
    productPrice:{
        type:Number
    },
    discription:{
        type:String
    },
    typeofnecklace:{
        type:String
    },
    fakemrp:{
        type:Number
    },
    realmrp:{
        type:Number
    },
    yousave:{
        type:Number
    },
    discount:{
        type:Number  
    },
    necklacesize:{
        type:[Number]
    },
    gold:{
        type:Number
    },
    silver:{
        type:Number
    },
    dimonad:{
        type:Number
    },
    makingcharge:{
        type:Number
    },
    gstpersent:{
        type:Number
    },
    gst:{
        type:Number
    },
    productheight:{
        type:Number
    },
    productwidth:{
        type:Number
    },
    productbandwith:{
        type:Number
    },

});

const necklaceproduct=mongoose.model('necklace',necklace);

module.exports=necklaceproduct;