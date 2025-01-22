exports.isAdmin=(req,res,next)=>{
    if(req.session.user && req.session.user.role === 'admin'){
        return next();
    }
    return res.redirect('/');
};

exports.isUser=(req,res,next)=>{
    if(req.isAuthenticated()&&req.user.role==="user"){
        return next();
    }
    res.status(403).send('Access denied');
};