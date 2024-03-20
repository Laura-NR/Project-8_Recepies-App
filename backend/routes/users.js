import { Router } from 'express';
import { UserController } from '../controllers/user-controller.js';
var router = Router();

const userController = new UserController();

const usersRouter = () => {
  /* GET users listing. */
  router.get('/', function(req, res, next) {
    res.send('respond with a resource');
  });

  // Register route
  router.post('/register', function(req, res, next) {
    userController.register(req, res, next);
  });

  // Login route
  router.post('/login', userController.login.bind(userController));


  return router;
}


export default usersRouter;
