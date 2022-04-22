import { AppError } from "../../../../shared/errors/AppError";
import CarsRepositoryInMemory from "../../testing/in-memory/CarsRepositoryInMemory";
import CreateCarUseCase from "./CreateCarUseCase"

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Car", () => {


    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory;
        createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);

    })

    it("should be able to create a new car ", async () => {
       const car =  await createCarUseCase.execute({
            name: "Name Car",
            description: "Description Car",
            daily_rate: 100,
            license_plate: "ABC-12345",
            fine_amount: 69, brand: "Brand",
            category_id: "Category"
        });

        expect(car).toHaveProperty("id");
    });


    it("should not be able to create a car with exists license plate", async () => {
        expect(async () => {
            await createCarUseCase.execute({
                name: "Name Car",
                description: "Description Car",
                daily_rate: 100,
                license_plate: "ABC-12345",
                fine_amount: 69,
                brand: "Brand",
                category_id: "Category"
            });

            await createCarUseCase.execute({
                name: "Car2",
                description: "Description Car",
                daily_rate: 100,
                license_plate: "ABC-12345",
                fine_amount: 69,
                brand: "Brand",
                category_id: "Category"
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it("should not be able to create a car with avaliable true by default", async () => {
        const car = await createCarUseCase.execute({
            name: "Car Available",
            description: "Description Car",
            daily_rate: 100,
            license_plate: "ABCD-12345",
            fine_amount: 69, brand: "Brand",
            category_id: "Category"
        });

        expect(car.available).toBe(true);
    });

});