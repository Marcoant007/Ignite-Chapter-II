import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "../../../errors/AppError";
import UsersRepository from "../../../../modules/accounts/infra/typeorm/repositories/UsersRepository";


interface IPayload {
    sub: string;
}

export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
    //preciso receber o token
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        throw new AppError("Token Missing", 401);
    }

    //gerar array de tokens
    // [0] Bearer
    // [1] token
    const [, token] = authHeader.split(" ");

    try {
        const { sub:user_id } = verify(token, "e5b76debbddefa798f689fb61c4fa1f4") as IPayload;
       
        const usersRepository = new UsersRepository();
        const user = usersRepository.findById(user_id);

        if(!user){
            throw new AppError("User does not exists", 401)
        }

        request.user ={
            id: user_id
        }

        next();

    } catch (error) {
        throw new AppError("Invalid Token!", 401);
    }

    
}