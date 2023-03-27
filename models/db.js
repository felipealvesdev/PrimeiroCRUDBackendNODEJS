const Sequelize = require("sequelize");

    // CONEXAO COM O DATABASE MYSQL
    const sequelize = new Sequelize("minicrud","root","PASSWORD", {
        host: "localhost",
        dialect: "mysql" 
    });


module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}