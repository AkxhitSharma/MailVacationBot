const path = require('path')

require('dotenv').config()


module.exports = {
    PORT : process.env.PORT,
    CLIENT_ID : process.env.CLIENT_ID,
    CLIENT_SECRET : process.env.CLIENT_SECRET,
    REDIRECT_URIS : process.env.REDIRECT_URIS,
    MONGODB_URI : process.env.MONGODB_URI,
};