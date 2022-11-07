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
afterAll(async () => {
    await mongoose.connection.close();
});

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
        const response=await User.findById(res.body.data._id)
        expect(response).not.toBe(null)
    })
    it("should not create user if name or last name is not sent",async()=>{
        let res= await request.post("/user").send({name:"Juliana"});
        expect(res.statusCode).toBe(BAD_REQUEST)
        res = await request.post("/user").send({lastName:"Gutierrez"});
        expect(res.statusCode).toBe(BAD_REQUEST)
    })
})
describe("PUT /user ",()=>{
    it("should NOT update user if id is invalid",async()=>{
        const res = await request.put("/user/1234");
        expect(res.statusCode).toBe(BAD_REQUEST);
    })
    it("should NOT update user if user does not exist",async()=>{
        const user = new User({name:"Juliana",lastName:"Gutierrez"})
        await user.save();
        await User.findByIdAndDelete(user._id)
        const res = await request.put(`/user/${user._id}`);
        expect(res.statusCode).toBe(NOT_FOUND);
    })
    it("should update user if valid id is sent",async () => {
        const user = new User({name:"Juliana",lastName:"Gutierrez"})
        await user.save();
        const res = await request.put(`/user/${user._id}`).send({name:"Julia",lastName:"Gomez"});
        expect(res.statusCode).toBe(OK);
        const updatedUser = await User.findById(user._id,'name lastName')
        expect(updatedUser?.name).toBe("Julia")
        expect(updatedUser?.lastName).toBe("Gomez")        
    })
})
describe("DELETE /user",()=>{
    it("should NOT delete user if id is invalid",async()=>{
        const res = await request.delete("/user/1234");
        expect(res.statusCode).toBe(BAD_REQUEST);
    })
    it("should NOT delete user if user does not exist",async()=>{
        const user = new User({name:"Juliana",lastName:"Gutierrez"})
        await user.save();
        await User.findByIdAndDelete(user._id)
        const res = await request.delete(`/user/${user._id}`);
        expect(res.statusCode).toBe(NOT_FOUND);
    })
    it("should delete user if valid id is sent",async()=>{
        const user = new User({name:"Juliana",lastName:"Gutierrez"})
        await user.save();
        const res = await request.delete(`/user/${user._id}`);
        expect(res.statusCode).toBe(OK);
    })
})