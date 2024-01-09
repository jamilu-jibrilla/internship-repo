const express = require('express')
const path = require('path')
const app = express()
const router = express.Router();
const routes = require('./router')


module.exports = router;


app.use(express.static((path.join(__dirname, 'public'))))

app.use('/fabric', express.static(path.join(__dirname, 'node_modules/fabric/dist')));

app.use('/', routes)

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log('server is running at http://localhost:'+port)
})