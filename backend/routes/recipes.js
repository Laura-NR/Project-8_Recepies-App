import multer from 'multer';
import { app, upload } from '../app.js';
import mysql from 'mysql2/promise';
import { RecipeController } from '../controllers/recipe-controller.js';
import { Router } from 'express';
var router = Router();

const recipeController = new RecipeController();

/* GET notes listing. */
const recipesRouter = () => {

  /* router.get('/', function(req, res, next) {
    recipeController.listAll(req, res);
  }); */

  /* router.post('/', function(req, res) {
    console.log("Create Function:");
    console.log(req.body);
    recipeController.create(req, res);
  }); */

  /* router.delete('/:id', function(req, res) {
    recipeController.destroy(req, res);
  }); */

  // Handle file upload
  router.post('/', function (req, res) {
    try {
      // Access uploaded file information through req.file
      console.log("Upload Function:");
      console.log(req.file);

      // Access other form fields from req.body
      console.log("Create Function:");
      console.log(req.body);

      console.log(req);

      // Now you have both file and other form field data, you can handle them as needed
      // Call the appropriate controller function to handle the creation of the recipe

      recipeController.create(req, res);
    } catch (error) {
      console.error('Error adding recipe:', error.message);
      res.status(500).json({ error: 'Error adding recipe' });
    }
  });
  return router;
}


export default recipesRouter;

