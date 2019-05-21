module.exports = (req,res,next) =>{
    if(req.session.user !== undefined) {
        res.redirect('/accueil');
    }
    next();
}