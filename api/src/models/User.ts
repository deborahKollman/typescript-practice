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
