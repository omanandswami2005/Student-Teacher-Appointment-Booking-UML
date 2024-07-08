/**
 * This is the entry point of the server application.
 * It sets up the application, connects to the database,
 * and starts the server on the specified port.
 *
 * @module index
 */

const app = require('./app');
const connectDB = require('./db');
const asyncHandler = require('./utils/asyncHandler');

const authRoutes = require('./routes/authRoutes');
const protectedRoutes = require('./routes/protectedRoutes');

const errorHandler = require('./middlewares/errorHandler');

const PORT = process.env.PORT || 8000;

/**
 * Connects to the database and starts the server.
 *
 * @return {Promise<void>} A promise that resolves when the server is started.
 */
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

/**
 * Initializes the server application.
 *
 * @return {void}
 */
const init = () => {
  // Sample route to demonstrate error handling
  app.get('/', (req, res) => {
    res.send('Hello, World!');
  });

  // Public routes
  app.use('/api/auth', authRoutes);

  // Protected routes
  app.use('/api', protectedRoutes);

  // Middleware to handle errors
  app.use(errorHandler);

  // Start the server
  startServer();
};

// Initialize the server
init();

