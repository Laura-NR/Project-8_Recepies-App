import mysql from 'mysql2/promise';
import 'dotenv/config';

export class CategoryController {
    async listAll(req, res) {
        console.log('categoryController should list them all');
        const dbConnection = await this.createDBConnection();
        const userId = req.userId;
        const [results, fields] = await dbConnection.query('SELECT * FROM categories WHERE user = ?', [userId]);
        console.log(results);
        res.json(results); // Send back query results to client
    }

    async create(req, res) {
        const { name } = req.body; 
        const userId = req.userId; 
        try {
            const dbConnection = await this.createDBConnection();
            const insertSql = 'INSERT INTO categories (name, user) VALUES (?, ?)';
            await dbConnection.query(insertSql, [name, userId]);

            
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

    async update(req, res) {
        const { id } = req.params; 
        const { name } = req.body; 
        const userId = req.userId; 
    
        try {
            const dbConnection = await this.createDBConnection();
            const updateSql = 'UPDATE categories SET name = ? WHERE id = ? AND user = ?';
            await dbConnection.query(updateSql, [name, id, userId]);
    
            // Fetch updated category to return it
            const selectSql = 'SELECT * FROM categories WHERE id = ? AND user = ?';
            const [results] = await dbConnection.query(selectSql, [id, userId]);
    
            if (results.length > 0) {
                res.json(results[0]);
            } else {
                res.status(404).json({ message: 'Category not found or you do not have permission to edit it.' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error updating category: ' + error.message });
        }
    }
    
    async delete(req, res) {
        const { id } = req.params; // Category ID from URL
        const userId = req.userId; // User ID from token
    
        try {
            const dbConnection = await this.createDBConnection();
            const deleteSql = 'DELETE FROM categories WHERE id = ? AND user = ?';
            await dbConnection.query(deleteSql, [id, userId]);
            
            res.json({ message: 'Category deleted successfully.' });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting category: ' + error.message });
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
