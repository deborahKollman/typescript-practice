import {Response, Request, NextFunction} from 'express';
import mongoose from 'mongoose';
import User, { IUser } from '../models/User';
import { BAD_REQUEST, NOT_FOUND, OK, CREATED } from './index';

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users : IUser[] = await User.find().sort({createdAt:1})
        res.status(OK).json(users)
    } catch (error) {
        next(error) 
    }
}

export const createUser = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const body = req.body;
        if(!body.name || !body.lastName){
            res.status(BAD_REQUEST).json({message:"'name' body property and 'lastName' body property required"})
        }else{
            const user: IUser = new User({name: body.name, lastName: body.lastName})
            await user.save()
            res.status(CREATED).json({message:"User created",data:user})
        }
    } catch (error) {
        next(error)   
    }
}

export const updateUser = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const id:string = req.params.id;
        if(!mongoose.isValidObjectId(id)){res.status(BAD_REQUEST).json({message:"'id' is not valid"})}
        else if(! await User.findById(id)){res.status(NOT_FOUND).json({message:'User not found'})}
        else{
            const user: IUser = req.body;
            const result=await User.findByIdAndUpdate({ _id: id },user)
            res.status(OK).json({message:"User updated",data:result})
        }
    } catch (error) {
        next(error)
    }
}

export const deleteUser = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const id:string = req.params.id;
        if(!mongoose.isValidObjectId(id)){res.status(BAD_REQUEST).json({message:"'id' is not valid"})}
        else if(! await User.findById(id)){res.status(NOT_FOUND).json({message:'User not found'})}
        else{
            const result = await User.findByIdAndDelete(id)
            res.status(OK).json({message:"User deleted",data:result})
        }
    } catch (error) {
        next(error) 
    }
}