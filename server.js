const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');

const bootcampRouter = require('./routes/bootcamps');

// Load env vars
dotenv.config({ path: './config/config.env' });

const app = express();

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/v1/bootcamps', bootcampRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT} in ${process.env.NODE_ENV} mode!`);
});
