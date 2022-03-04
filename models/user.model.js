const database          = require('../helpers/mysql');

class User_Model{
    get_contacts(user_id){
        return new Promise((resolve, reject) => {
            let sql = `SELECT * FROM contacts  
                        LEFT JOIN users 
                            ON contacts.contact = users.id
                        WHERE user_id = ?`;
            database.query(sql, [user_id], (error, result) => {
                if(error) reject(error);
                resolve(result);
            });
        });
    }
}

module.exports = new User_Model;