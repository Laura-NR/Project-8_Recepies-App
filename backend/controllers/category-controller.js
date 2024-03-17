import mysql from 'mysql2/promise';

export class CategoryController {
    async listAll(req, res) {
        console.log('categoryController should list them all');
        const dbConnection = await this.createDBConnection();
        const [results, fields] = await dbConnection.query('SELECT * FROM categories');
        console.log(results);
        res.json(results); // Send back the query results to the client
    }

    async create(req, res) {
        const { name } = req.body; // Assume categories have only a name for simplicity
        try {
            const dbConnection = await this.createDBConnection();
            const sql = 'INSERT INTO categories (name) VALUES (?)';
            const [results, fields] = await dbConnection.query(sql, [name]);
            res.status(201).json({ message: "Category created successfully" });
        } catch (error) {
            res.status(500).json({ message: 'Error creating category: ' + error.message });
        }
    }

    async createDBConnection() {
        return mysql.createConnection({
            host: 'localhost',
            user: 'root',
            database: 'recipes_app'
        });
    }
}
