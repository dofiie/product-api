import { users, products } from "../database/memory.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const MEMORY_FILE = path.join(__dirname, "../database/memory.js");

const persistMemory = () => {
    const content = `export const users = ${JSON.stringify(users, null, 2)};\n\nexport const products = ${JSON.stringify(products, null, 2)};\n`;
    fs.writeFileSync(MEMORY_FILE, content, "utf-8");
};


export const register = async (req, res, next) => {
    try {
        const { name, email, password, role } = req.body;

        if (!name || !email || !password) {
            const error = new Error("Name, email and password are required");
            error.status = 400;
            throw error;
        }

        const existingUser = users.find(u => u.email === email);
        if (existingUser) {
            const error = new Error("User already exists");
            error.status = 400;
            throw error;
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const assignedRole = role === "admin" ? "admin" : "user";
        const newUser = {
            id: users.length + 1,
            name,
            email,
            password: hashedPassword,
            role: assignedRole
        };
        users.push(newUser);
        persistMemory();
        const { password: _pw, ...safeUser } = newUser;
        res.status(201).json({ message: "User registered successfully", user: safeUser });
    } catch (err) {
        next(err);
    }
};

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            const error = new Error("Email and password are required");
            error.status = 400;
            throw error;
        }
        const user = users.find(u => u.email === email);
        if (!user) {
            const error = new Error("Invalid credentials");
            error.status = 400;
            throw error;
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            const error = new Error("Invalid credentials");
            error.status = 400;
            throw error;
        }

        const token = jwt.sign(
            { user: { id: user.id, role: user.role } },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );
        res.json({ message: "Login successful", token });
    } catch (err) {
        next(err);
    }
};