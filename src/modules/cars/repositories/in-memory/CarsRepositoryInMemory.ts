import ICreateCarDTO from "../../dtos/ICreateCarDTO";
import Car from "../../infra/typeorm/entities/Car";
import Category from "../../infra/typeorm/entities/Category";
import ICarsRepository from "../ICarsRepository";

class CarsRepositoryInMemory implements ICarsRepository {
    cars: Car[] = [];
    async create({ name, description, daily_rate, brand, category_id, fine_amount, license_plate }: ICreateCarDTO): Promise<void> {
        const car = new Car();
        
        Object.assign(car, {name, description, daily_rate, brand, category_id, fine_amount, license_plate});
        this.cars.push(car);
    }

}

export default CarsRepositoryInMemory