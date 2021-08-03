import { ISpecificationsRepository } from "../repositories/ISpecificationsRepository";
import { SpecificationsRepository } from "../repositories/SpecificationsRepository";

interface IRequest {
    name: string;
    description: string;
}

class CreateSpecificationService {
    constructor(private specificationsRepository: ISpecificationsRepository) { }
    execute({ description, name }: IRequest) {

        const specificationAlreadyExists = this.specificationsRepository.findByName(name);

        if (specificationAlreadyExists) {
            throw new Error("Specification already Exists! ");
        }

        this.specificationsRepository.create({
            name,
            description,
        })
    }

}

export default CreateSpecificationService;