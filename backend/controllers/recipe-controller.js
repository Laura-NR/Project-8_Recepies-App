import mysql from 'mysql2/promise';
import multer from 'multer';
import { app, upload } from '../app.js';

export class RecipeController {

  async listAll(req, res) {
    console.log('recipeController should list them all');
    const dbConnection = await this.createDBConnection();
    const [results, fields] = await dbConnection.query('SELECT * FROM recipes');
    // Transform each recipe to adjust the image path
    const resultsWithWebAccessiblePaths = results.map(recipe => ({
        ...recipe,
        // Assuming 'image' contains the filesystem path, replace it with a relative web path
        // This assumes your images are served from /assets and stored with filenames in the DB
        image: recipe.image ? recipe.image.replace(/^.*[\\\/]/, '/assets/') : null
    }));

    console.log(resultsWithWebAccessiblePaths);
    res.json(resultsWithWebAccessiblePaths);
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
      const imagePath = req.file ? `/assets/${req.file.filename}` : null;
      console.log('Image Path: ', imagePath);

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
    // Destructure fields from req.body
    const { title, ingredients, instructions, link } = req.body;
    
    // Check for an uploaded file
    const imagePath = req.file ? `/assets/${req.file.filename}` : undefined;

    const dbConnection = await this.createDBConnection();
    try {
        // Construct your SQL query to conditionally include the image path if a new image was uploaded
        let query = 'UPDATE recipes SET title = ?, ingredients = ?, instructions = ?, link = ?';
        const queryParams = [title, ingredients, instructions, link];

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
      host: 'localhost',
      user: 'root',
      database: 'recipes_app'
    });
  }
}
