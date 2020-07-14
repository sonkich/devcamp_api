const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const errorHandler = require('./middleware/error');
const fileUpload = require('express-fileupload');
const path = require('path');

const connectDB = require('./config/db');

const bootcampRouter = require('./routes/bootcamps');
const coursesRouter = require('./routes/courses');

// Load env vars
dotenv.config({ path: './config/config.env' });

// Connect to database
connectDB();

const app = express();

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

// File uploading
app.use(fileUpload());

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1/bootcamps', bootcampRouter);
app.use('/api/v1/courses', coursesRouter);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(
    `App listening on port ${PORT} in ${process.env.NODE_ENV} mode!`.yellow.bold
  );
});

// Handle unhandled rejections
process.on('unhandledRejection', (error, promise) => {
  console.log(`Error: ${error.message}`.red);

  // Close server & exit
  server.close(() => {
    process.exit(1);
  });
});
