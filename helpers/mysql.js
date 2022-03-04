const mysql             = require("mysql");
const yaml_config       = require('node-yaml-config');

const config = yaml_config.load('./config.yml');

// Create a connection to the database
const connection = mysql.createConnection(config.database);

// open the MySQL connection
connection.connect(error => {
  if (error) throw error;
  console.log("Successfully connected to the mysql database.");
});

module.exports = connection;