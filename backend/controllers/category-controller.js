import mysql from 'mysql2/promise';
import 'dotenv/config';

export class CategoryController {
    async listAll(req, res) {
        console.log('categoryController should list them all');
        const dbConnection = await this.createDBConnection();
        const userId = req.userId;
        const [results, fields] = await dbConnection.query('SELECT * FROM categories WHERE user = ?', [userId]);
        console.log(results);
        res.json(results); // Send back the query results to the client
    }

    async create(req, res) {
        const { name } = req.body; // Assume categories have only a name for simplicity
        const userId = req.userId; // Assuming you have middleware to set this from token
        try {
            const dbConnection = await this.createDBConnection();
            const insertSql = 'INSERT INTO categories (name, user) VALUES (?, ?)';
            await dbConnection.query(insertSql, [name, userId]);

            // Assuming 'name' is unique per user, or add more conditions to uniquely identify the category
            const selectSql = 'SELECT * FROM categories WHERE user = ? AND name = ? ORDER BY id DESC LIMIT 1';
            const [results] = await dbConnection.query(selectSql, [userId, name]);

            if (results.length > 0) {
                const newCategory = results[0];
                res.status(201).json(newCategory); // Return the new category object
            } else {
                res.status(500).json({ message: 'Error retrieving the newly created category.' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error creating category: ' + error.message });
        }
    }


    async createDBConnection() {
        return mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            database: process.env.DB_NAME,
            password: process.env.DB_PASSWORD
        });
    }
}
