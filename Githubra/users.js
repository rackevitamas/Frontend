import express from "express";
import { dbQuery, dbRun } from "../database.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
    try {
        const users = await dbQuery("SELECT * FROM users;");
        res.status(200).json(users);
    } catch (err) {
        next(err);
    }
});

router.get("/:email", async (req, res, next) => {
    try {
        const [user] = await dbQuery("SELECT * FROM users WHERE email = ?;", [req.params.email]);
        if (!user) return res.status(404).json({ message: "User not found" });
        res.status(200).json(user);
    } catch (err) {
        next(err);
    }
});

router.post("/", async (req, res, next) => {
    try {
        const { firstname, lastname, email, class: userClass } = req.body;
        await dbRun(
            "INSERT INTO users (firstname, lastname, email, class) VALUES (?, ?, ?, ?);",
            [firstname, lastname, email, userClass]
        );
        res.status(201).json({ firstname, lastname, email, class: userClass });
    } catch (err) {
        next(err);
    }
});

router.put("/:email", async (req, res, next) => {
    try {
        const [user] = await dbQuery("SELECT * FROM users WHERE email = ?;", [req.params.email]);
        if (!user) return res.status(404).json({ message: "User not found" });

        const updatedFirstname = req.body.firstname || user.firstname;
        const updatedLastname = req.body.lastname || user.lastname;
        const updatedClass = req.body.class || user.class;

        await dbRun(
            "UPDATE users SET firstname = ?, lastname = ?, class = ? WHERE email = ?;",
            [updatedFirstname, updatedLastname, updatedClass, req.params.email]
        );
        res.status(200).json({ email: req.params.email, firstname: updatedFirstname, lastname: updatedLastname, class: updatedClass });
    } catch (err) {
        next(err);
    }
});

router.delete("/:email", async (req, res, next) => {
    try {
        const [user] = await dbQuery("SELECT * FROM users WHERE email = ?;", [req.params.email]);
        if (!user) return res.status(404).json({ message: "User not found" });

        await dbRun("DELETE FROM users WHERE email = ?;", [req.params.email]);
        res.sendStatus(204);
    } catch (err) {
        next(err);
    }
});

export default router;
