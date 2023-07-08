const { PORT } = require('./config/var');
const app = require('./config/express');
const mongoose = require('./config/mongoose');


mongoose.connectDB();



app.listen(PORT, () => console.log(`server started on port ${PORT}`));