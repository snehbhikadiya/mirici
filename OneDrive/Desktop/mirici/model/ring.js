const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const ring=new Schema({
    ringimage:[String],
    productName:{
        type:String
    },
    productPrice:{
        type:Number
    },
    discription:{
        type:String
    },
    typeofring:{
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
    ringsize:{
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

const ringproduct=mongoose.model('ring',ring);

module.exports=ringproduct;