const express = require('express');
const Router = express.Router();

// controllers
const Default_Controller = require('./controllers/default.controller');
const Authentication_Controller = require('./controllers/authentication.controller');
const Message_Controller = require('./controllers/message.controller');

// Default Routes
Router.get('/', Default_Controller.index);

// Authentication Routes
Router.get('/login', Authentication_Controller.get_login_form);
Router.post('/validate_login', Authentication_Controller.validate_login);
Router.get('/register', Authentication_Controller.get_register_form);
Router.post('/validate_registration', Authentication_Controller.validate_registration);
Router.get('/logout', Authentication_Controller.logout);

// Messaging Routes
Router.post('/send_message', Message_Controller.send_message);
Router.get('/select_contact/:id', Message_Controller.select_contact);

module.exports = Router;