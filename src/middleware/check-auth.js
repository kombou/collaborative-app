module.exports = (req,res,next) =>{
    if(req.session.user === undefined) {
        req.flash("error","Vous êtes déconnecté");
        res.redirect('/user');
    } else  {
        res.locals.user = req.session.user;
    }
    next();
}