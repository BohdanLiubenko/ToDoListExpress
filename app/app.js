const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const errorMiddleware = require('./middleware/errorMiddleware')
const indexRouter = require('./routes/index')
const userRouter = require('./routes/user')
const todoRouter = require('./routes/todolist')
const adminRouter = require('./routes/admin')

const sequelize = require('./configs/db')

const session = require('express-session')

const { initUserModel, User } = require('./models/user')
const { initToDoListModel } = require('./models/todolist')

const bcrypt = require('bcryptjs')
const port = process.env.PORT || 3000
const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true
}))

app.use('/', indexRouter)
app.use('/user', userRouter)
app.use('/todos', todoRouter)
app.use('/admin', adminRouter)

app.use(errorMiddleware)

app.listen(port, async () => {
  console.log('Server running')
  try {
    await sequelize.authenticate()
    await initToDoListModel()
    await initUserModel()
    await sequelize.sync({ force: true })

    await User.create({
      email: 'admin@admin.com',
      password: await bcrypt.hash('root', 10),
      username: 'admin',
      role: 'ADMIN'
    })
    await User.create({
      email: 'bb@bb.bb',
      password: await bcrypt.hash('bbbb', 10),
      username: 'user'
    })
    console.log('Database synchronized successfully')
  } catch (error) {
    console.error(`erorr: ${error}`)
  }
})

module.exports = app
