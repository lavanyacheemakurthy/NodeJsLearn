const jwt = require('jsonwebtoken');
const User = require('../models/user')
const auth = async (req, res, next) => {
    //console.log('Auth middleware');

    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        //if we forget giving header from postman , it will go to catch block
        const decode = jwt.verify(token, process.env.JWT_SECRETE)
        const user = await User.findOne({ _id: decode._id, 'tokens.token': token })
        //console.log({token,user});
        if (!user) {
            throw new Error()
        }

        //Add below line as at logout post request/other route handlers we need tocken 
        req.token = token;
        req.user = user;
        next();//comming to this line means user is authenticated by giving proper signature
        //with this if we do
        /*GET localhost:3000/users
        Headers: Key:'Authorization'
        Value : 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDc0ZDg2NzExOWY0NjQ1MDBkN2UzMTkiLCJpYXQiOjE1Njc5NDA2NjR9.hqy5icJVSNKTzoKbiAMjeDA97RY3lzKJ2EI4YhidKm8'
        Response - all users because we just authenticated but no where we said what to be displayed */
        /*GET localhost:3000/users
        Headers: Key:'Authorization'
        Value : 'Bearer <Wrong Value>'
        Response - {
        "error": "Please authenticate"
        }
        To get particular user , change route to
        router.get('/users/me', auth, async (req, res) => { 
            res.send(req.user)
        })
        */
    
    } catch (e){
        res.status(401).send({error:"Please authenticate"})
    }
      
}
module.exports = auth;