import { Request, Response } from "express";
import {  Task } from "../entity/task.entity";
import { AppDataSource } from "../../ormconfig";
import { getUserId } from "../helpers/helper";

const repository = AppDataSource.getRepository(Task);

/**
 * Fetch all products with pagination.
 *
 * @param req - Express Request object
 * @param res - Express Response object
 * @returns Response with product data and pagination metadata
 */
export const fetchAllTasks = async (req: Request, res: Response ) => {
    const take =  parseInt(req.query.pageSize as string || '10');; // Number of products to retrieve per page
    const page = parseInt(req.query.pageNumber as string || '1'); // Current page number
    const token = req.headers['authorization'].split(' ')[1];
    const userId = getUserId(token)

    try {
        const [data, total] = await repository.findAndCount({
             where: { userId },
            take,
            skip: (page - 1) * take
        });

        const response = {
            data,
            meta: {
                total,
                page,
                last_page: Math.ceil(total / take)
            }
        };

        return res.status(200).send(response);
    } catch (err) {
        return res.status(500).send(err);
    }
};

/**
 * Create a new product.
 *
 * @param req - Express Request object
 * @param res - Express Response object
 * @returns Response with the created product
 */
export const createTask = async (req: Request, res: Response ) => {
    const { title, description, status } = req.body;
    const token = req.headers['authorization'].split(' ')[1];
    const userId = getUserId(token)

    try {
        const result = await repository.save({
            title,
            description,
            status,
            userId
        });

        return res.send(result);
    } catch (err) {
        return res.status(500).send(err);
    }
};

/**
 * Update a product by ID.
 *
 * @param req - Express Request object
 * @param res - Express Response object
 * @returns Response with a success message and the updated product
 */
export const UpdateTask = async (req: Request, res: Response) => {
    const id = req.params.id;
    const token = req.headers['authorization'].split(' ')[1];
    const userId = getUserId(token)

     const task=await repository.findOne({
            where: { id: parseInt(id) },
     });
    if (task.userId != userId) {
        return res.status(403).send('Not permitted');
    }
    const { title, description,status } = req.body;

    try {
        const result = await repository.update({ id: parseInt(id) }, {
            title,
            description,
            status
        });

        return res.status(200).send({
            message: 'Info updated',
            result
        });
    } catch (err) {
        return res.status(500).send(err);
    }
};

/**
 * Get a product by ID.
 *
 * @param req - Express Request object
 * @param res - Express Response object
 * @returns Response with the requested product
 */
export const getOneTask = async (req: Request, res: Response) => {
    const id = req.params.id;

    try {
        const result = await repository.findOne({ where: { id: parseInt(id) } });

        return res.status(200).send({
            result
        });
    } catch (err) {
        return res.status(500).send(err);
    }
};

/**
 * Delete a product by ID.
 *
 * @param req - Express Request object
 * @param res - Express Response object
 * @returns Response with the result of the deletion operation
 */
export const DeleteTask = async (req: Request, res: Response ) => {
    const id = req.params.id;
    const token = req.headers['authorization'].split(' ')[1];
    const userId = getUserId(token)

    try {
        const result = await repository.delete({ id: parseInt(id) });

        return res.status(200).send(result);
    } catch (err) {
        return res.status(500).send(err);
    }
};
