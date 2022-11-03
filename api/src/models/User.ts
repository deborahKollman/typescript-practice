//MongoDB

import { Document, model, Schema } from "mongoose";

export interface IUser extends Document{
    name: string,
    lastName: string
}

const userSchema: Schema = new Schema(
    {
        
        name: {
            type: String,
            required: true,
        },

        lastName: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
  )
  
export default model<IUser>("User", userSchema)


//PostgreSQL
// import {Model, Column, Table, CreatedAt, UpdatedAt, PrimaryKey, AutoIncrement} from 'sequelize-typescript';
// @Table
// export class User extends Model<User> {
//     @PrimaryKey
//     @AutoIncrement
//     @Column
//     id!: number;

//     @Column
//     name!: string;

//     @Column
//     lastName!: string;

//     @CreatedAt
//     @Column
//     createdAt!: Date;

//     @UpdatedAt
//     @Column
//     updatedAt!: Date;
// }


