const express = require("express");
const routes = express.Router();
const usercontroller = require("../controllers/usercontroller");

const use = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

routes.get("/", use(usercontroller.getmirici));
routes.get("/blog", use(usercontroller.getblog));
routes.get("/about", use(usercontroller.getabout));
routes.get("/contact", use(usercontroller.getcontact));
routes.get("/ring", use(usercontroller.getring));
routes.get("/engagementring", use(usercontroller.getengagementring));
routes.get("/eternityring", use(usercontroller.geteternityring));
routes.get("/weddingring", use(usercontroller.getweddingring));
routes.get("/birthstonering", use(usercontroller.getbirthstonering));
routes.get("/bracelets", use(usercontroller.getbracelets));
routes.get("/tennisbracelets", use(usercontroller.gettennisbracelets));
routes.get("/chainlinkbracelets", use(usercontroller.getchainlinkbracelets));
routes.get("/banglebracelets", use(usercontroller.getbanglebracelets));
routes.get("/charmbracelets", use(usercontroller.getcharmbracelets));
routes.get("/pandals", use(usercontroller.getpandals));
routes.get("/pendantsets", use(usercontroller.getpandalsets));
routes.get("/dimondpendants", use(usercontroller.getdimondpandals));
routes.get("/necklace", use(usercontroller.getnecklace));
routes.get("/chainnecklace", use(usercontroller.getchainnecklace));
routes.get("/chokernecklace", use(usercontroller.getchokernecklace));
routes.get("/tennisnecklace", use(usercontroller.gettennisnecklace));
routes.get("/earrings", use(usercontroller.getearrings));
routes.get("/studsearrings", use(usercontroller.getstudsearrings));
routes.get("/topsearrings", use(usercontroller.gettopsearrings));
routes.get("/dangleearrings", use(usercontroller.getdangleearrings));
routes.get("/reset", use(usercontroller.getrestpassword));
routes.get("/404", use(usercontroller.errorpage));
// convert price
routes.get("/convertprice", use(usercontroller.convertprice));  
//register
routes.post("/register", use(usercontroller.register));
//login
routes.post("/login", use(usercontroller.login));
//forgetpassword
routes.post("/forgetpassword", use(usercontroller.forgetpassword));
//resetpassword
routes.post("/resetpassword", use(usercontroller.newpassword));
module.exports = routes;
