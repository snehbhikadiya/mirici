const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const earring=new Schema({
    earringimage:[String],
    productName:{
        type:String
    },
    productPrice:{
        type:Number
    },
    discription:{
        type:String
    },
    typeofearring:{
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
    earringsize:{
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

const earringproduct=mongoose.model('earring',earring);

module.exports=earringproduct;