import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import mysql from 'mysql2/promise';
import 'dotenv/config';

export class UserController {
    // Establish DB connection
    async createDBConnection() {
        return mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            database: process.env.DB_NAME,
            password: process.env.DB_PASSWORD
        });
    }

    // User registration
    async register(req, res) {
        const { name, password } = req.body;
        if (!name || !password) {
            return res.status(400).json({ message: "Name and password are required" });
        }
        try {
            const db = await this.createDBConnection();
            const hashedPassword = await bcrypt.hash(password, 10);

            const [result] = await db.execute(
                'INSERT INTO users (name, password) VALUES (?, ?)',
                [name, hashedPassword]
            );

            res.status(201).json({ message: "User successfully registered" });
        } catch (error) {
            console.error('Registration error:', error.message);
            res.status(500).json({ message: 'Error registering user' });
        }
    }

    // User login
    async login(req, res) {
        const { name, password } = req.body;
        if (!name || !password) {
            return res.status(400).json({ message: "Name and password are required" });
        }
        try {
            const db = await this.createDBConnection();
            const [users] = await db.execute('SELECT * FROM users WHERE name = ?', [name]);

            if (users.length > 0) {
                const user = users[0];
                if (await bcrypt.compare(password, user.password)) {
                    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '24h' });
                    res.json({ token });
                } else {
                    res.status(401).json({ message: 'Incorrect password' });
                }
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        } catch (error) {
            console.error('Login error:', error.message);
            res.status(500).json({ message: 'Error logging in' });
        }
    }
}


