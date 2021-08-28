const Sequelize = require('sequelize')

const sequelize = new Sequelize({
    host: 'localhost',
    dialect: 'sqlite',
    storage: __dirname + '/users.db'
    
})
const db = User.create({
  id:{
      type: Sequelize.DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
  }
})