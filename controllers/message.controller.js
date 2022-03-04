const Message_Model = require('../models/message.model');
const User_Model = require('../models/user.model');

class Message_Controller{
    async send_message(request, response){
        console.log('Sender: ' + request.session.user_id);
        await Message_Model.send_message(request.session.user_id, request.body.message, request.session.contact_id);

        let contacts = await User_Model.get_contacts(request.session.user_id);
        let messages = await Message_Model.get_messages(request.session.user_id);

        response.render('./chatbox/chatbox', {title: 'Chatbox', contacts: contacts, messages: messages});
    }
    async select_contact(request, response){
        request.session.contact_id = request.params.id;

        let contacts = await User_Model.get_contacts(request.session.user_id);
        let messages = await Message_Model.get_messages(request.session.user_id, request.session.contact_id);

        response.render('./chatbox/chatbox', {title: 'Chatbox', contacts: contacts, messages: messages, sender: request.session.user_id});
    }
}

module.exports = new Message_Controller;