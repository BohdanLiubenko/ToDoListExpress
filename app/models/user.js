const { DataTypes, Model, Sequelize } = require('sequelize')
const sequelize = require('../configs/db')
const { ToDoList } = require('./todolist')

class User extends Model {}

async function initUserModel () {
  User.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.ENUM('USER', 'ADMIN'),
      allowNull: false,
      defaultValue: 'USER'
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.fn('now')
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.fn('now')
    }
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: false
  })

  User.hasMany(ToDoList, {
    onDelete: 'CASCADE',
    foreignKey: 'user_id'
  })
}

module.exports = { User, initUserModel }
