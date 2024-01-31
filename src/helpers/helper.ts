import { verify } from 'jsonwebtoken';

export const getUserId =  (token:string) => {
        const payload: any = verify(token, process.env.SECRETE_TOKEN);
        return payload.id;
};
