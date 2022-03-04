const express           = require('express');
const bodyParser        = require('body-parser');
const yaml_config       = require('node-yaml-config');
const router            = require('./routes');
const session           = require('express-session');

const config = yaml_config.load(__dirname + '/config.yml');
const app = express();
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(session(config.session));
app.use(express.static('./views/resources'));

// Routes
app.use(router);

// 404 requests handler
app.use((request, response) => {
    response.status(404).render('404');
});

app.listen(config.server.port, () => {
    console.log('Open server port: ' + config.server.port);
});