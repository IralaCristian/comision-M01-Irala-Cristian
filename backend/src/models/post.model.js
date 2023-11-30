import { Schema, Types, model } from "mongoose";


//configuramos el Schema para Post
const PostSchema= new Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            maxLength: 100,
            minLength: 3,
        },
        description: {
            type: String,
            required: true,
            trim: true,
        },
        author: {
            type: Types.ObjectId,
            ref: 'User',
            required: true,
        },
        comments: [
            {
                type: Types.ObjectId,
                ref: 'Comment',
            }
        ],
        imageURL: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
)



//exportamos el modelo
export const PostModel= model('Post', PostSchema);