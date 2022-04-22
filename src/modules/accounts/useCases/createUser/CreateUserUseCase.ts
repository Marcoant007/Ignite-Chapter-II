import { Hash } from "crypto";
import { inject, injectable } from "tsyringe";
import ICreateUserDTO from "../../dtos/ICreateUserDTO";
import {hash} from "bcryptjs";
import { AppError } from "../../../../shared/errors/AppError";
import IUsersRepository from "../../testing/IUsersRepository";

@injectable()
class CreateUserUseCase {
    constructor
        (
            @inject("UsersRepository")
            private usersRepository: IUsersRepository
        ) { }

    async execute({ name, email, password, driver_license, isAdmin }: ICreateUserDTO): Promise<void> {
        const passwordHash = await hash(password, 8);

        const userAlreadyExists = await this.usersRepository.findByEmail(email);

        if(userAlreadyExists){
            throw new AppError("User Already Exists", 400)
        }

        await this.usersRepository.create({
            name,
            email,
            password: passwordHash,
            driver_license,
            isAdmin
        })
    }
}

export default CreateUserUseCase