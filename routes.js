const taskCreate = require("./task/create");
const taskDelete = require("./task/deleteById");
const taskGetAll = require("./task/getAll");
const taskUpdateById = require("./task/updateById");
const sectionGetAll = require("./section/getAll");
const sectionDelete = require("./section/deleteById");
const sectionCreate = require("./section/create");

function routes(app) {
    
    app.get('/', (req, res) => {
        res.send('Hello World!');
    })
    app.get('/section', sectionGetAll)
    app.delete('/section/:sectionId', sectionDelete)
    app.post('/section', sectionCreate)
    
    app.get('/task', taskGetAll)
    app.delete('/task/:taskId', taskDelete)
    app.post('/task', taskCreate)
    app.patch('/task/:taskId', taskUpdateById)
    
    }
module.exports = routes;