import CarsRepository from "../../infra/typeorm/repositories/CarsRepository";
import CarsRepositoryInMemory from "../../testing/in-memory/CarsRepositoryInMemory";
import ListAvailableCarsUseCase from "./ListAvailableCarsUseCase";

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {

    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory);
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

        const cars = await listAvailableCarsUseCase.execute({ brand: "Car_brand" });
        expect(cars).toEqual([car]);
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

        const cars = await listAvailableCarsUseCase.execute({ brand: "Car_Brand_Test", });
        console.log(cars);
        expect(cars).toEqual([car]);

    })

    it("should be able to list all available cars by brand", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Name Car2",
            description: "Description Car",
            daily_rate: 100,
            license_plate: "ABC-12345",
            fine_amount: 69,
            brand: "Car_Brand_Test",
            category_id: "Category"
        });

        const cars = await listAvailableCarsUseCase.execute({ brand: "Car_Brand_Test", });
        console.log(cars);
        expect(cars).toEqual([car]);

    })

    it("should be able to list all available cars by brand", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car2",
            description: "Description Car",
            daily_rate: 100,
            license_plate: "ABC-12345",
            fine_amount: 69,
            brand: "Car_Brand_Test",
            category_id: "Category"
        });

        const cars = await listAvailableCarsUseCase.execute({ brand: "Car_Brand_Test", });
        console.log(cars);
        expect(cars).toEqual([car]);

    })

    it("should be able to list all available cars by name", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car3",
            description: "Description Car",
            daily_rate: 110.0,
            license_plate: "DEF-12345",
            fine_amount: 40,
            brand: "Car_Brand_Test",
            category_id: "category_id"
        });

        const cars = await listAvailableCarsUseCase.execute({ name: "Car3" });
        console.log(cars);
        expect(cars).toEqual([car]);

    })

    it("should be able to list all available cars by category", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car3",
            description: "Description Car",
            daily_rate: 110.0,
            license_plate: "DEF-12345",
            fine_amount: 40,
            brand: "Car_Brand_Test",
            category_id: "123123213"
        });

        const cars = await listAvailableCarsUseCase.execute({ category_id: "123123213" });
        console.log(cars);
        expect(cars).toEqual([car]);

    })



})