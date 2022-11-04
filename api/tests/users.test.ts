import mongoose from 'mongoose';
import supertest from 'supertest';
import app from '../src/app';
import config from '../lib/config';

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
            expect(res.statusCode).toBe(200);
        })
    })
})