import { container } from 'tsyringe';

import "../container/providers/indexProviders";

import UsersRepository from '../../modules/accounts/infra/typeorm/repositories/UsersRepository';
import CategoriesRepository from '../../modules/cars/infra/typeorm/repositories/CategoriesRepository';
import { SpecificationsRepository } from '../../modules/cars/infra/typeorm/repositories/SpecificationsRepository';
import CarsRepository from '../../modules/cars/infra/typeorm/repositories/CarsRepository';
import { ICategoriesRepository } from '../../modules/cars/testing/ICategoriesRepository';
import { ISpecificationsRepository } from '../../modules/cars/testing/ISpecificationsRepository';
import IUsersRepository from '../../modules/accounts/testing/IUsersRepository';
import ICarsRepository from '../../modules/cars/testing/ICarsRepository';
import { ICarsImageRepository } from '../../modules/cars/testing/ICarsImagesRepository';
import { CarsImagesRepository } from '../../modules/cars/infra/typeorm/repositories/CarsImageRepository';
import { IRentalsRepository } from '../../modules/rentals/testing/IRentalsRepository';
import { RentalsRepository } from '../../modules/rentals/infra/typeorm/repositories/RentalsRepository';


container.registerSingleton<ICategoriesRepository>("CategoriesRepository", CategoriesRepository);
container.registerSingleton<ISpecificationsRepository>("SpecificationRepository", SpecificationsRepository);
container.registerSingleton<IUsersRepository>("UsersRepository", UsersRepository);
container.registerSingleton<ICarsRepository>("CarsRepository",CarsRepository );
container.registerSingleton<ICarsImageRepository>("CarsImagesRepository", CarsImagesRepository);
container.registerSingleton<IRentalsRepository>("RentalsRepository", RentalsRepository);