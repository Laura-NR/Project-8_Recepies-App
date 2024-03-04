import mysql from 'mysql2/promise';
import { app, upload } from '../app.js';

export class RecipeController {
  
  /*async listAll(req, res) {
    console.log('recipeController should list them all');
    const dbConnection = await this.createDBConnection();
    const [results, fields] = await dbConnection.query('SELECT * FROM recipes');
    res.send(results);
  }*/

  async create(req, res) {
    console.log("Create controller Function:");
    console.log(req.body);
    try {
      const dbConnection = await this.createDBConnection();
      const currentDate = new Date();
      const sql = 'INSERT INTO recipes (title, ingredients, instructions, category, image, date) VALUES (?, ?, ?, ?, ?, ?)';
      const [results, fields] = await dbConnection.query(sql, [req.body.title, req.body.ingredients, req.body.instructions, req.body.category, req.file.path, currentDate]); // Use req.file.path to get the file path
      res.json({ message: "Recipe added to database" });
    } catch (error) {
      console.error('Error adding recipe:', error.message);
      res.status(500).json({ error: 'Error adding recipe' });
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
