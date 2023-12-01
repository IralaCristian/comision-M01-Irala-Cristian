import { Schema, model } from "mongoose"
import * as bcrypt from 'bcrypt';

// User Schema config
const UserSchema= new Schema(
    {
        username:{
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        password:{
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        avatarURL: {
            type: String,
            required: true,
            trim: true,
        }
    },
    {
        timestamps: false,
        versionKey: false,
    }
);

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
  
    const hash = await bcrypt.hash(this.password, 10);
  
    this.password = hash;
    next();
  });

export const UserModel = model("User", UserSchema);