import express from 'express';
import expressAsyncHandler from 'express-async-handler';
// import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { data } from '../data.js';
import Task from '../models/taskModel.js';
import { isAuth } from '../utils.js';

const taskRouter = express.Router();

taskRouter.get(
  '/',
  expressAsyncHandler(async (req, res) => {
    const pageSize = 9;
    const page = Number(req.query.pageNumber) || 1;

    const sortTasks = req.query.sortTasks || 'userName';

    const order = req.query.order || '';
    const sortOrder = order === 'lowest' ? 1 : order === 'highest' ? -1 : 1;

    const sort = { [sortTasks]: sortOrder };

    const tasks = await Task.find({})
      .populate()
      .sort(sort)
      .skip(pageSize * (page - 1))
      .limit(pageSize);

    res.send({ tasks });
  }),
);

taskRouter.get(
  '/seed',
  expressAsyncHandler(async (req, res) => {
    // await User.remove({});
    console.log('work');
    const createdTasks = await Task.insertMany(data.tasks);
    res.send({ createdTasks });
  }),
);

taskRouter.post(
  '/',
  expressAsyncHandler(async (req, res) => {
    const authorization = req.headers.authorization;
    let newTask;
    if (authorization) {
      const token = authorization.slice(7, authorization.length); // Bearer XXXXXX
      jwt.verify(token, process.env.JWT_SECRET || 'secretWord', (err, decode) => {
        req.user = decode;
      });
    }

    if (req.user && req.user._id) {
      newTask = {
        createdUser: req.user._id,
        userName: req.user.name,
        email: req.user.email,
        text: req.body.text,
      };
    } else {
      newTask = {
        userName: req.body.userName,
        email: req.body.email,
        text: req.body.text,
      };
    }

    const task = new Task(newTask);
    const createdTask = await task.save();
    res.send({
      message: 'Task created',
      task: createdTask,
    });
  }),
);

taskRouter.put(
  '/:id',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const taskId = req.params.id;

    const task = await Task.findById(taskId);

    if (task.createdUser == req.user._id || req.user.isAdmin) {
      task.status = req.body.status || task.status;

      const updatedTask = await task.save();
      res.send({ message: 'Task Updated', task: updatedTask });
    } else {
      res.status(403).send({
        error: 'You don not have an access to update a status of the task. ',
      });
    }
  }),
);

export default taskRouter;
