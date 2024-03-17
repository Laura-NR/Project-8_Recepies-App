import mysql from 'mysql2/promise';
import multer from 'multer';
import { app, upload } from '../app.js';

export class RecipeController {

  async listAll(req, res) {
    console.log('recipeController should list them all');
    const dbConnection = await this.createDBConnection();
    const [results, fields] = await dbConnection.query('SELECT id, title, ingredients, instructions FROM recipes');
    console.log(results);
    res.json(results);
  }

  async create(req, res) {
    console.log("Create controller Function:");
    console.log(req.body);
    try {
      const dbConnection = await this.createDBConnection();
      const currentDate = new Date();
      const sql = 'INSERT INTO recipes (title, ingredients, instructions, image, date, link) VALUES (?, ?, ?, ?, ?, ?)';

      // Access form data properly using req.body
      const { title, ingredients, instructions, link } = req.body;

      // Access uploaded file path through req.file
      const imagePath = req.file ? req.file.path : null;

      const [results, fields] = await dbConnection.query(sql, [title, ingredients, instructions, imagePath, currentDate, link]);
      res.status(200).json({
        status: 'success',
        message: 'Recipe added to database',
        recipe: {
          title: title,
          ingredients: ingredients,
          instructions: instructions,
          image: imagePath,
          date: currentDate,
          link: link
        }
      });
    } catch (error) {
      console.error('Error adding recipe:', error.message);
      res.status(500).json( 'Error adding recipe: ' + error.message);
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
