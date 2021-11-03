import fs from 'fs';
import csvParse from "csv-parse";
import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';

interface IImportCategory {
    name: string;
    description: string;
}

class ImportCategoryUseCase {

    constructor(private categoriesRepository: ICategoriesRepository) { }

    loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
        return new Promise((resolve, reject) => {
            const stream = fs.createReadStream(file.path);//file.path é o caminho do arquivo 
            const categories: IImportCategory[] = [];
            const parseFile = csvParse()//delimitador é a virgula

            stream.pipe(parseFile)//a função pipe vai ler linha por linha e pega oq foi lido e joga para outra lugar
            parseFile.on("data", async (line) => {
                const [name, description] = line;
                categories.push({
                    name,
                    description
                });
            })
                .on("end", () => {
                    fs.promises.unlink(file.path)//remove arquivo
                    resolve(categories);
                })
                .on("error", (err) => {
                    reject(err);
                });
        });

    }

    async execute(file: Express.Multer.File): Promise<void> {
        const categories = await this.loadCategories(file);
        categories.map(async (category) => {
            const { name, description } = category;
            const existCategory = this.categoriesRepository.findByName(name);
            if (!existCategory) {
                this.categoriesRepository.create({
                    name, description
                });
            }
        })
    }
}

export { ImportCategoryUseCase }