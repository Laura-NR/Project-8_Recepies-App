import mysql from 'mysql2/promise';
import multer from 'multer';
import { app, upload } from '../app.js';
import 'dotenv/config';

export class RecipeController {
  
  async listAll(req, res) {
    console.log('recipeController should list them all');
    const dbConnection = await this.createDBConnection();
    const userId = req.userId;
  
    //Extract the category filter from query parameters
    const categoryId = req.query.category;
  
    // Modify the SQL query to conditionally include a category filter
    let sqlQuery = `
      SELECT recipes.*, categories.name AS categoryName
      FROM recipes
      LEFT JOIN categories ON recipes.category = categories.id
      WHERE recipes.user = ?
    `;
  
    // Array to hold parameters for the SQL query
    let queryParams = [userId];
  
    // If a category filter is provided, append to SQL query
    if (categoryId) {
      sqlQuery += " AND recipes.category = ?";
      queryParams.push(categoryId); // Add category ID to query parameters
    }
  
    try {
      const [results, fields] = await dbConnection.query(sqlQuery, queryParams);
  
      // Transform recipes to adjust image path
      const resultsWithWebAccessiblePaths = results.map(recipe => ({
        ...recipe,
        image: recipe.image ? recipe.image.replace(/^.*[\\\/]/, '/assets/') : null
      }));
  
      console.log(resultsWithWebAccessiblePaths);
      res.json(resultsWithWebAccessiblePaths);
    } catch (error) {
      console.error('Error fetching recipes:', error);
      res.status(500).json('Error fetching recipes: ' + error.message);
    }
  }
  

  async create(req, res) {
    console.log("Create controller Function:");
    console.log(req.body);
    try {
      const dbConnection = await this.createDBConnection();
      const currentDate = new Date();
      const sql = 'INSERT INTO recipes (title, ingredients, instructions, image, date, link, category, user) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';

      // Access form data using req.body
      const { title, ingredients, instructions, link, category } = req.body;
      const userId = req.userId;
      // Access uploaded file path through req.file
      const imagePath = req.file ? `/assets/${req.file.filename}` : null;
      console.log('Image Path: ', imagePath);

      const [results, fields] = await dbConnection.query(sql, [title, ingredients, instructions, imagePath, currentDate, link, category, userId]);
      res.status(200).json({
        status: 'success',
        message: 'Recipe added to database',
        recipe: {
          title: title,
          ingredients: ingredients,
          instructions: instructions,
          image: imagePath,
          date: currentDate,
          link: link,
          category: category
        }
      });
    } catch (error) {
      console.error('Error adding recipe:', error.message);
      res.status(500).json( 'Error adding recipe: ' + error.message);
    }
  }

  async destroy(req, res) {
    const dbConnection = await this.createDBConnection();
    try {
        const [results, fields] = await dbConnection.query('DELETE FROM recipes WHERE id = ?', [req.params.id]);
        console.log(req.params.id);
        if (results.affectedRows > 0) {
            res.status(200).json({ message: "Recipe deleted successfully" });
        } else {
            res.status(404).json({ message: "Recipe not found" });
        }
    } catch (error) {
        console.error('Error deleting recipe:', error.message);
        res.status(500).json({ message: 'Error deleting recipe: ' + error.message });
    }
  }

  async update(req, res) {
    const { id } = req.params;
    
    const { title, ingredients, instructions, link, category } = req.body;
    
    // Check for an uploaded file
    const imagePath = req.file ? `/assets/${req.file.filename}` : undefined;

    const dbConnection = await this.createDBConnection();
    try {
        // Conditionally include the image path if a new image was uploaded
        let query = 'UPDATE recipes SET title = ?, ingredients = ?, instructions = ?, link = ?, category = ?';
        const queryParams = [title, ingredients, instructions, link, category];

        if (imagePath) {
            query += ', image = ?';
            queryParams.push(imagePath);
        }

        query += ' WHERE id = ?';
        queryParams.push(id);

        const [results] = await dbConnection.query(query, queryParams);
        if (results.affectedRows > 0) {
            res.status(200).json({ message: "Recipe updated successfully" });
        } else {
            res.status(404).json({ message: "Recipe not found" });
        }
    } catch (error) {
        console.error('Error updating recipe:', error.message);
        res.status(500).json({ message: 'Error updating recipe: ' + error.message });
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
