const express = require('express');
const routes = require("./middlewares/routes");
const bodyParser = require('./middlewares/bodyParser');
const dbConnection = require("./middlewares/dbConnection");
const cors = require("./middlewares/cors");
const logger = require("./middlewares/logger");

const app = express();
const PORT = process.env.PORT || 8000;

dbConnection();
logger(app);
bodyParser(app);
cors(app);
routes(app);
app.listen(PORT, () => {
    console.log(`TODO server listening at http://localhost:${PORT}`)
})

