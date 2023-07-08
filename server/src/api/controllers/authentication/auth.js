const User = require('../../model/model');
const path = require('path');
const {authenticate} = require('@google-cloud/local-auth');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');


//authenticating new user

exports.authentication = async (req,res)=>{

    const CREDENTIALS_PATH = path.join(process.cwd(), './src/api/controllers/authentication/credentials.json');
    try{
    //Authorize a client with credentials, by setting scope for gmail apis
      const auth = await authenticate({
          scopes:["https://mail.google.com/" , "https://www.googleapis.com/auth/userinfo.email"],
          keyfilePath: CREDENTIALS_PATH
      });

      //sending cookie to the client browser and new client to mongo database
      const cookie= auth.credentials.id_token;
      const token= await bcrypt.hashSync(cookie,10)
      if(token){
        
        res.cookie('cookie',cookie , {
          maxAge:365*24*60*60 * 10,
          httpOnly: true
        })

        const userinfo =jwt.decode(cookie)
        const email =userinfo.email;
        let user = await User.findOne({email: email});
        const refresh_token = auth.credentials.refresh_token;
        if(!user){
          user = await User.create({email: email, refresh_token: refresh_token , token_id : token});
        }else{
          user = await User.updateOne({refresh_token:refresh_token , token_id : token});
        }
      res.send({"status":200})

      }
      
    
  
    }catch(err){
      console.error("Error in authentication-------> ",err)
    }
    

    
  }



