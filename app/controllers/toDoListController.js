const { User } = require('../models/user')
const { ToDoList } = require('../models/todolist')

class ToDoListController {
  async create (req, res, next) {
    const { name, description } = req.body
    await ToDoList.create({
      name,
      description,
      user_id: req.session.user.id
    })

    res.redirect('/')
  }

  async update (req, res, next) {
    const id = req.params.id
    const { name, description, isDone } = req.body
    await ToDoList.update(
      {
        name,
        description,
        is_done: isDone
      },
      {
        where: {
          id
        }
      }
    )
    res.status(200).json({ message: `updated ${id} successfully` })
  }

  async delete (req, res, next) {
    const id = req.params.id
    await ToDoList.destroy({
      where: {
        id
      }
    })
    res.status(200).json({ message: `deleted ${id} successfully` })
  }

  async renderIndex (req, res, next) {
    const user = await User.findByPk(req.session.user.id, {
      order: [[ToDoList, 'is_done', 'ASC'], [ToDoList, 'id', 'ASC']],
      include: [
        {
          model: ToDoList
        }
      ]
    })
    res.render('index', { username: user.username, role: user.role, todolists: user.ToDoLists })
  }
}

module.exports = new ToDoListController()
