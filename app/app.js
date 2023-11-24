var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');
var todoRouter = require('./routes/todolist');
var adminRouter = require('./routes/admin');

var sequelize = require('./util/db');

const session = require('express-session');

const { initUserModel, User } = require('./models/user');
const { initToDoListModel } = require('./models/todolist');

const bcrypt = require('bcryptjs');
const port = process.env.PORT || 3000;
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
  token: 'token'
}));

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/todolist', todoRouter);
app.use('/admin', adminRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(port, async () => {
  console.log(`Server running`);
  try {
    await sequelize.authenticate();
    await initToDoListModel();
    await initUserModel();
    await sequelize.sync({ force: true });

    await User.create({
      email: 'admin@admin.com',
      password: await bcrypt.hash('root', 10),
      username: 'admin',
      role: 'ADMIN'
    });
    await User.create({
      email: 'bb@bb.bb',
      password: await bcrypt.hash('bbbb', 10),
      username: 'user',
    });
    console.log('Database synchronized successfully');
  } catch (error) {
    console.error(`erorr: ${error}`)
  }
});

module.exports = app;
