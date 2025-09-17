import express from "express";
import jwt from "jsonwebtoken";
import { ContentModel, LinkModel, userModel } from "./db.js";
import { JWT_Password } from "./config.js";
import { userAuth } from "./middleware.js";
import { random } from "./utils.js";
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
app.delete("/api/v1/content/:contentid", userAuth, async (req, res) => {
    //@ts-ignore
    try {
        const contentid = req.params.contentid;
        console.log(contentid);
        if (contentid) {
            const result = await ContentModel.deleteOne({
                //@ts-ignore
                UserId: req.userid,
                _id: contentid
            });
            if (result.deletedCount === 0) {
                return res.status(404).send({ message: "No content found to delete" });
            }
            res.send({
                message: "Deleted Successfully"
            });
            return;
        }
    }
    catch (err) {
        res.send({
            message: ' server error occured',
            error: err
        });
    }
});
app.post("/api/v1/brain/share", userAuth, async (req, res) => {
    const share = req.body.share;
    const hash = random(10);
    if (share) {
        const ExistingUser = await LinkModel.findOne({
            //@ts-ignore
            UserId: req.userid
        });
        if (ExistingUser) {
            ExistingUser.hash = hash;
            await ExistingUser.save();
            res.send({
                message: "Successfully created the Sharable Link",
                hash: "www.Second_Brain/api/v1/brain/" + hash
            });
            return;
        }
        await LinkModel.create({
            hash,
            //@ts-ignore
            UserId: req.userid
        });
        res.send({
            message: "Successfully created the Sharable Link",
            hash: "www.Second_Brain/api/v1/brain/" + hash
        });
    }
    else {
        await LinkModel.deleteOne({
            //@ts-ignore
            UserId: req.userid
        });
        res.send({
            message: "Sharable Link cannot b created since u have given false"
        });
    }
});
app.listen(3000);
//# sourceMappingURL=index.js.map