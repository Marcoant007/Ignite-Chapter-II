import { getRepository, Repository } from "typeorm";
import ICreateCarDTO from "../../../dtos/ICreateCarDTO";
import ICarsRepository from "../../../repositories/ICarsRepository";
import Car from "../entities/Car";

class CarsRepository implements ICarsRepository {
    private repository : Repository<Car>;
    
    constructor(){
        this.repository = getRepository(Car);
    }

    async create({name,brand,category_id,daily_rate,description,fine_amount,license_plate}: ICreateCarDTO): Promise<Car> {
        const carDB  = this.repository.create({
            name,brand,category_id,daily_rate,description,fine_amount,license_plate
        });
        await this.repository.save(carDB);

        return carDB;
    }
    async findByLicensePlate(license_plate: string): Promise<Car> {
        const carDB = await this.repository.findOne({license_plate});
        return carDB
    }
}

export default CarsRepository;