const express = require('express');
const routes = require("./routes");
const bodyParser = require('./bodyParser');
const dbConnection = require("./dbConnection");
const cors = require("./cors");

const app = express();
const PORT = process.env.PORT || 8000;

dbConnection();
bodyParser(app);
cors(app);
routes(app);
app.listen(PORT, () => {
    console.log(`TODO server listening at http://localhost:${PORT}`)
})

