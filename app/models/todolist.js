const { DataTypes, Model } = require('sequelize')
const sequelize = require('../configs/db')

class ToDoList extends Model { }

async function initToDoListModel () {
  ToDoList.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true
      },
      is_done: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }
    },
    {
      sequelize,
      modelName: 'ToDoList',
      tableName: 'to_do_lists',
      timestamps: false
    }
  )
}

module.exports = { ToDoList, initToDoListModel }
