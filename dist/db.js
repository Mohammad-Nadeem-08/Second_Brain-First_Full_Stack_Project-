import mongoose from "mongoose";
import { model, Schema } from "mongoose";
import { mongodb } from "./config.js";
mongoose.connect(mongodb);
console.log("DataBase is Connected");
const UserSchema = new Schema({
    Username: { type: String, unique: true },
    Password: String
});
export const userModel = model("user", UserSchema);
const ContentSchema = new Schema({
    title: { type: String },
    link: { type: String },
    tag: [{ type: mongoose.Types.ObjectId, ref: "tag" }],
    UserId: { type: mongoose.Types.ObjectId, ref: "user" }
});
const LinkSchema = new Schema({
    hash: String,
    UserId: { type: mongoose.Types.ObjectId, ref: "user", unique: 'true' }
});
export const ContentModel = model("contents", ContentSchema);
export const LinkModel = model("Links", LinkSchema);
//# sourceMappingURL=db.js.map