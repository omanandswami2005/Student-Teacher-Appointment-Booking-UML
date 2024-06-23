const app = require('./app');
const connectDB = require('./db');
const asyncHandler = require('./utils/asyncHandler');
const errorHandler = require('./middlewares/errorHandler');

const PORT = process.env.PORT || 8000;
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Database connection error:', error);
    process.exit(1);
  });

// Sample route to demonstrate error handling
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Sample route that triggers an error
app.get('/error', (req, res, next) => {
  const error = new Error('This is a deliberate error.');
  error.status = 400;
  next(error);
});

// Sample route without asyncHandler (requires try-catch block)
app.get('/without-async-handler', async (req, res, next) => {
  try {
    // Simulate an asynchronous operation that throws an error
    await new Promise((_, reject) => reject(new Error('Something went wrong')));
    res.send('This will not be reached');
  } catch (error) {
    next(error);
  }
});

// Sample route with asyncHandler (no try-catch block needed)
app.get(
  '/with-async-handler',
  asyncHandler(async (req, res) => {
    // Simulate an asynchronous operation that throws an error
    await new Promise((_, reject) => reject(new Error('Something went wrong')));

    res.send('This will not be reached');
  })
);

// Middleware to handle errors
app.use(errorHandler);
