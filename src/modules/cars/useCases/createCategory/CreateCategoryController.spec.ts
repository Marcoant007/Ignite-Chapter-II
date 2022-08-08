
import { Connection } from 'typeorm';
import request from "supertest";
import createConnection from "../../../../shared/infra/database";
import { app } from "../../../../shared/infra/http/app";
import { hash } from "bcryptjs";
import {v4 as uuid} from "uuid";

let connection : Connection;
describe("Create Category Controller ", async()=> {
   

    beforeEach(async () => {
        connection = await createConnection();
        const id = uuid();
        const password = await hash("admin", 8);

        await connection.query(`
            INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license)
            VALUES ('${id}', 'admin', 'admin@rentx.com.br', '${password}', true, 'now()', 'XXXX-XXXX')
        `);

    })
    
    it("should be able to create a new category", async ()=> {
        const responseToken = await request(app).post("/sessions").send({
            email: "admin@rentx.com.br",
            password: "admin",

        })
        console.log(responseToken.body)
        const response = await request(app).post("/categories").send({
            name: "Supertest cars",
            description: "Supertest category"
        });

        expect(response.status).toBe(201);
    })
})