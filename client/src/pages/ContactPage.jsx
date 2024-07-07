import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGithub,
  faInstagram,
  faLinkedin,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';
import DarkToggler from '../components/DarkToggler';
import Footer from '../components/Footer';

const ContactPage = () => {
  return (
    <div>
      <Navbar />
      <main className="container mx-auto p-4">
        <h1 className="text-4xl font-bold text-center my-8">Contact Me 🤝</h1>
        <p className="text-center mb-8">Connect with me on social media!</p>
        <div className="flex justify-center space-x-8">
          <a
            href="https://github.com/ItsOmiii2005"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-800"
          >
            <FontAwesomeIcon
              icon={faGithub}
              size="2x"
              className="text-gray-800 dark:text-gray-200"
            />
          </a>
          <a
            href="https://www.instagram.com/swami.omanand2005"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-800"
          >
            <FontAwesomeIcon
              icon={faInstagram}
              size="2x"
              className="text-gray-800 dark:text-gray-200"
            />
          </a>
          <a
            href="https://www.linkedin.com/in/omanandswami"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-800"
          >
            <FontAwesomeIcon
              icon={faLinkedin}
              size="2x"
              className="text-gray-800 dark:text-gray-200"
            />
          </a>
          <a
            href="https://www.youtube.com/@omanandswami2005"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-800"
          >
            <FontAwesomeIcon
              icon={faYoutube}
              size="2x"
              className="text-gray-800 dark:text-gray-200"
            />
          </a>
        </div>
      </main>
      <Footer />
    </div>
  );
};

const Navbar = () => (
  <nav className="bg-gray-800 text-white p-4">
    <div className="container mx-auto flex justify-between items-center">
      <div className="text-lg font-bold">
        An Appointment Booking System By Omiii 🧑🏻‍💻
      </div>
      <div className="flex items-center space-x-4">
        <Link to="/" className="hover:underline">
          Home
        </Link>
        <DarkToggler />
      </div>
    </div>
  </nav>
);

export default ContactPage;
