import { inject, injectable } from 'tsyringe';
import { ICarsImageRepository } from '../../testing/ICarsImagesRepository';
interface IRequest {
    car_id: string;
    images_name: string[];
}

@injectable()
class UploadCarImagesUseCase {
    
    constructor(
        @inject("CarsImagesRepository")
        private carsImageRepository : ICarsImageRepository
    ){}

    async execute({car_id,images_name}:IRequest): Promise<void> {
        images_name.map(async (image) => {
            await this.carsImageRepository.created(car_id, image)
        })
    }

}

export {UploadCarImagesUseCase}