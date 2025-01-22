
const User = require('../model/user');
const Blog=require('../model/blog');
const Trendy=require('../model/trendy');
const Ring=require('../model/ring');
const Bracelet=require('../model/bracelet');
const Pendant=require('../model/pendant');
const Necklace=require('../model/necklace');
const Earring=require('../model/earring');
const upload=require('../middleware/multer');
const bcrypt = require('bcryptjs');
const removePTags = (discription) => discription.replace(/<\/?p[^>]*>/g, '');


exports.admin=async(req,res)=>{
    res.render('admin/admin',{title:"admin"});
}
exports.admdinlogin=async(req,res)=>{
    res.render('admin/loginadmin',{title:"adminlogin"});
}
exports.adminforgetpassword=async(req,res)=>{
    res.render('admin/forgetpassword',{title:"adminlogin"});   
}

exports.addproduct=async(req,res)=>{
    const searchquery = req.query.search || '';
    const searforproductchquery = req.query.search || '';
     const trendy=await Trendy.find();
     const blog=await Blog.find();
     const ring=await Ring.find();
     const bracelet=await Bracelet.find();
     const pendant=await Pendant.find();
     const necklace=await Necklace.find();
     const earring=await Earring.find();
     const success=req.flash('success');
     const error=req.flash('error');

     
    res.render('admin/addproduct',{title:"addproduct",success,error,trendy,blog,ring,bracelet,pendant,necklace,earring,searchquery,searforproductchquery});
}

exports.myuser=async(req,res)=>{
    const users=await User.find();
    res.render('admin/myuser',{title:"myuser",users});
}

//login admin panal
exports.loginadmin=async(req,res)=>{
    try {
        const {email,password}=req.body;
        //find user by email 
        const user=await User.findOne({email});

        if (!user) {
            return res.status(400).send('User not found');
          }
      
          // Check password
          const isMatch = await bcrypt.compare(password, user.password);
          if (!isMatch) {
            return res.status(400).send('Invalid credentials');
          }
      
          // Set session
          req.session.user = {
            id: user._id,
            role: user.role // Save user role in session
          };
      
          res.redirect('/admin');
      

    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
}

//logout the admin panal
exports.logout = async (req, res) => {
    req.logout(function(err) {
        if (err) {
            return res.status(500).send('Failed to log out');
        }
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).send('Failed to destroy session');
            }
            res.clearCookie('connect.sid'); // Optional: Clear the session cookie
            res.json({ success: true });  // Responding with JSON since the frontend expects JSON
        });
    });
};

// add trendy products
exports.addtrendy = async (req, res) => {
    try {
      const { productName, productPrice, discription } = req.body;
      let imageUrls = [];
  
      // Check if req.files is not empty
      if (req.files && req.files.length > 0) {
        req.files.forEach((file) => {
            const isImage = file.mimetype.startsWith("image/");
            const isVideo = file.mimetype.startsWith("video/");

            if (isImage || isVideo) {
                imageUrls.push(`/img/uploads/trendy/${file.filename}`);
              } else {
                console.error("Unsupported file type");
              }

        });
    } else {
        console.error('No files uploaded');
    }
  
      const trendy = {
        images: imageUrls,
        productName,
        productPrice,
        discription
      };
  
      // Save to database
      await Trendy.create(trendy);
      req.flash( 'success',  'Product added successfully!' );
      res.redirect('/addproduct');
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  };
  
//update trendy product
exports.updatetrendy = async (req, res) => {
    const { id } = req.params;
    let newImages = [];

    if (req.files && req.files.length > 0) {
        req.files.forEach(file => {
            newImages.push(`/img/uploads/trendy/${file.filename}`);
        });

        if (req.body.old_image) {
            try {
                req.body.old_image.forEach(image => {
                    fs.unlinkSync('./public/img/uploads/trendy' + image);
                });
            } catch (error) {
                console.log('Error deleting old images:', error);
            }
        }
    } else {
        newImages = req.body.old_image;
    }
    let content=req.body.discription;
    let contentremoveptag=removePTags(content);
    const findtrendy={
        productName : req.body.productName,
        images : newImages,
        productPrice : req.body.productPrice,
        discription : contentremoveptag
    }
    req.flash( 'success',  'Product update successfully!' );
    await Trendy.findByIdAndUpdate(id,findtrendy);
    return res.redirect('/addproduct');
};


//creat blog
exports.addblog = async (req, res) => {
    try {
        const { bloghading, blogcontentmainpage,titleofcontent1,content1,titleofcontent2,content2,titleofcontent3,content3 } = req.body;
        let imageUrls = [];

        // Check if req.files is not empty
        if (req.files && req.files.length > 0) {
            req.files.forEach((file) => {
            const isImage = file.mimetype.startsWith("image/");
            const isVideo = file.mimetype.startsWith("video/");

            if (isImage || isVideo) {
                imageUrls.push(`/img/uploads/blog/${file.filename}`);
              } else {
                console.error("Unsupported file type");
              }
            });

        } else {
            console.error('No files uploaded');
        }

        const blog = {
            blogimage: imageUrls,
            bloghading,
            blogcontentmainpage,
            titleofcontent1,
            content1,
            titleofcontent2,
            content2,
            titleofcontent3,
            content3
        };

        await Blog.create(blog);
        req.flash( 'success',  'Blog added successfully!' );
        res.redirect('/addproduct');
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
  

//update blog
exports.updateblog = async (req, res) => {
    const { id } = req.params;
    let newImages = [];

    if (req.files && req.files.length > 0) {
        req.files.forEach(file => {
            newImages.push(`/img/uploads/blog/${file.filename}`);
        });

        if (req.body.old_image) {
            try {
                req.body.old_image.forEach(image => {
                    fs.unlinkSync('./public/img/uploads/blog' + image);
                });
            } catch (error) {
                console.log('Error deleting old images:', error);
            }
        }
    } else {
        newImages = req.body.old_image;
    }

    const findblog={
        bloghading : req.body.bloghading,
        images : newImages,
        blogcontentmainpage : req.body.blogcontentmainpage,
        titleofcontent1 : req.body.titleofcontent1,
        content1:req.body.content1,
        titleofcontent2:req.body.titleofcontent2,
        content2:req.body.content2,
        titleofcontent3:req.body.titleofcontent3,
        content3:req.body.content3
    }
   
    req.flash( 'success',  'Blog update successfully!' );
    await Blog.findByIdAndUpdate(id,findblog);
    return res.redirect('/addproduct');
};


//add ring product
exports.addring = async (req, res) => {
    try {
        const { productName, productPrice,discription,typeofring,fakemrp,realmrp,yousave,discount,ringsize,gold,silver,dimonad,makingcharge,gstpersent,gst,productheight,productwidth,productbandwith } = req.body;
        let imageUrls = [];

        // Check if req.files is not empty
        if (req.files && req.files.length > 0) {
            req.files.forEach((file) => {
            const isImage = file.mimetype.startsWith("image/");
            const isVideo = file.mimetype.startsWith("video/");

            if (isImage || isVideo) {
                imageUrls.push(`/img/uploads/ring/${file.filename}`);
              } else {
                console.error("Unsupported file type");
              }
            });

        } else {
            console.error('No files uploaded');
        }

        const parsedRingsize = ringsize ? ringsize.map(size => parseInt(size, 10)) : [];
        const trimproductname=productName.trim();
        const ring = {
            ringimage: imageUrls,
            productName:trimproductname,
            productPrice,
            discription,
            typeofring,
            fakemrp,
            realmrp,
            yousave,
            discount,
            ringsize:parsedRingsize,
            gold,
            silver,
            dimonad,
            makingcharge,
            gstpersent,
            gst,
            productheight,
            productwidth,
            productbandwith
        };
        
        await Ring.create(ring);
        req.flash( 'success',  'Ring added successfully!' );
        res.redirect('/addproduct');
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


//updatering
exports.updatering = async (req, res) => {
    const { id } = req.params;
    let newImages = [];

    if (req.files && req.files.length > 0) {
        req.files.forEach(file => {
            newImages.push(`/img/uploads/ring/${file.filename}`);
        });

        if (req.body.old_image) {
            try {
                req.body.old_image.forEach(image => {
                    fs.unlinkSync('./public/img/uploads/ring' + image);
                });
            } catch (error) {
                console.log('Error deleting old images:', error);
            }
        }
    } else {
        newImages = req.body.old_image;
    }
     const { ringsize } = req.body;

     const parsed = ringsize ? ringsize.map(size => parseInt(size, 10)) : [];
    const findring={
        ringimage: newImages,
        productName:req.body.productName.trim(),
        productPrice:req.body.productPrice,
        discription:req.body.discription,
        typeofring:req.body.typeofring,
        fakemrp:req.body.fakemrp,
        realmrp:req.body.realmrp,
        yousave:req.body.yousave,
        discount:req.body.discount,
        ringsize: parsed,
        gold:req.body.gold,
        silver:req.body.silver,
        dimonad:req.body.dimonad,
        makingcharge:req.body.makingcharge,
        gstpersent:req.body.gstpersent,
        gst:req.body.gst,
        productheight:req.body.productheight,
        productwidth:req.body.productwidth,
        productbandwith:req.body.productbandwith
    }
   
    req.flash( 'success',  'Ring update successfully!' );
    await Ring.findByIdAndUpdate(id,findring);
    return res.redirect('/addproduct');
};

//=====================add bracelet===============
exports.addbracelet = async (req, res) => {
    try {
        const { productName, productPrice,discription,typeofbracelet,fakemrp,realmrp,yousave,discount,braceletsize,gold,silver,dimonad,makingcharge,gstpersent,gst,productheight,productwidth,productbandwith } = req.body;
        let imageUrls = [];

        // Check if req.files is not empty
        if (req.files && req.files.length > 0) {
            req.files.forEach((file) => {
            const isImage = file.mimetype.startsWith("image/");
            const isVideo = file.mimetype.startsWith("video/");

            if (isImage || isVideo) {
                imageUrls.push(`/img/uploads/bracelet/${file.filename}`);
              } else {
                console.error("Unsupported file type");
              }
            });

        } else {
            console.error('No files uploaded');
        }
        const parsedbraceletsize = braceletsize ? braceletsize.map(size => parseInt(size, 10)) : [];     
        const trimproductname=productName.trim();

        const bracelet = {
            braceletimage: imageUrls,
            productName:trimproductname,
            productPrice,
            discription,
            typeofbracelet,
            fakemrp,
            realmrp,
            yousave,
            discount,
            braceletsize:parsedbraceletsize,
            gold,
            silver,
            dimonad,
            makingcharge,
            gstpersent,
            gst,
            productheight,
            productwidth,
            productbandwith
        };

        req.flash( 'success',  'bracelet added successfully!' );
        await Bracelet.create(bracelet);
        res.redirect('/addproduct');
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


//update bracelet
exports.updatebracelet = async (req, res) => {
    const { id } = req.params;
    let newImages = [];

    if (req.files && req.files.length > 0) {
        req.files.forEach(file => {
            newImages.push(`/img/uploads/bracelet/${file.filename}`);
        });

        if (req.body.old_image) {
            try {
                req.body.old_image.forEach(image => {
                    fs.unlinkSync('./public/img/uploads/bracelet' + image);
                });
            } catch (error) {
                console.log('Error deleting old images:', error);
            }
        }
    } else {
        newImages = req.body.old_image;
    }
     const { braceletsize } = req.body;

     const parsed = braceletsize ? braceletsize.map(size => parseInt(size, 10)) : [];

    const findbracelet={
        braceletimage: newImages,
        productName:req.body.productName.trim(),
        productPrice:req.body.productPrice,
        discription:req.body.discription,
        typeofbracelet:req.body.typeofbracelet,
        fakemrp:req.body.fakemrp,
        realmrp:req.body.realmrp,
        yousave:req.body.yousave,
        discount:req.body.discount,
        braceletsize: parsed,
        gold:req.body.gold,
        silver:req.body.silver,
        dimonad:req.body.dimonad,
        makingcharge:req.body.makingcharge,
        gstpersent:req.body.gstpersent,
        gst:req.body.gst,
        productheight:req.body.productheight,
        productwidth:req.body.productwidth,
        productbandwith:req.body.productbandwith
    }
   
    req.flash( 'success',  'bracelet update successfully!' );
    await Bracelet.findByIdAndUpdate(id,findbracelet);
    return res.redirect('/addproduct');
};

//===============add pendant==================
exports.addpendant = async (req, res) => {
    try {
        const { productName, productPrice,discription,typeofpendant,fakemrp,realmrp,yousave,discount,pendantsize,gold,silver,dimonad,makingcharge,gstpersent,gst,productheight,productwidth,productbandwith } = req.body;
        let imageUrls = [];

        // Check if req.files is not empty
        if (req.files && req.files.length > 0) {
            req.files.forEach((file) => {
            const isImage = file.mimetype.startsWith("image/");
            const isVideo = file.mimetype.startsWith("video/");

            if (isImage || isVideo) {
                imageUrls.push(`/img/uploads/pendant/${file.filename}`);
              } else {
                console.error("Unsupported file type");
              }
            });

        } else {
            console.error('No files uploaded');
        }
        const parsedpendantsize = pendantsize ? pendantsize.map(size => parseInt(size, 10)) : [];
        const trimproductname=productName.trim();

        const pendant = {
            pendantimage: imageUrls,
            productName:trimproductname,
            productPrice,
            discription,
            typeofpendant,
            fakemrp,
            realmrp,
            yousave,
            discount,
            pendantsize:parsedpendantsize,
            gold,
            silver,
            dimonad,
            makingcharge,
            gstpersent,
            gst,
            productheight,
            productwidth,
            productbandwith
        };

        await Pendant.create(pendant);
        req.flash( 'success',  'pendant added successfully!' );
        res.redirect('/addproduct');
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

//===============update pandent===================
exports.updatependant = async (req, res) => {
    const { id } = req.params;
    let newImages = [];

    if (req.files && req.files.length > 0) {
        req.files.forEach(file => {
            newImages.push(`/img/uploads/pendant/${file.filename}`);
        });

        if (req.body.old_image) {
            try {
                req.body.old_image.forEach(image => {
                    fs.unlinkSync('./public/img/uploads/pendant' + image);
                });
            } catch (error) {
                console.log('Error deleting old images:', error);
            }
        }
    } else {
        newImages = req.body.old_image;
    }
     const { pendantsize } = req.body;

     const parsed = pendantsize ? pendantsize.map(size => parseInt(size, 10)) : [];

    const findpendant={
        pendantimage: newImages,
        productName:req.body.productName.trim(),
        productPrice:req.body.productPrice,
        discription:req.body.discription,
        typeofpendant:req.body.typeofpendant,
        fakemrp:req.body.fakemrp,
        realmrp:req.body.realmrp,
        yousave:req.body.yousave,
        discount:req.body.discount,
        pendantsize: parsed,
        gold:req.body.gold,
        silver:req.body.silver,
        dimonad:req.body.dimonad,
        makingcharge:req.body.makingcharge,
        gstpersent:req.body.gstpersent,
        gst:req.body.gst,
        productheight:req.body.productheight,   
        productwidth:req.body.productwidth,
        productbandwith:req.body.productbandwith
    }
   
    req.flash( 'success',  'pendant update successfully!' );
    await Pendant.findByIdAndUpdate(id,findpendant);
    return res.redirect('/addproduct');
};

//================add necklace======================
exports.addnecklace = async (req, res) => {
    try {
        const { productName, productPrice,discription,typeofnecklace,fakemrp,realmrp,yousave,discount,necklacesize,gold,silver,dimonad,makingcharge,gstpersent,gst,productheight,productwidth,productbandwith } = req.body;
        let imageUrls = [];

         // Check if req.files is not empty
         if (req.files && req.files.length > 0) {
            req.files.forEach((file) => {
            const isImage = file.mimetype.startsWith("image/");
            const isVideo = file.mimetype.startsWith("video/");

            if (isImage || isVideo) {
                imageUrls.push(`/img/uploads/necklace/${file.filename}`);
              } else {
                console.error("Unsupported file type");
              }
            });

        } else {
            console.error('No files uploaded');
        }
        const parsednecklacesize = necklacesize ? necklacesize.map(size => parseInt(size, 10)) : [];
        const trimproductname=productName.trim();
        const necklace = {
            necklaceimage: imageUrls,
            productName:trimproductname,
            productPrice,
            discription,
            typeofnecklace,
            fakemrp,
            realmrp,
            yousave,
            discount,
            necklacesize:parsednecklacesize,
            gold,
            silver,
            dimonad,
            makingcharge,
            gstpersent,
            gst,
            productheight,
            productwidth,
            productbandwith
        };
        req.flash( 'success',  'Necklace added successfully!' );
        await Necklace.create(necklace);
        res.redirect('/addproduct');
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

//===============update pandent===================
exports.updatenecklace = async (req, res) => {
    const { id } = req.params;
    let newImages = [];

    if (req.files && req.files.length > 0) {
        req.files.forEach(file => {
            newImages.push(`/img/uploads/necklace/${file.filename}`);
        });

        if (req.body.old_image) {
            try {
                req.body.old_image.forEach(image => {
                    fs.unlinkSync('./public/img/uploads/necklace' + image);
                });
            } catch (error) {
                console.log('Error deleting old images:', error);
            }
        }
    } else {
        newImages = req.body.old_image;
    }
     const { necklacesize } = req.body;

     const parsed = necklacesize ? necklacesize.map(size => parseInt(size, 10)) : [];

    const findnecklace={
        necklaceimage: newImages,
        productName:req.body.productName.trim(),
        productPrice:req.body.productPrice,
        discription:req.body.discription,
        typeofnecklace:req.body.typeofnecklace,
        fakemrp:req.body.fakemrp,
        realmrp:req.body.realmrp,
        yousave:req.body.yousave,
        discount:req.body.discount,
        necklacesize: parsed,
        gold:req.body.gold,
        silver:req.body.silver,
        dimonad:req.body.dimonad,
        makingcharge:req.body.makingcharge,
        gstpersent:req.body.gstpersent,
        gst:req.body.gst,
        productheight:req.body.productheight,   
        productwidth:req.body.productwidth,
        productbandwith:req.body.productbandwith
    }
    req.flash( 'success',  'Necklace update successfully!' );

    await Necklace.findByIdAndUpdate(id,findnecklace);
    return res.redirect('/addproduct');
};

// ===============add earring=================
exports.addearring = async (req, res) => {
    try {
        const { productName, productPrice,discription,typeofearring,fakemrp,realmrp,yousave,discount,earringsize,gold,silver,dimonad,makingcharge,gstpersent,gst,productheight,productwidth,productbandwith } = req.body;
        let imageUrls = [];

       // Check if req.files is not empty
       if (req.files && req.files.length > 0) {
        req.files.forEach((file) => {
        const isImage = file.mimetype.startsWith("image/");
        const isVideo = file.mimetype.startsWith("video/");

        if (isImage || isVideo) {
            imageUrls.push(`/img/uploads/earring/${file.filename}`);
          } else {
            console.error("Unsupported file type");
          }
        });

    } else {
        console.error('No files uploaded');
    }
        const parsedearringsize = earringsize ? earringsize.map(size => parseInt(size, 10)) : [];
        const trimproductname=productName.trim();
        const earring = {
            earringimage: imageUrls,
            productName:trimproductname,
            productPrice,
            discription,
            typeofearring,
            fakemrp,
            realmrp,
            yousave,
            discount,
            necklacesize:parsedearringsize,
            gold,
            silver,
            dimonad,
            makingcharge,
            gstpersent,
            gst,
            productheight,
            productwidth,
            productbandwith
        };
        req.flash( 'success',  'Earring added successfully!' );
        await Earring.create(earring);
        res.redirect('/addproduct');
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// =============update earring=================
exports.updateearring = async (req, res) => {
    const { id } = req.params;
    let newImages = [];

    if (req.files && req.files.length > 0) {
        req.files.forEach(file => {
            newImages.push(`/img/uploads/earring/${file.filename}`);
        });

        if (req.body.old_image) {
            try {
                req.body.old_image.forEach(image => {
                    fs.unlinkSync('./public/img/uploads/earring' + image);
                });
            } catch (error) {
                console.log('Error deleting old images:', error);
            }
        }
    } else {
        newImages = req.body.old_image;
    }
     const { earringsize } = req.body;

     const parsed = earringsize ? earringsize.map(size => parseInt(size, 10)) : [];

    const findearring={
        earringimage: newImages,
        productName:req.body.productName.trim(),
        productPrice:req.body.productPrice,
        discription:req.body.discription,
        typeofearring:req.body.typeofearring,
        fakemrp:req.body.fakemrp,
        realmrp:req.body.realmrp,
        yousave:req.body.yousave,
        discount:req.body.discount,
        necklacesize: parsed,
        gold:req.body.gold,
        silver:req.body.silver,
        dimonad:req.body.dimonad,
        makingcharge:req.body.makingcharge,
        gstpersent:req.body.gstpersent,
        gst:req.body.gst,
        productheight:req.body.productheight,   
        productwidth:req.body.productwidth,
        productbandwith:req.body.productbandwith
    }
   
    req.flash( 'success',  'Earring update successfully!' );
    await Earring.findByIdAndUpdate(id,findearring);
    return res.redirect('/addproduct');
};



//delete trendy product
exports.delete=async(req,res)=>
    {
        const {id}=req.params
        req.flash('error', 'Product deleted successfully!' );
        await Trendy.findByIdAndDelete(id)
        res.redirect('/addproduct');
    }

//blog delete product
exports.blogdelete=async(req,res)=>{
    const {id}=req.params
    req.flash('error', 'Product deleted successfully!' );
        await Blog.findByIdAndDelete(id)
        res.redirect('/addproduct');
}

//ring delete product
exports.ringdelete=async(req,res)=>{
    const {id}=req.params
    req.flash('error', 'Product deleted successfully!' );
        await Ring.findByIdAndDelete(id)
        res.redirect('/addproduct');
}

//bracelet delete product
exports.braceletdelete=async(req,res)=>{
    const {id}=req.params
    req.flash('error', 'Product deleted successfully!' );
        await Bracelet.findByIdAndDelete(id)
        res.redirect('/addproduct');
}

//bracelet delete product
exports.pendantdelete=async(req,res)=>{
    const {id}=req.params
    req.flash('error', 'Product deleted successfully!' );
        await Pendant.findByIdAndDelete(id)
        res.redirect('/addproduct');
}

//necklace delete product
exports.necklacedelete=async(req,res)=>{
    const {id}=req.params
    req.flash('error', 'Product deleted successfully!' );
        await Necklace.findByIdAndDelete(id)
        res.redirect('/addproduct');
}

//earring delete product
exports.earringdelete=async(req,res)=>{
    const {id}=req.params
    req.flash('error', 'Product deleted successfully!' );
        await Earring.findByIdAndDelete(id)
        res.redirect('/addproduct');
}
