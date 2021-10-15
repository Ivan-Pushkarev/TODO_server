const mongoose = require('mongoose');

const connectionString =
    //'mongodb://localhost/TODO'
     'mongodb+srv://admin:ClXTnfqQJiRFUsky@cluster0.f0znm.mongodb.net/TODO';
const options = {
     useNewUrlParser: true,
     useUnifiedTopology: true,
     useFindAndModify: false,
     useCreateIndex: true
};
function dbConnection(){
mongoose.connect(connectionString, options)
    .then(() => console.log('Mongo DB connected'))
    .catch(err => console.log(err))
}
module.exports = dbConnection;
