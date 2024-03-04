import { app, upload } from '../app.js';
import mysql from 'mysql2/promise';
import { RecipeController } from '../controllers/recipe-controller.js';
import { Router } from 'express';
var router = Router();

const recipeController = new RecipeController();

/* GET notes listing. */
const recipesRouter = (upload) => {
  
  /* router.get('/', function(req, res, next) {
    recipeController.listAll(req, res);
  }); */

  router.post('/', function(req, res) {
    console.log("Create Function:");
    console.log(req.body);
    recipeController.create(req, res);
  });

  /* router.delete('/:id', function(req, res) {
    recipeController.destroy(req, res);
  }); */

  // Handle file upload
  router.post('/upload', upload.single('picture'), (req, res) => {
    // Access uploaded file information through req.file
    console.log("Upload Function:");
    console.log(req.body);
    res.send('File uploaded successfully');
  });
  return router;
}


export default recipesRouter;

