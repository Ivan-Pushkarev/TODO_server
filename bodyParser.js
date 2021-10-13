const bp= require ('body-parser');

function bodyParser(app){
    
    app.use(bp.urlencoded({extended: false}))
    app.use(bp.json())
}
module.exports =bodyParser;