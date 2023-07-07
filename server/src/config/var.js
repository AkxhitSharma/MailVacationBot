const path = require('path')

require('dotenv').config()


module.exports = {
    env: process.env.NODE_ENV,
    PORT : process.env.PORT,
    CLIENT_ID : process.env.CLIENT_ID,
    CLIENT_SECRET : process.env.CLIENT_SECRET,
    API_KEY : process.env.API_KEY,
    refresh_token : process.env.refresh_token,
    REDIRECT_URIS : process.env.REDIRECT_URIS
};