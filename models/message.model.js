const database          = require('../helpers/mysql');
const dateTime          = require('node-datetime');

class User_Model{
    get_messages(user_id, reciever){
        return new Promise((resolve, reject) => {
            let sql = `SELECT * FROM messages  
                        LEFT JOIN users 
                            ON messages.reciever = users.id
                        WHERE sender IN (?,?) AND messages.reciever IN (?,?)`;
            let values = [user_id, reciever, user_id, reciever];
            database.query(sql, values, (error, result) => {
                if(error) reject(error);
                resolve(result);
            });
        });
    }
    send_message(sender, message, reciever){
        return new Promise((resolve, reject) => {
            let created_at = dateTime.create().format('Y-m-d H:M:S');
            let sql = `INSERT INTO messages (sender, message, reciever, created_at) VALUES (?,?,?,?)`;
            let values = [sender, message, reciever, created_at];
            database.query(sql, values, (error, result) => {
                if(error) reject(error);
                resolve();
            });
        });
    }
}

module.exports = new User_Model;