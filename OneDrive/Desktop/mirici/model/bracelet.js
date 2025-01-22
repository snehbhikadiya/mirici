const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const bracelet=new Schema({
    braceletimage:[String],
    productName:{
        type:String
    },
    productPrice:{
        type:Number
    },
    discription:{
        type:String
    },
    typeofbracelet:{
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
    braceletsize:{
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

const braceletproduct=mongoose.model('bracelet',bracelet);

module.exports=braceletproduct;