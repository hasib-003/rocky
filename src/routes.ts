import { Router } from 'express';
import {
    Login,
    Register,
} from './controller/authController';
import { authMiddleware } from './middleware/auth.middleware';
import { createTask, DeleteTask, fetchAllTasks, getOneTask, UpdateTask } from './controller/taskController';

export const routes = (router: Router) => {
    /**
     * User Authentication Routes
     */
    router.post('/api/register', Register);
    router.post('/api/login', Login);


    /**
     * task's Routes
     */
    router.get('/api/task', authMiddleware,fetchAllTasks);
    router.get('/api/task/:id', authMiddleware,getOneTask);
    router.post('/api/task', authMiddleware,createTask);
    router.put('/api/task/:id', authMiddleware,UpdateTask);
    router.delete('/api/task/:id', authMiddleware,DeleteTask);

};
