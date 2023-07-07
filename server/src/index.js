const { PORT } = require('./config/var');
const app = require('./config/express');

app.listen(PORT, () => console.log(`server started on port ${PORT}`));