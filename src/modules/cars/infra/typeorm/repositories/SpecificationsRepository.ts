import { getRepository, Repository } from "typeorm";
import { ICreateSpecificationDTO, ISpecificationsRepository } from "../../../testing/ISpecificationsRepository";
import Specification from "../entities/Specification";


class SpecificationRepositoryInMemory implements ISpecificationsRepository{
    private respository : Repository<Specification>;

    constructor(){
        this.respository = getRepository(Specification);
    }
    async findByIds(ids: string[]): Promise<Specification[]> {
        const specifications = await this.respository.findByIds(ids);
        return specifications
    }
    
    async create({ description, name }: ICreateSpecificationDTO): Promise<Specification> {
        const specification = this.respository.create({
            description,
            name
        })
        await this.respository.save(specification)
        return specification;
    }

    async findByName(name: string): Promise<Specification> {
        const specification = this.respository.findOne({name})
        return specification;
    }

}

export {SpecificationRepositoryInMemory as SpecificationsRepository}