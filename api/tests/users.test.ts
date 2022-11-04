import mongoose from 'mongoose';
import User from '../src/models/User';
import supertest from 'supertest';
import app from '../src/app';
import config from '../lib/config';
import { BAD_REQUEST, NOT_FOUND, OK, CREATED } from '../src/controllers/index';

/* Connecting to the database before each test. */
beforeEach(async () => {
    await mongoose.connect(`mongodb+srv://deboKollman:${config.mongo_password}@cluster0.o636h0f.mongodb.net/${config.mongo_db}?retryWrites=true&w=majority`);
  });
  
/* Closing database connection after each test. */
afterEach(async () => {
await mongoose.connection.close();
});


describe("API TESTING",()=>{
    let request: supertest.SuperTest<supertest.Test>
    beforeAll(() => {
        request = supertest(app)
    })
    describe("GET /user ",()=>{
        it("should return all users",async()=>{
            const res = await request.get("/user");
            expect(res.statusCode).toBe(OK);
        })
    })
    describe("POST /user",()=>{
        it("should create user if name and last name are sent",async()=>{
            const res = await request.post("/user").send({name:"Juliana",lastName:"Gutierrez"})
            expect(res.statusCode).toBe(CREATED)
            const response=await User.findOne({name:"Juliana",lastName:"Gutierrez"})
            expect(response).not.toBe(null)
        })
        it("should not create user if name or last name is not sent",async()=>{
            let res= await request.post("/user").send({name:"Juliana"});
            expect(res.statusCode).toBe(BAD_REQUEST)
            res = await request.post("/user").send({lastName:"Gutierrez"});
            expect(res.statusCode).toBe(BAD_REQUEST)
        })
    })
})