const Authentication_Model = require('../models/authentication.model');
const User_Model = require('../models/user.model');
const Message_Model = require('../models/message.model');

class Authentication_Controller{
    get_login_form(request, response){
        let error = request.session.error;
        let message = request.session.message;
        delete request.session.error;
        delete request.session.message;

        response.render('./authentication/login_form', {
            title: 'Login Form', nav: 'Register', link: '/register', error_message: error, message: message});
    }
    async validate_login(request, response){
        let email = request.body.email_address;
        let password = request.body.password;

        // Validate the account of the user in the database. Returns true if the account exists.
        let check_user = await Authentication_Model.validate_login(email, password)
            .catch((error) => {
                request.session.error = 'Database Error';
                response.redirect('/login');
            });
        
        if(check_user === 'user_found'){
            let user = await Authentication_Model.get_user(email);
            request.session.user_id = user[0].id;
            let contacts = await User_Model.get_contacts(request.session.user_id);
            let messages = await Message_Model.get_messages(request.session.user_id, contacts[0].contact);
            response.render('./chatbox/chatbox', {title: 'Chatbox', contacts: contacts, messages: []});
        }else if((check_user === 'user_not_found')){
            request.session.error = 'Invalid username or password';
            response.redirect('/login');
        }
    }
    get_register_form(request, response){
        let error = request.session.error;
        delete request.session.error;
        response.render('./authentication/register_form', {
            title: 'Register Form', nav: 'Login', link: '/login', error_message: error}
        );
    }
    async validate_registration(request, response){
        try{
            await Authentication_Model.validate_registration(request.body);
        }catch(err){
            request.session.error = 'Invalid Input';
            response.redirect('/register');
            return;
        }
        request.session.message = 'Account Created';
        response.redirect('/login');
    }
    logout(request, response){
        request.session.destroy();
        response.redirect('/login');
    }
}

module.exports = new Authentication_Controller;