const User = require('../../model/model');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");


//middleware to check user authorization
exports.authorize=async (req,res,next)=>{

    try{
    
        const bearertoken = req.headers["authorization"];
        const token = bearertoken.split(' ')[1];
        
        const userinfo = jwt.decode(token);
        if(userinfo){
            const user=await User.findOne({email:userinfo.email});
            (async()=>{
                if(bcrypt.compare(token , user.token_id)){
                    
                    const refresh = user.refresh_token
                    req.refresh = refresh
                    next()
                }
            })()
            


        }
        
    }catch(err){
        console.error("Error in authorization------->",err)
    }
    





    

}