import express from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { ContentModel, userModel } from "./db.js";
import { JWT_Password } from "./config.js";
import { userAuth } from "./middleware.js";
const app = express();
app.use(express.json());
app.post("/api/v1/signup", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    try {
        await userModel.create({
            Username: username,
            Password: password
        });
        res.status(200).send({
            message: "Your Signed Up"
        });
    }
    catch (e) {
        res.status(500).send({
            message: "User already exists"
        });
    }
});
app.post("/api/v1/signin", async (req, res) => {
    const Username = req.body.username;
    const Password = req.body.password;
    const ExistingUser = await userModel.findOne({
        Username,
        Password
    });
    if (ExistingUser) {
        const token = jwt.sign({ id: ExistingUser._id, Password: Password }, JWT_Password);
        res.send({
            message: "Signed In Successfully",
            token: token
        });
    }
    else {
        res.status(404).send({
            message: "Invalid Credentials"
        });
    }
});
app.post("/api/v1/content", userAuth, async (req, res) => {
    const title = req.body.title;
    const link = req.body.link;
    await ContentModel.create({
        title,
        link,
        //@ts-ignore
        UserId: req.userid,
        tag: []
    });
    //@ts-ignore
    console.log(link, title, req.userid);
    res.send({ message: "content added" });
});
app.get("/api/v1/content", userAuth, async (req, res) => {
    //@ts-ignore
    const userid = req.userid;
    const content = await ContentModel.find({
        UserId: userid
    });
    res.json({ content });
});
app.delete("api/v1/content", (req, res) => {
});
app.listen(3000);
//# sourceMappingURL=index.js.map