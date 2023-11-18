const { User } = require('../models/user');
const { ToDoList } = require('../models/todolist');
const jwtProvider = require('jsonwebtoken');
const jwtUtil = require('../util/jwtUtil');

class toDoListController {
    async create(req, res, next) {
        const { name, description } = req.body;
        try {
            try{
            decodeToken = jwtProvider.verify(req.session.token, jwtUtil.jwtSecret);
            } catch (err){
                console.error(`catch token err: ${err} for ${req.session.token}`);
                res.redirect('/user');
                return;
              }
            const todo = await ToDoList.create({
                name: name,
                description: description,
                user_id: decodeToken.userId
            });

            res.status(200).json({ message: 'Todo created', todo: todo });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new toDoListController();