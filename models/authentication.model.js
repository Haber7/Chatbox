const database          = require('../helpers/mysql');
const MD5               = require("crypto-js/md5");
const dateTime          = require('node-datetime');

class Authentication_Model{
    validate_login(email, password){
        return new Promise((resolve, reject) => {
            let sql = `SELECT * FROM users WHERE email = ? AND password = ?`;
            let values = [email, MD5(password).toString()];
            database.query(sql, values, (error, result) => {
                if(error) reject(error);
                if(result.length === 1){
                    resolve('user_found');
                }else{
                    resolve('user_not_found');
                }
            });
        });
    }
    get_user(email){
        return new Promise((resolve, reject) => {
            let sql = `SELECT * FROM users WHERE email = ?`;
            database.query(sql, [email], (error, result) => {
                if(error) return reject(error);
                resolve(result);
            });
        });
    }
    validate_registration(inputs){
        return new Promise((resolve, reject) => {
            let timestamp = dateTime.create().format('Y-m-d H:M:S');
            let sql = 'INSERT INTO users (first_name, last_name, email, password, created_at) VALUES (?, ?, ?, ?, ?)';
            let values = [inputs.first_name, inputs.last_name, inputs.email_address, MD5(inputs.password).toString(), timestamp];

            values.forEach((element) => {                          // checks if there is a empty value in the form
                if(element === ''){
                    return reject(error);
                }
            })

            database.query(sql, values, (error, result) => {
                if(error){
                    console.log(error);
                    return reject(error);
                }
                resolve();
            });
        })
    }
}

module.exports = new Authentication_Model;