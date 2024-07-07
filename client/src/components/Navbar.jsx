import { useState } from 'react';
import PropTypes from 'prop-types';
import DarkToggler from './DarkToggler';
import LogoutButton from './Logout';

const Navbar = ({ title }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <DarkToggler />
        <div className="text-white text-2xl font-bold">{title}</div>

        <div className="hidden md:flex space-x-4">
          {/* Dark mode button */}
          {/* <DarkToggler /> */}

          <LogoutButton />
        </div>

        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-300 hover:text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={!isOpen ? 'M4 6h16M4 12h16m-7 6h7' : 'M6 18L18 6M6 6l12 12'}
              ></path>
            </svg>
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden">
          <a
            href="#about"
            className="block text-gray-300 hover:text-white py-2 px-4"
          >
            <LogoutButton />
          </a>
        </div>
      )}
    </nav>
  );
};
Navbar.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Navbar;
