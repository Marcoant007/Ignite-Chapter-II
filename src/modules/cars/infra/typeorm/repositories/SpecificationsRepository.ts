import { getRepository, Repository } from "typeorm";
import { ICreateSpecificationDTO, ISpecificationsRepository } from "../../../testing/ISpecificationsRepository";
import Specification from "../entities/Specification";


class SpecificationRepositoryInMemory implements ISpecificationsRepository{
    private respository : Repository<Specification>;

    constructor(){
        this.respository = getRepository(Specification);
    }
    findByIds(ids: string[]): Promise<Specification[]> {
        return null;
    }
    
    async create({ description, name }: ICreateSpecificationDTO): Promise<void> {
        const specification = this.respository.create({
            description,
            name
        })
        await this.respository.save(specification)
    }

    async findByName(name: string): Promise<Specification> {
        const specification = this.respository.findOne({name})
        return specification;
    }

}

export {SpecificationRepositoryInMemory as SpecificationsRepository}