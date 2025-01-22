const User = require("../model/user");
const Trendy = require("../model/trendy");
const Blog = require("../model/blog");
const Ring = require("../model/ring");
const Bracelet = require("../model/bracelet");
const Pendant = require("../model/pendant");
const Necklace = require("../model/necklace");
const Earring = require("../model/earring");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const mailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const { title } = require("process");
//get mirici
exports.getmirici = async (req, res) => {
  const trendy = await Trendy.find();
  const searchquery = req.query.search || "";
  const page = parseInt(req.query.page) || 1;
  const limit = 15;
  const skip = (page - 1) * limit;
  const session = req.session;
  const searchcondition = searchquery
    ? { productName: { $regex: searchquery, $options: "i" } }
    : {};
  const totalitems = await Trendy.countDocuments(searchcondition);
  const trendys = await Trendy.find(searchcondition).skip(skip).limit(limit);

  res.render("mirici", {
    title: "GREEN CRAFT JEWELS",
    trendy: trendy,
    trendys,
    searchquery,
    page,
    totalPages: Math.ceil(totalitems / limit),
    session,
  });
};

//get blog
exports.getblog = async (req, res) => {
  const blog = await Blog.find();
  const searchquery = req.query.search || "";
  const page = parseInt(req.query.page) || 1;
  const limit = 20;
  const skip = (page - 1) * limit;
  const session = req.session;

  const searchcondition = searchquery
    ? { bloghading: { $regex: searchquery, $options: "i" } }
    : {};
  const totalitems = await Blog.countDocuments(searchcondition);
  const blogs = await Blog.find(searchcondition).skip(skip).limit(limit);
  res.render("blog", {
    title: "blog",
    blog: blog,
    blogs,
    searchquery,
    page,
    totalPages: Math.ceil(totalitems / limit),
    session,
  });
};

//get about
exports.getabout = async (req, res) => {
  const session = req.session;
  res.render("about", { title: "about", session });
};

// get contact
exports.getcontact = async (req, res) => {
  const session = req.session;
  res.render("contact", { title: "contact", session });
};

//get ring
exports.getring = async (req, res) => {
  const searchquery = req.query.search || "";
  const page = parseInt(req.query.page) || 1;
  const limit = 20;
  const skip = (page - 1) * limit;
  const session = req.session;

  const searchcondition = searchquery
    ? { productName: { $regex: searchquery, $options: "i" } }
    : {};
  const totalitems = await Ring.countDocuments(searchcondition);
  const rings = await Ring.find(searchcondition).skip(skip).limit(limit);

  const findring = await Ring.find({
    productName: {
      $nin: [
        "Engagement Ring",
        "engagement ring",
        "Engagement-Ring",
        "Eternity Ring",
        "eternity ring",
        "Eternity-Ring",
        "Wedding Ring",
        "wedding ring",
        "Wedding-Ring",
        "Birthstone Ring",
        "birthstone ring",
        "Birthstone-Ring",
        "Birth-Stone-Ring",
      ],
    },
  });

  const ring = await Ring.find();

  res.render("ring", {
    title: "ring",
    findring,
    ring,
    rings,
    page,
    totalPages: Math.ceil(totalitems / limit),
    searchquery,
    session,
  });
};

//getengagementring
exports.getengagementring = async (req, res) => {
  const searchquery = req.query.search || "";
  const page = parseInt(req.query.page) || 1;
  const limit = 20;
  const skip = (page - 1) * limit;
  const session = req.session;

  const searchcondition = searchquery
    ? { productName: { $regex: searchquery, $options: "i" } }
    : {};
  const totalitems = await Ring.countDocuments(searchcondition);
  const rings = await Ring.find(searchcondition).skip(skip).limit(limit);

  const findengagementing = await Ring.find({
    productName: {
      $in: ["Engagement Ring", "engagement ring", "Engagement-Ring"],
    },
  });
  const ring = await Ring.find();
  res.render("engagementring", {
    title: "engagementring",
    findengagementing,
    ring,
    rings,
    page,
    totalPages: Math.ceil(totalitems / limit),
    searchquery,
    session,
  });
};

// get eternityring
exports.geteternityring = async (req, res) => {
  const searchquery = req.query.search || "";
  const page = parseInt(req.query.page) || 1;
  const limit = 20;
  const skip = (page - 1) * limit;
  const session = req.session;

  const searchcondition = searchquery
    ? { productName: { $regex: searchquery, $options: "i" } }
    : {};
  const totalitems = await Ring.countDocuments(searchcondition);
  const rings = await Ring.find(searchcondition).skip(skip).limit(limit);
  const eternityring = await Ring.find({
    productName: {
      $in: ["Eternity Ring", "eternity ring", "Eternity-Ring"],
    },
  });

  const ring = await Ring.find();
  res.render("eternityring", {
    title: "eternityring",
    eternityring,
    ring,
    rings,
    page,
    totalPages: Math.ceil(totalitems / limit),
    searchquery,
    session,
  });
};

// getweddingring
exports.getweddingring = async (req, res) => {
  const searchquery = req.query.search || "";
  const page = parseInt(req.query.page) || 1;
  const limit = 20;
  const skip = (page - 1) * limit;
  const session = req.session;

  const searchcondition = searchquery
    ? { productName: { $regex: searchquery, $options: "i" } }
    : {};
  const totalitems = await Ring.countDocuments(searchcondition);
  const rings = await Ring.find(searchcondition).skip(skip).limit(limit);

  const weddingring = await Ring.find({
    productName: {
      $in: ["Wedding Ring", "wedding ring", "Wedding-Ring"],
    },
  });

  const ring = await Ring.find();
  res.render("weddingring", {
    title: "weddingring",
    weddingring,
    ring,
    rings,
    page,
    totalPages: Math.ceil(totalitems / limit),
    searchquery,
    session,
  });
};

exports.getbirthstonering = async (req, res) => {
  const searchquery = req.query.search || "";
  const page = parseInt(req.query.page) || 1;
  const limit = 20;
  const skip = (page - 1) * limit;
  const session = req.session;

  const searchcondition = searchquery
    ? { productName: { $regex: searchquery, $options: "i" } }
    : {};
  const totalitems = await Ring.countDocuments(searchcondition);
  const rings = await Ring.find(searchcondition).skip(skip).limit(limit);

  const birthstonering = await Ring.find({
    productName: {
      $in: [
        "Birthstone Ring",
        "birthstone ring",
        "Birthstone-Ring",
        "Birth-Stone-Ring",
      ],
    },
  });

  const ring = await Ring.find();
  res.render("birthstonering", {
    title: "birthstonering",
    birthstonering,
    ring,
    rings,
    page,
    totalPages: Math.ceil(totalitems / limit),
    searchquery,
    session,
  });
};

//get bracelets
exports.getbracelets = async (req, res) => {
  const searchquery = req.query.search || "";
  const page = parseInt(req.query.page) || 1;
  const limit = 20;
  const skip = (page - 1) * limit;
  const session = req.session;

  const searchcondition = searchquery
    ? { productName: { $regex: searchquery, $options: "i" } }
    : {};
  const totalitems = await Bracelet.countDocuments(searchcondition);
  const bracelets = await Bracelet.find(searchcondition)
    .skip(skip)
    .limit(limit);

  const findbracelets = await Bracelet.find({
    productName: {
      $nin: [
        "Tennis Bracelet",
        "tennis bracelet",
        "Tennis-Bracelet",
        "Tennis Braceletes",
        "Tennis-Braceletes",
        "Chain-link-Bracelet",
        "Chain link bracelet",
        "Chain link bracelet",
        "Chain Link Bracelet",
        "Chain Link Braceletes",
        "Bangle Bracelet",
        "bangle bracelet",
        "Bangle-Bracelet",
        "Bangle Braceletes",
        "bangle braceletes",
        "Charm Bracelet",
        "charm bracelet",
        "Charm-Bracelet",
        "Charm Braceletes",
        "charm braceletes",
      ],
    },
  });

  const bracelet = await Bracelet.find();
  res.render("bracelets", {
    title: "bracelets",
    findbracelets,
    bracelet: bracelet,
    bracelets,
    page,
    searchquery,
    totalPages: Math.ceil(totalitems / limit),
    session,
  });
};

// get tennis bracelets
exports.gettennisbracelets = async (req, res) => {
  const searchquery = req.query.search || "";
  const page = parseInt(req.query.page) || 1;
  const limit = 20;
  const skip = (page - 1) * limit;
  const session = req.session;

  const searchcondition = searchquery
    ? { productName: { $regex: searchquery, $options: "i" } }
    : {};
  const totalitems = await Bracelet.countDocuments(searchcondition);
  const bracelets = await Bracelet.find(searchcondition)
    .skip(skip)
    .limit(limit);
  const tennisbracelets = await Bracelet.find({
    productName: {
      $in: [
        "Tennis Bracelet",
        "tennis bracelet",
        "Tennis-Bracelet",
        "Tennis Braceletes",
        "Tennis-Braceletes",
      ],
    },
  });

  const bracelet = await Bracelet.find();
  res.render("tennisbracelets", {
    title: "tennisbracelets",
    tennisbracelets,
    bracelet: bracelet,
    bracelets,
    page,
    searchquery,
    totalPages: Math.ceil(totalitems / limit),
    session,
  });
};

// get chain link bracelets
exports.getchainlinkbracelets = async (req, res) => {
  const searchquery = req.query.search || "";
  const page = parseInt(req.query.page) || 1;
  const limit = 20;
  const skip = (page - 1) * limit;
  const session = req.session;

  const searchcondition = searchquery
    ? { productName: { $regex: searchquery, $options: "i" } }
    : {};
  const totalitems = await Bracelet.countDocuments(searchcondition);
  const bracelets = await Bracelet.find(searchcondition)
    .skip(skip)
    .limit(limit);
  const chainlinkbracelets = await Bracelet.find({
    productName: {
      $in: [
        "Chain-link-Bracelet",
        "Chain link bracelet",
        "Chain link bracelet",
        "Chain Link Bracelet",
        "Chain Link Braceletes",
      ],
    },
  });

  const bracelet = await Bracelet.find();
  res.render("chainlinkbracelets", {
    title: "chainlinkbracelets",
    chainlinkbracelets,
    bracelet: bracelet,
    bracelets,
    page,
    searchquery,
    totalPages: Math.ceil(totalitems / limit),
    session,
  });
};

// get bengle bracelets
exports.getbanglebracelets = async (req, res) => {
  const searchquery = req.query.search || "";
  const page = parseInt(req.query.page) || 1;
  const limit = 20;
  const skip = (page - 1) * limit;
  const session = req.session;

  const searchcondition = searchquery
    ? { productName: { $regex: searchquery, $options: "i" } }
    : {};
  const totalitems = await Bracelet.countDocuments(searchcondition);
  const bracelets = await Bracelet.find(searchcondition)
    .skip(skip)
    .limit(limit);
  const banglebracelets = await Bracelet.find({
    productName: {
      $in: [
        "Bangle Bracelet",
        "bangle bracelet",
        "Bangle-Bracelet",
        "Bangle Braceletes",
        "bangle braceletes",
      ],
    },
  });

  const bracelet = await Bracelet.find();
  res.render("banglebracelets", {
    title: "banglebracelets",
    banglebracelets,
    bracelet: bracelet,
    bracelets,
    page,
    searchquery,
    totalPages: Math.ceil(totalitems / limit),
    session,
  });
};

// get charmbracelets bracelets
exports.getcharmbracelets = async (req, res) => {
  const searchquery = req.query.search || "";
  const page = parseInt(req.query.page) || 1;
  const limit = 20;
  const skip = (page - 1) * limit;
  const session = req.session;

  const searchcondition = searchquery
    ? { productName: { $regex: searchquery, $options: "i" } }
    : {};
  const totalitems = await Bracelet.countDocuments(searchcondition);
  const bracelets = await Bracelet.find(searchcondition)
    .skip(skip)
    .limit(limit);
  const charmbracelets = await Bracelet.find({
    productName: {
      $in: [
        "Charm Bracelet",
        "charm bracelet",
        "Charm-Bracelet",
        "Charm Braceletes",
        "charm braceletes",
      ],
    },
  });

  const bracelet = await Bracelet.find();
  res.render("charmbracelets", {
    title: "charmbracelets",
    charmbracelets,
    bracelet: bracelet,
    bracelets,
    page,
    searchquery,
    totalPages: Math.ceil(totalitems / limit),
    session,
  });
};

//get pandals
exports.getpandals = async (req, res) => {
  const searchquery = req.query.search || "";
  const page = parseInt(req.query.page) || 1;
  const limit = 20;
  const skip = (page - 1) * limit;
  const session = req.session;

  const searchcondition = searchquery
    ? { productName: { $regex: searchquery, $options: "i" } }
    : {};
  const totalitems = await Pendant.countDocuments(searchcondition);
  const pendants = await Pendant.find(searchcondition).skip(skip).limit(limit);
  const findpendants = await Pendant.find({
    productName: {
      $nin: [
        "Diamond Pendant",
        "Diamond Pandals",
        "diamond pendant",
        "diamond pandal",
        "Diamond-Pandal",
        "Pendant Sets",
        "pendant sets",
        "Pendant Set",
        "pendant-set",
        "pendal set",
        "Pendal Set",
      ],
    },
  });

  const pendant = await Pendant.find();
  res.render("pandals", {
    title: "pandals",
    findpendants,
    pendant,
    pendants,
    page,
    searchquery,
    totalPages: Math.ceil(totalitems / limit),
    session,
  });
};

//get dimond pandals
exports.getdimondpandals = async (req, res) => {
  const searchquery = req.query.search || "";
  const page = parseInt(req.query.page) || 1;
  const limit = 20;
  const skip = (page - 1) * limit;
  const session = req.session;

  const searchcondition = searchquery
    ? { productName: { $regex: searchquery, $options: "i" } }
    : {};
  const totalitems = await Pendant.countDocuments(searchcondition);
  const pendants = await Pendant.find(searchcondition).skip(skip).limit(limit);
  const dimondpendants = await Pendant.find({
    productName: {
      $in: [
        "Diamond Pendant",
        "Diamond Pandals",
        "diamond pendant",
        "diamond pandal",
        "Diamond-Pandal",
      ],
    },
  });

  const pendant = await Pendant.find();
  res.render("dimondpendants", {
    title: "dimondpendants",
    dimondpendants,
    pendant,
    pendants,
    page,
    searchquery,
    totalPages: Math.ceil(totalitems / limit),
    session,
  });
};

//get pandals sets
exports.getpandalsets = async (req, res) => {
  const searchquery = req.query.search || "";
  const page = parseInt(req.query.page) || 1;
  const limit = 20;
  const skip = (page - 1) * limit;
  const session = req.session;

  const searchcondition = searchquery
    ? { productName: { $regex: searchquery, $options: "i" } }
    : {};
  const totalitems = await Pendant.countDocuments(searchcondition);
  const pendants = await Pendant.find(searchcondition).skip(skip).limit(limit);
  const pendantsets = await Pendant.find({
    productName: {
      $in: [
        "Pendant Sets",
        "pendant sets",
        "Pendant Set",
        "pendant-set",
        "pendal set",
        "Pendal Set",
      ],
    },
  });

  const pendant = await Pendant.find();
  res.render("pendantsets", {
    title: "pendantsets",
    pendantsets,
    pendant,
    pendants,
    page,
    searchquery,
    totalPages: Math.ceil(totalitems / limit),
    session,
  });
};

//get necklace
exports.getnecklace = async (req, res) => {
  const searchquery = req.query.search || "";
  const page = parseInt(req.query.page) || 1;
  const limit = 20;
  const skip = (page - 1) * limit;
  const session = req.session;

  const searchcondition = searchquery
    ? { productName: { $regex: searchquery, $options: "i" } }
    : {};
  const totalitems = await Necklace.countDocuments(searchcondition);
  const necklaces = await Necklace.find(searchcondition)
    .skip(skip)
    .limit(limit);
  const findnecklace = await Necklace.find({
    productName: {
      $nin: [
        "Chain Necklace",
        "Chain necklace",
        "Chain-Necklace",
        "Chain-necklace",
        "Chain Necklaces",
        "Tennis Necklace",
        "tennis necklace",
        "Tennis-Necklace",
        "tennis-necklace",
        "Choker",
        "choker pendant",
        "choker",
        "Choker Pendant",
      ],
    },
  });

  const necklace = await Necklace.find();
  res.render("necklace", {
    title: "necklace",
    findnecklace,
    necklace,
    necklaces,
    page,
    searchquery,
    totalPages: Math.ceil(totalitems / limit),
    session,
  });
};

//get chain necklace
exports.getchainnecklace = async (req, res) => {
  const searchquery = req.query.search || "";
  const page = parseInt(req.query.page) || 1;
  const limit = 20;
  const skip = (page - 1) * limit;
  const session = req.session;

  const searchcondition = searchquery
    ? { productName: { $regex: searchquery, $options: "i" } }
    : {};
  const totalitems = await Necklace.countDocuments(searchcondition);
  const necklaces = await Necklace.find(searchcondition)
    .skip(skip)
    .limit(limit);
  const chainnecklace = await Necklace.find({
    productName: {
      $in: [
        "Chain Necklace",
        "Chain necklace",
        "Chain-Necklace",
        "Chain-necklace",
        "Chain Necklaces",
      ],
    },
  });

  const necklace = await Necklace.find();
  res.render("chainnecklace", {
    title: "chainnecklace",
    chainnecklace,
    necklace,
    necklaces,
    page,
    searchquery,
    totalPages: Math.ceil(totalitems / limit),
    session,
  });
};

//get choker necklace
exports.getchokernecklace = async (req, res) => {
  const searchquery = req.query.search || "";
  const page = parseInt(req.query.page) || 1;
  const limit = 20;
  const skip = (page - 1) * limit;
  const session = req.session;

  const searchcondition = searchquery
    ? { productName: { $regex: searchquery, $options: "i" } }
    : {};
  const totalitems = await Necklace.countDocuments(searchcondition);
  const necklaces = await Necklace.find(searchcondition)
    .skip(skip)
    .limit(limit);
  const chokernecklace = await Necklace.find({
    productName: {
      $in: ["Choker", "choker pendant", "choker", "Choker Pendant"],
    },
  });

  const necklace = await Necklace.find();
  res.render("chokernecklace", {
    title: "chokernecklace",
    chokernecklace,
    necklace,
    necklaces,
    page,
    searchquery,
    totalPages: Math.ceil(totalitems / limit),
    session,
  });
};

//get choker necklace
exports.gettennisnecklace = async (req, res) => {
  const searchquery = req.query.search || "";
  const page = parseInt(req.query.page) || 1;
  const limit = 20;
  const skip = (page - 1) * limit;
  const session = req.session;

  const searchcondition = searchquery
    ? { productName: { $regex: searchquery, $options: "i" } }
    : {};
  const totalitems = await Necklace.countDocuments(searchcondition);
  const necklaces = await Necklace.find(searchcondition)
    .skip(skip)
    .limit(limit);
  const tennisnecklace = await Necklace.find({
    productName: {
      $in: [
        "Tennis Necklace",
        "tennis necklace",
        "Tennis-Necklace",
        "tennis-necklace",
      ],
    },
  });

  const necklace = await Necklace.find();
  res.render("tennisnecklace", {
    title: "tennisnecklace",
    tennisnecklace,
    necklace,
    necklaces,
    page,
    searchquery,
    totalPages: Math.ceil(totalitems / limit),
    session,
  });
};

//get earrings
exports.getearrings = async (req, res) => {
  const searchquery = req.query.search || "";
  const page = parseInt(req.query.page) || 1;
  const limit = 20;
  const skip = (page - 1) * limit;
  const session = req.session;

  const searchcondition = searchquery
    ? { productName: { $regex: searchquery, $options: "i" } }
    : {};
  const totalitems = await Earring.countDocuments(searchcondition);
  const earrings = await Earring.find(searchcondition).skip(skip).limit(limit);
  const findearrings = await Earring.find({
    productName: {
      $nin: [
        "Studs",
        "Stud",
        "Studs Earring",
        "Studs Earrings",
        "Stud Earring",
        "Stud Earrings",
        "studs earring",
        "studs earrings",
        "stud earrings",
        "stud earrings",
        "Tops",
        "tops",
        "Tops Earring",
        "Top Earrings",
        "Tops Earring",
        "Tops Earrings",
        "tops earring",
        "tops earrings",
        "tops earrings",
        "tops earrings",
        "Dangle Earrings",
        "dangle earrings",
        "Dangle Earring",
        "dangle earring",
      ],
    },
  });

  const earring = await Earring.find();
  res.render("earrings", {
    title: "earrings",
    findearrings,
    earring,
    earrings,
    page,
    searchquery,
    totalPages: Math.ceil(totalitems / limit),
    session,
  });
};

//get studs earrings
exports.getstudsearrings = async (req, res) => {
  const searchquery = req.query.search || "";
  const page = parseInt(req.query.page) || 1;
  const limit = 20;
  const skip = (page - 1) * limit;
  const session = req.session;

  const searchcondition = searchquery
    ? { productName: { $regex: searchquery, $options: "i" } }
    : {};
  const totalitems = await Earring.countDocuments(searchcondition);
  const earrings = await Earring.find(searchcondition).skip(skip).limit(limit);

  const studsearrings = await Earring.find({
    productName: {
      $in: [
        "Studs",
        "Stud",
        "Studs Earring",
        "Studs Earrings",
        "Stud Earring",
        "Stud Earrings",
        "studs earring",
        "studs earrings",
        "stud earrings",
        "stud earrings",
      ],
    },
  });

  const earring = await Earring.find();
  res.render("studsearrings", {
    title: "studsearrings",
    studsearrings,
    earring,
    earrings,
    page,
    searchquery,
    totalPages: Math.ceil(totalitems / limit),
    session,
  });
};

//get tops earrings
exports.gettopsearrings = async (req, res) => {
  const searchquery = req.query.search || "";
  const page = parseInt(req.query.page) || 1;
  const limit = 20;
  const skip = (page - 1) * limit;
  const session = req.session;

  const searchcondition = searchquery
    ? { productName: { $regex: searchquery, $options: "i" } }
    : {};
  const totalitems = await Earring.countDocuments(searchcondition);
  const earrings = await Earring.find(searchcondition).skip(skip).limit(limit);

  const topsearrings = await Earring.find({
    productName: {
      $in: [
        "Tops",
        "tops",
        "Tops Earring",
        "Top Earrings",
        "Tops Earring",
        "Tops Earrings",
        "tops earring",
        "tops earrings",
        "tops earrings",
        "tops earrings",
      ],
    },
  });

  const earring = await Earring.find();
  res.render("topsearrings", {
    title: "topsearrings",
    topsearrings,
    earring,
    earrings,
    page,
    searchquery,
    totalPages: Math.ceil(totalitems / limit),
    session,
  });
};

//get dangle earrings
exports.getdangleearrings = async (req, res) => {
  const searchquery = req.query.search || "";
  const page = parseInt(req.query.page) || 1;
  const limit = 20;
  const skip = (page - 1) * limit;
  const session = req.session;

  const searchcondition = searchquery
    ? { productName: { $regex: searchquery, $options: "i" } }
    : {};
  const totalitems = await Earring.countDocuments(searchcondition);
  const earrings = await Earring.find(searchcondition).skip(skip).limit(limit);

  const dangleearrings = await Earring.find({
    productName: {
      $in: [
        "Dangle Earrings",
        "dangle earrings",
        "Dangle Earring",
        "dangle earring",
      ],
    },
  });

  const earring = await Earring.find();
  res.render("dangleearrings", {
    title: "dangleearrings",
    dangleearrings,
    earring,
    earrings,
    page,
    searchquery,
    totalPages: Math.ceil(totalitems / limit),
    session,
  });
};

//get reset
exports.getrestpassword = async (req, res) => {
  res.render("reset", { title: "reset" });
};

//404 page
exports.errorpage = async (req, res) => {
  res.render("404", { title: "error" });
};
// Create user/admin (register)
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const hashpassword = await bcrypt.hash(password, 10); // Hash the password

    const newUser = await User.create({
      username: username,
      email: email,
      password: hashpassword,
    });

    req.flash("success", "Registered successfully");
    res.redirect("/?form=login");
  } catch (error) {
    console.log("error :>> ", error);
    req.flash("error", "An error occurred while registering user");
    res.redirect("/?form=register");
  }
};

//login user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      req.flash("error", "User not found");
      return res.redirect("/?form=login");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      req.flash("error", "Invalid credentials");
      return res.redirect("/?form=login");
    }

    req.flash("success", "Logged in successfully");
    res.redirect("/");
  } catch (error) {
    console.error(error);
    req.flash("error", "Server error");
    res.redirect("/?form=login");
    res.status(500).send("Server error");
  }
};

//forget password
const compny_email = process.env.EMAIL;
const compny_password = process.env.EMAIL_PASSWORD;

let transpoter = mailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: compny_email,
    pass: compny_password,
  },
});

exports.forgetpassword = async (req, res) => {
  const email = req.body.email;
  const findemail = await User.findOne({ email });
  if (!findemail) {
    return res.redirect("/?form=login");
  }

  const payload = {
    id: findemail.id,
  };
  const token = await jwt.sign(payload, process.env.SECREAT_KEY, {
    expiresIn: "24h",
  });

  const info = await transpoter.sendMail({
    from: `GREEN CRAFT JEWELS${compny_email}`,
    to: email,
    subject: "reset your password",
    html: `<a href="http://localhost:3000/reset?token=${token}">reset password</a>`,
  });
  console.log(info);
  return res.redirect("/?form=login");
};

//reset password
exports.reset = async (req, res) => {
  const token = req.query.token;
  res.render("reset", { token });
};

//reset password
exports.newpassword = async (req, res) => {
  const { token, password, confirmpass } = req.body;
  if (!token || !password || !confirmpass) {
    return res.redirect("/?form=login");
  }
  let decode = await jwt.verify(token, process.env.SECREAT_KEY);

  const { id } = decode;
  const findid = await User.findById(id);
  if (!findid) {
    return res.redirect("/?form=regiter");
  }
  findid.password = await bcrypt.hash(password, 10);
  await findid.save();

  return res.redirect("/?form=login");
};

//convert price
exports.convertprice = async (req, res, next) => {
  try {
    const { currency, price } = req.query;
    let convertedprice;
    if (currency === "INR") {
      const response = await axios.get(
        "https://api.exchangerate-api.com/v4/latest/USD"
      );
      const rate = response.data.rates.INR;
      convertedprice = (price * rate).toFixed(2);
    } else if (currency === "USD") {
      const response = await axios.get(
        "https://api.exchangerate-api.com/v4/latest/INR"
      );
      const rate = response.data.rates.USD;
      convertedprice = (price * rate).toFixed(2);
    }
    res.json({ convertedprice, currency });
  } catch (error) {
    res.status(500).json({ error: "Error converting currency" });
  }
};
