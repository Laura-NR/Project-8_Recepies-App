import multer from 'multer';
import { app, upload } from '../app.js';
import mysql from 'mysql2/promise';
import { RecipeController } from '../controllers/recipe-controller.js';
import { Router } from 'express';
import verifyToken from '../middleware/auth-middleware.js';
var router = Router();

const recipeController = new RecipeController();

/* GET notes listing. */
const recipesRouter = () => {

  router.get('/', verifyToken, function(req, res, next) {
    console.log('Get request');
    recipeController.listAll(req, res);
  });

  router.post('/', verifyToken, upload.single('picture'), function(req, res) {
    console.log("Received POST request to /recipes");
    console.log("Create Function:");
    console.log(req.body);
    recipeController.create(req, res);
  });

  router.put('/:id', verifyToken, upload.single('picture'), (req, res) => {
    recipeController.update(req, res);
  });  

  router.delete('/:id', verifyToken, function(req, res) {
    recipeController.destroy(req, res);
  });

  return router; 
}


export default recipesRouter;

