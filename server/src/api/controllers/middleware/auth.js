const{ CLIENT_ID , CLIENT_SECRET , refresh_token, REDIRECT_URIS} = require('../../../config/var')
const {google} = require('googleapis');

exports.authorize=()=>{
    const OAuth2Client = new google.auth.OAuth2( CLIENT_ID , CLIENT_SECRET, REDIRECT_URIS);
    OAuth2Client.setCredentials({refresh_token : refresh_token})
    return  OAuth2Client

}