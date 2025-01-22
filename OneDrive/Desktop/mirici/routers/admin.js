const express = require("express");
const routes = express.Router();
const { isAdmin } = require("../middleware/authorised");
const admincontroller = require("../controllers/admincontroller");
const upload = require("../middleware/multer");
const braceletproduct = require("../model/bracelet");

const use = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

routes.get("/admin", isAdmin, use(admincontroller.admin));
routes.get("/adminlogin", use(admincontroller.admdinlogin));
routes.get("/addproduct", isAdmin, use(admincontroller.addproduct));
routes.get("/myuser", isAdmin, use(admincontroller.myuser));
routes.get('/delete/:id',use(admincontroller.delete));
routes.get('/blogdelete/:id',use(admincontroller.blogdelete));
routes.get('/ringdelete/:id',use(admincontroller.ringdelete));
routes.get('/braceletdelete/:id',use(admincontroller.braceletdelete));
routes.get('/pendantdelete/:id',use(admincontroller.pendantdelete));
routes.get('/necklacedelete/:id',use(admincontroller.necklacedelete));
routes.get('/earringdelete/:id',use(admincontroller.earringdelete));
routes.post("/loginadmin", use(admincontroller.loginadmin));
routes.post("/logout", use(admincontroller.logout));
//add trendy product
routes.post('/trendy', upload.array('image', 10), admincontroller.addtrendy);
//update trendy product
routes.post('/trendyupdate/:id',upload.array('image', 10),use(admincontroller.updatetrendy));
// add blog
routes.post('/blog',upload.array('blogimage',10),use(admincontroller.addblog));
//update blog
routes.post('/blogupdate/:id',upload.array('blogimage',10),use(admincontroller.updateblog));
//add ring
routes.post('/ring',upload.array('ringimage',10),use(admincontroller.addring));
//update ring
routes.post('/ringupdate/:id',upload.array('ringimage',10),use(admincontroller.updatering));
//crerate bracelet
routes.post('/bracelet',upload.array('braceletimage',10),use(admincontroller.addbracelet));
// update bracelet
routes.post('/braceletupdate/:id',upload.array('braceletimage',10),use(admincontroller.updatebracelet));
//create pendant
routes.post('/pendant',upload.array('pendantimage',10),use(admincontroller.addpendant));
//update pendant
routes.post('/pendantupdate/:id',upload.array('pendantimage',10),use(admincontroller.updatependant));
//create necklace
routes.post('/necklace',upload.array('necklaceimage',10),use(admincontroller.addnecklace));
//update pendant
routes.post('/necklaceupdate/:id',upload.array('necklaceimage',10),use(admincontroller.updatenecklace));
//create earring
routes.post('/earring',upload.array('earringimage',10),use(admincontroller.addearring));
//update pendant
routes.post('/earringupdate/:id',upload.array('earringimage',10),use(admincontroller.updateearring));
module.exports = routes;
