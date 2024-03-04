import express, { json, urlencoded } from 'express';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import bodyParser from 'body-parser';

// importation du code des sous routeurs
import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';
import recipesRouter from './routes/recipes.js';

// Create Express app
const app = express();

// Set up body-parser middleware with increased payload size limit
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

// Set up CORS
app.use(cors());

// Set up multer storage for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '..', 'frontend', 'src', 'assets'));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});
const upload = multer({ storage: storage });

// Define routes
app.use('/recipes', recipesRouter(upload));
app.use('/users', usersRouter);
app.use('/', (req, res) => res.send('la bienvenue!'));

// Error handling
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export { app, upload };
