const express=require('express');
const routes=express.Router();
const user=require('./user');
const admin=require('./admin');

routes.use('/',user);
routes.use('/',admin);

module.exports=routes;