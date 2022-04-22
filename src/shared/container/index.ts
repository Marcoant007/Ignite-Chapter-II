import { container } from 'tsyringe';
import UsersRepository from '../../modules/accounts/infra/typeorm/repositories/UsersRepository';
import CategoriesRepository from '../../modules/cars/infra/typeorm/repositories/CategoriesRepository';
import { SpecificationsRepository } from '../../modules/cars/infra/typeorm/repositories/SpecificationsRepository';
import CarsRepository from '../../modules/cars/infra/typeorm/repositories/CarsRepository';
import { ICategoriesRepository } from '../../modules/cars/testing/ICategoriesRepository';
import { ISpecificationsRepository } from '../../modules/cars/testing/ISpecificationsRepository';
import IUsersRepository from '../../modules/accounts/testing/IUsersRepository';
import ICarsRepository from '../../modules/cars/testing/ICarsRepository';


container.registerSingleton<ICategoriesRepository>("CategoriesRepository", CategoriesRepository);
container.registerSingleton<ISpecificationsRepository>("SpecificationRepository", SpecificationsRepository);
container.registerSingleton<IUsersRepository>("UsersRepository", UsersRepository);
container.registerSingleton<ICarsRepository>("CarsRepository",CarsRepository );