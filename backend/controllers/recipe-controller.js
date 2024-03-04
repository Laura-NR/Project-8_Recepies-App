import mysql from 'mysql2/promise';
import multer from 'multer';
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

      // Access form data properly using req.body
      const { title, ingredients, instructions, category } = req.body;

      // Access uploaded file path through req.file
      const imagePath = req.file ? req.file.path : null;

      const [results, fields] = await dbConnection.query(sql, [title, ingredients, instructions, category, imagePath, currentDate]);
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
