import { Schema, Types, model} from "mongoose"

// Configuración de CommentSchema
const CommentSchema = new Schema(
    {
        //Referencia al author
        author: {
            type: Types.ObjectId,
            ref: 'User',
            required: true,
        },
        description: {
            type: String,
            required: true,
            trim: true,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
)


//exportamos el modelo
export const CommentModel= model('Comment', CommentSchema);