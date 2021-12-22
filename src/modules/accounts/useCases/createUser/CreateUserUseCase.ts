import { Hash } from "crypto";
import { inject, injectable } from "tsyringe";
import ICreateUserDTO from "../../dtos/ICreateUserDTO";
import IUsersRepository from "../../repositories/IUsersRepository";
import {hash} from "bcrypt";

@injectable()
class CreateUserUseCase {
    constructor
        (
            @inject("UsersRepository")
            private usersRepository: IUsersRepository
        ) { }

    async execute({ name, email, password, driver_license }: ICreateUserDTO): Promise<void> {
        const passwordHash = await hash(password, 8);

        const userAlreadyExists = await this.usersRepository.findByEmail(email);

        if(userAlreadyExists){
            throw new Error("User Already Exists")
        }

        await this.usersRepository.create({
            name,
            email,
            password: passwordHash,
            driver_license
        })
    }
}

export default CreateUserUseCase