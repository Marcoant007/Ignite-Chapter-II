
import request from "supertest";
import createConnection from "../../../../shared/infra/database";
import { app } from "../../../../shared/infra/http/app";
import { hash } from "bcryptjs";
import {v4 as uuid} from "uuid";
import { Connection } from "typeorm/connection/Connection";

let connection : Connection;
describe("Create Category Controller ", () => {
    beforeAll(async () => {
        connection = await createConnection();
        await connection.runMigrations();
        const id = uuid();
        const password = await hash("admin", 8);

        await connection.query(`
            INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license)
            VALUES ('${id}', 'admin', 'admin@rentx.com.br', '${password}', true, 'now()', 'XXXX-XXXX')
        `);

    });

    afterAll(async () => {
        await connection.dropDatabase();
        await connection.close();
    });
    
    it("should be able to create a new category", async () => {
        const responseToken = await request(app).post("/sessions").send({
            email: "admin@rentx.com.br",
            password: "admin",

        })
        const { token } = responseToken.body;

        console.log(responseToken.body)
        const response = await request(app).post("/categories").send({
            name: "Supertest cars",
            description: "Supertest category"
        }).set({
            Authorization: `Bearer ${token}`,
        });

        expect(response.status).toBe(201);
    });

    it("should not be able to create category with name exists", async () => {
        const responseToken = await request(app).post("/sessions").send({
            email: "admin@rentx.com.br",
            password: "admin",

        })
        const { token } = responseToken.body;

        console.log(responseToken.body)
        const response = await request(app).post("/categories").send({
            name: "Supertest cars",
            description: "Supertest category"
        }).set({
            Authorization: `Bearer ${token}`,
        });

        expect(response.status).toBe(400);
    });
})