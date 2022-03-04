import { AppError } from "../../../../shared/errors/AppError";
import CarsRepository from "../../infra/typeorm/repositories/CarsRepository";
import CarsRepositoryInMemory from "../../repositories/in-memory/CarsRepositoryInMemory"
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase"

let createCarSpecificationUseCase: CreateCarSpecificationUseCase
let carsRepositoryInMemory: CarsRepositoryInMemory;
describe("Create Car Specification", ()=> {

    beforeEach(()=> {
        carsRepositoryInMemory =  new CarsRepositoryInMemory();
        createCarSpecificationUseCase = new CreateCarSpecificationUseCase(carsRepositoryInMemory);
        
    })
    
    it("shoulb not be able to add a new specification to a now-existent car", async ()=> {
       expect(async () => {
        const car_id = "1234";
        const specifications_id  =  ["456"];
        await createCarSpecificationUseCase.execute({car_id, specifications_id});
       }).rejects.toBeInstanceOf(AppError);
    })
    
    
    it("shoulb be able to add a new specification to the car", async ()=> {
        const car = await carsRepositoryInMemory.create({
            name: "Name Car",
            description: "Description Car",
            daily_rate: 100,
            license_plate: "ABC-12345",
            fine_amount: 69, brand: "Brand",
            category_id: "Category"
        })
        const specifications_id  =  ["456"]; 
        await createCarSpecificationUseCase.execute({car_id: car.id, specifications_id});
    });


})