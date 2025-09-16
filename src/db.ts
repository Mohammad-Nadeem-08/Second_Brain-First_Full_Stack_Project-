import mongoose from "mongoose";
import {model,Schema} from "mongoose";
mongoose.connect("mongodb+srv://mohammadnadeem0807:Q5I0z6FrBiqCI0pI@cluster0.8ow6rnd.mongodb.net/");
console.log("DataBase is Connected");
const UserSchema = new Schema({
    Username:{type:String,unique:true},
    Password:String
})

export const userModel = model("user",UserSchema)


const ContentSchema = new Schema({
    title:{type:String},
    link:{type:String},
    tag:[{type:mongoose.Types.ObjectId,ref:"tag"}],
    UserId:{type:mongoose.Types.ObjectId,ref:"user"}
})

export const ContentModel = model("contents",ContentSchema)