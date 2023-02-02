const express = require("express")
const handlebars = require("express-handlebars")
const hostname = "127.0.0.1"
const port = 20376;
const app = express()
const router = require('./routers/index');

app.use(express.json())
app.use(express.static('src'))
app.use(express.urlencoded({ extended: true }))


app.engine('handlebars', handlebars.engine())
app.set('view engine', "handlebars")

require('./configs/session')(app);

router(app);

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});