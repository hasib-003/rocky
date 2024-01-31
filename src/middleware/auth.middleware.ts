import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authorizationHeader = req.headers['authorization'];


        if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
            // If the Authorization header is missing or does not start with 'Bearer ', return an unauthenticated response
            return res.status(401).send({
                message: 'unauthenticated'
            });
        }

        const token = authorizationHeader.split(' ')[1]; // Extract the token from the 'Bearer <token>' format
        console.log(token);

        const payload: any = verify(token, process.env.SECRETE_TOKEN);

        if (!payload) {
            // If the token is not valid or expired, return an unauthenticated response
            return res.status(401).send({
                message: 'unauthenticated asdasd'
            });
        }
        console.log('payloadid',payload.id)

        req['uId'] = payload.id;
        next();
    } catch (error) {
        // If an error occurs during token verification or decoding, return an unauthenticated response
        return res.status(401).send({
            message: 'unauthenticated 2',
            error:error
        });
    }
};
