import { inject, injectable } from "tsyringe";
import { IRentalsRepository } from "../../testing/IRentalsRepository";
import { Rental } from "../../infra/typeorm/entities/Rentals";

@injectable()
class ListRentalsByUserUseCase {
    constructor(
        @inject("RentalsRepository") private rentalsRepository: IRentalsRepository
    ){}

    async execute(user_id: string): Promise<Rental[]> {
        const rentalsByUser = await this.rentalsRepository.findByUserId(user_id);
        return rentalsByUser;
    }
}

export { ListRentalsByUserUseCase };