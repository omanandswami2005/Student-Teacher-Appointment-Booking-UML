import { Link } from 'react-router-dom';

/**
 * Renders the NotFound component with a 404 message and a link to go home.
 *
 * @return {JSX.Element} The JSX element for the NotFound component.
 */
const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-white animate-bounce">404</h1>
        <p className="text-2xl font-semibold text-white mb-4">Page Not Found</p>
        <p className="text-lg text-white mb-8">
          The page you are looking for does not exist.
        </p>
        <Link
          to="/"
          className="px-6 py-3 text-lg font-semibold text-blue-500 bg-white rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition ease-in-out duration-300"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
