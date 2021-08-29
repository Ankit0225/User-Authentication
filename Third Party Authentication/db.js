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
  },
  name: {
    type: Sequelize.DataTypes.STRING(40),
    unique: true,
    allowNull: false
  },
  email:{
    type: Sequelize.DataTypes.STRING(40),
    allowNull: false,
    
  },
  password: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
    unique: true
  }
})

module.exports ={
  db, User
}