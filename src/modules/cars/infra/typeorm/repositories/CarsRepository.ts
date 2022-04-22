import { getRepository, Repository } from "typeorm";
import ICreateCarDTO from "../../../dtos/ICreateCarDTO";
import ICarsRepository from "../../../testing/ICarsRepository";
import Car from "../entities/Car";

class CarsRepository implements ICarsRepository {
    private repository: Repository<Car>;

    constructor() {
        this.repository = getRepository(Car);
    }
    
    async findById(id: string): Promise<Car> {
        const car = await this.repository.findOne(id);
        return car
    }


    async create({ name, brand, category_id, daily_rate, description, fine_amount, license_plate, specifications, id }: ICreateCarDTO): Promise<Car> {
        const carDB = this.repository.create({
            name, brand, category_id, daily_rate, description, fine_amount, license_plate, specifications, id
        });
        await this.repository.save(carDB);

        return carDB;
    }
    async findByLicensePlate(license_plate: string): Promise<Car> {
        const carDB = await this.repository.findOne({ license_plate });
        return carDB
    }

    async findAvailable(brand?: string, category_id?: string, name?: string): Promise<Car[]> {
        const carsQuery = await this.repository
            .createQueryBuilder("cars")
            .where("available = :available", {available: true});

            if(brand){
                carsQuery.andWhere("cars.brand = :brand ", {brand});
            }

            if(name){
                carsQuery.andWhere("cars.name = :name ", {name});
            }

            if(category_id){
                carsQuery.andWhere("cars.category_id = :category_id ", {category_id});
            }

            const cars = await carsQuery.getMany(); 

            return cars
    }

}

export default CarsRepository;