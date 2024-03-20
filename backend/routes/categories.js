import express from 'express';
import { CategoryController } from '../controllers/category-controller.js';
import verifyToken from '../middleware/auth-middleware.js';

const router = express.Router(); // Corrected this line
const categoryController = new CategoryController();

const categoriesRouter = () => {
    // List all categories
    router.get('/', verifyToken, function (req, res, next) {
        categoryController.listAll(req, res);
    }); 

    // Create a new category
    router.post('/', verifyToken, function (req, res) {
        categoryController.create(req, res);
    });

    // Update a category
    //router.put('/:id', CategoryController.update);

    // Delete a category
    //router.delete('/:id', CategoryController.destroy);

    return router;
}

export default categoriesRouter;

