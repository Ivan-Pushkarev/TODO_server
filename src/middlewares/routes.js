const taskCreate = require("../task/create");
const taskDelete = require("../task/deleteById");
const taskUpdateById = require("../task/updateById");
const sectionGetAll = require("../section/getAll");
const sectionDelete = require("../section/deleteById");
const sectionCreate = require("../section/create");
const sectionUpdateById = require("../section/updateById");
const signIn = require("../user/signIn");
const signUp = require("../user/signUp");
const auth = require("./Auth");

function routes(app) {
    
    app.get('/section', sectionGetAll)
    app.delete('/section/:sectionId', auth, sectionDelete)
    app.post('/section', auth, sectionCreate)
    app.patch('/section/:sectionId', auth, sectionUpdateById)
    
    app.delete('/task/:taskId', auth, taskDelete)
    app.post('/task',auth, taskCreate)
    app.patch('/task/:taskId', auth, taskUpdateById)
    
    app.post('/user/signIn', signIn)
   // app.post('/user/signUp', signUp)
}
    
module.exports = routes;