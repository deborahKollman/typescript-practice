import {Response, Request, NextFunction} from 'express';
import mongoose from 'mongoose';
import User, { IUser } from '../models/User';
import { BAD_REQUEST, NOT_FOUND, OK, CREATED } from './index';

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users : IUser[] = await User.find()
        res.status(OK).json(users)
    } catch (error) {
        next(error) 
    }
}

export const createUser = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const body = req.body;
        if(!body.name || !body.lastName){
            res.status(BAD_REQUEST).send("'name' body property and 'lastName' body property required")
        }else{
            const user: IUser = new User({name: body.name, lastName: body.lastName})
            await user.save()
            res.status(CREATED).send('User created')
        }
    } catch (error) {
        next(error)   
    }
}

export const updateUser = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const id:string = req.params.id;
        if(!mongoose.isValidObjectId(id)){res.status(BAD_REQUEST).send("'id' is not valid")}
        else if(! await User.findById(id)){res.status(NOT_FOUND).send('User not found')}
        else{
            const user: IUser = req.body;
            await User.findByIdAndUpdate({ _id: id },user)
            res.status(OK).send('User updated')
        }
    } catch (error) {
        next(error)
    }
}

export const deleteUser = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const id:string = req.params.id;
        if(!mongoose.isValidObjectId(id)){res.status(BAD_REQUEST).send("'id' is not valid")}
        else if(! await User.findById(id)){res.status(NOT_FOUND).send('User not found')}
        else{
            await User.findByIdAndDelete(id)
            res.status(OK).send('User deleted')
        }
    } catch (error) {
        next(error) 
    }
}