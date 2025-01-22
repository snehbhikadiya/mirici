const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    blogimage:[String], // Array of base64 strings
    bloghading: {type:String,require},
    blogcontentmainpage: {type:String,require},
    titleofcontent1:{type:String,require},
    content1:{type:String,require},
    titleofcontent2:{type:String,require},
    content2:{type:String,require},
    titleofcontent3:{type:String,require},
    content3:{type:String,require},
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
