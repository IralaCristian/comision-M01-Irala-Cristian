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
        auhtor: {
            type: Types.ObjectId,
            ref: 'User',
            require: true,
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
        createdAt: {
            type: Date,
            default: new Date( Date.now())
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
)



//exportamos el modelo
export const PostModel= model('Post', PostSchema);