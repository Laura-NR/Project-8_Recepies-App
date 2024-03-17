import multer from 'multer';
import { app, upload } from '../app.js';
import mysql from 'mysql2/promise';
import { RecipeController } from '../controllers/recipe-controller.js';
import { Router } from 'express';
var router = Router();

const recipeController = new RecipeController();

/* GET notes listing. */
const recipesRouter = () => {

  router.get('/', function(req, res, next) {
    console.log('Get request');
    recipeController.listAll(req, res);
  });

  router.post('/', upload.single('picture'), function(req, res) {
    console.log("Received POST request to /recipes");
    console.log("Create Function:");
    console.log(req.body);
    recipeController.create(req, res);
  });

  /* router.delete('/:id', function(req, res) {
    recipeController.destroy(req, res);
  }); */

  // Handle file upload
 /*  router.post('/', recipeController.create);*/
  return router; 
}


export default recipesRouter;

