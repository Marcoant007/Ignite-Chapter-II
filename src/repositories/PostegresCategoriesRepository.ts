import Category from "../model/Category";
import { ICategoriesRepository, ICreateCategoryDTO } from "./ICategoriesRepository";

class PostegresCategoriesRepository implements ICategoriesRepository{
    findByName(name: string): Category {
        console.log(name)
        return null
    }
    list(): Category[] {
        return null
    }
    create({description,name}:ICreateCategoryDTO): void {
        console.log(name, description);
        return null
    }

}

export default PostegresCategoriesRepository