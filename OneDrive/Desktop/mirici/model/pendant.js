const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const pendant=new Schema({
    pendantimage:[String],
    productName:{
        type:String
    },
    productPrice:{
        type:Number
    },
    discription:{
        type:String
    },
    typeofpendant:{
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
    pendantsize:{
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

const pendantproduct=mongoose.model('pendant',pendant);

module.exports=pendantproduct;