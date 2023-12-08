import { container } from "tsyringe"
import { DevolutionRentalUseCase } from "./DevolutionRentalUseCase";
import { Request, Response } from "express";

class DevolutionRentalController {

    async handle(request: Request, response: Response) {
        const { id } = request.params;
        const devolutionRentalUseCase = container.resolve(DevolutionRentalUseCase);
        const rental = await devolutionRentalUseCase.execute({ id });

        return response.status(200).json(rental)
    }
}

export { DevolutionRentalController }
