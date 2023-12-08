import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryColumn } from "typeorm";
import {v4 as uuidV4} from "uuid";
import Category from "./Category";
import Specification from "./Specification";

@Entity("cars")
class Car {
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    daily_rate: number;

    @Column()
    available : boolean;

    @Column()
    license_plate: string;

    @Column()
    fine_amount: number;

    @ManyToOne(()=> Category)
    @JoinColumn({name: "category_id"})
    category: Category

    @Column()
    brand: string;

    @CreateDateColumn()
    created_at: Date;

    @Column()
    category_id: string;

    @ManyToMany(() => Specification)
    @JoinTable({
        name: "specifications_cars",
        joinColumns: [{name: "car_id"}], //nome da coluna dentro do relacionamento
        inverseJoinColumns: [{name: "specification_id"}] // a outra coluna que referencia a tabela do manytomany
    })
    specifications: Specification[];

    constructor(){
        if(!this.id){
            this.id = uuidV4();
            this.available = true;
        }
    }
}

export default Car