import { inject, injectable } from "tsyringe";
import Car from "../../infra/typeorm/entities/Car";
import { AppError } from "../../../../shared/errors/AppError";
import ICarsRepository from "../../testing/ICarsRepository";
import { ISpecificationsRepository } from "../../testing/ISpecificationsRepository";


interface IRequest {
    car_id: string;
    specifications_id: string[];
}
@injectable()
class CreateCarSpecificationUseCase {

    constructor(
        @inject("CarsRepository")
        private carsRepository: ICarsRepository,
        
        @inject("SpecificationsRepository")
        private specificationsRepository: ISpecificationsRepository,
    ){}

    async execute({car_id,specifications_id}:IRequest): Promise<Car> {
        const carExists = await this.carsRepository.findById(car_id);
        if(!carExists){
            throw new AppError("Car does not exits!");
        }

        const specificationsExists = await this.specificationsRepository.findByIds(specifications_id);
        carExists.specifications = specificationsExists;
        await this.carsRepository.create(carExists);

        return carExists;
    }
}

export { CreateCarSpecificationUseCase };