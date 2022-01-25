import CarsRepository from "../../infra/typeorm/repositories/CarsRepository";
import CarsRepositoryInMemory from "../../repositories/in-memory/CarsRepositoryInMemory";
import ListCarsUseCase from "./ListCarsUseCase";

let listCarsUseCase: ListCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {

    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        listCarsUseCase = new ListCarsUseCase(carsRepositoryInMemory);
    });

    it("should be able to list all available cars", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Name Car",
            description: "Description Car",
            daily_rate: 100,
            license_plate: "ABC-12345",
            fine_amount: 69, brand: "Brand",
            category_id: "Category"
        });

        const cars = await listCarsUseCase.execute({ brand: "Car_brand",});

        expect(cars).toEqual([car]);
        console.log(cars);
    });

    it("should be able to list all available cars by name", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Name Car2",
            description: "Description Car",
            daily_rate: 100,
            license_plate: "ABC-12345",
            fine_amount: 69, 
            brand: "Car_Brand_Test",
            category_id: "Category"
        });

        const cars = await listCarsUseCase.execute({ brand: "Car_Brand_Test",});
        console.log(cars);
        expect(cars).toEqual([car]);

    })

})