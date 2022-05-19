import { Router } from "express";
import CreateCarController from "../../../../modules/cars/useCases/createCar/CreateCarController";
import { CreateCarSpecificationController } from "../../../../modules/cars/useCases/createCarSpecification/CreateCarSpecificationController";
import { CreateCarSpecificationUseCase } from "../../../../modules/cars/useCases/createCarSpecification/CreateCarSpecificationUseCase";
import { ListAvailableCarsController } from "../../../../modules/cars/useCases/listAvailableCars/ListAvailableCarsController";
import { UploadCarsImageController } from "../../../../modules/cars/useCases/uploadImages/UploadCarsImageController";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import upload from '../../../../config/upload';
import multer from "multer";

const carsRoutes = Router();

const createCarController = new CreateCarController();
const listAvailableCarsUseCase = new ListAvailableCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();
const uploadCarImagesController = new UploadCarsImageController();

const uploadImages = multer(upload.upload("./tmp/cars"));

carsRoutes.post("/", ensureAuthenticated, ensureAdmin, createCarController.handle);
carsRoutes.get("/available", listAvailableCarsUseCase.handle);
carsRoutes.post("/specifications/:id",ensureAuthenticated, ensureAdmin, createCarSpecificationController.handle);
carsRoutes.post("/images/:id" ,ensureAuthenticated, ensureAdmin, uploadImages.array("images"), uploadCarImagesController.handle)


export default carsRoutes;