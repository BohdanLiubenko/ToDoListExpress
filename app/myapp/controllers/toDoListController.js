const { User } = require('../models/user');
const { ToDoList } = require('../models/todolist');
const jwtProvider = require('jsonwebtoken');
const jwtUtil = require('../util/jwtUtil');

class toDoListController {
    async create(req, res, next) {
        const { name, description } = req.body;
        var decodeToken = null;
        try {
            try {
                decodeToken = jwtProvider.verify(req.session.token, jwtUtil.jwtSecret);
            } catch (err) {
                console.error(`catch token err: ${err} for ${req.session.token}`);
                res.redirect('/user');
                return;
            }
            const todo = await ToDoList.create({
                name: name,
                description: description,
                user_id: decodeToken.userId
            });

            res.redirect('/');
        } catch (error) {
            next(error);
        }
    }

    async update(req, res, next) {
        const id = req.params.id;
        const { name, description, is_done } = req.body;
        try {
            await ToDoList.update({
                name: name,
                description: description,
                is_done: is_done
            },
                {
                    where: {
                        id: id
                    }
                });
            res.status(200).json({ message: `updated ${id} successfully` });
        }
        catch (error) {
            next(error);
        }
    }

    async delete(req, res, next) {
        const id = req.params.id;
        try {
            await ToDoList.destroy({
                where: {
                    id: id
                }
            });
            res.status(200).json({ message: `deleted ${id} successfully` });
        } catch (error) {
            next(error);
        }
    }

    async renderIndex(req, res, next) {
        if (req.session.token) {
            var decodeToken = null
            try {
                decodeToken = jwtProvider.verify(req.session.token, jwtUtil.jwtSecret);
                const user = await User.findByPk(decodeToken.userId, {
                    order: [[ToDoList, 'is_done', 'ASC'], [ToDoList, 'id', 'ASC']],
                    include: [
                        {
                            model: ToDoList,
                        }
                    ],
                });
                res.render('index', { username: user.username, role: user.role, todolists: user.ToDoLists });
            } catch (err) {
                console.error(`catch token err: ${err} for ${req.session.token}`);
                return res.redirect('/user');
            }
        } else {
            res.redirect('/user');
        }
    }
}

module.exports = new toDoListController();