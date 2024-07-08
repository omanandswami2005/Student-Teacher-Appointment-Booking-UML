/**
 * Renders the main application to the root element of the DOM.
 * Initializes the BrowserRouter and AuthProvider contexts.
 * Renders the App component wrapped in the Toaster component.
 * Configures the Toaster component with custom options.
 *
 * @return {void}
 */
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/authContext';

import 'flowbite';
import 'flowbite/dist/flowbite.css';
import { Toaster } from 'react-hot-toast';

ReactDOM.createRoot(document.getElementById('root')).render(
  /**
   * Renders the main application inside the BrowserRouter context.
   * Provides authentication-related data and functions through the AuthProvider context.
   *
   * @return {ReactElement} The rendered application.
   */
  <BrowserRouter>
    <AuthProvider>
      <App />
    </AuthProvider>
    <Toaster
      /**
       * Configures the Toaster component with custom options.
       *
       * @prop {string} position - The position of the toasts on the screen.
       * @prop {object} toastOptions - The options for the toasts.
       * @prop {number} toastOptions.duration - The duration of the toasts in milliseconds.
       * @prop {object} toastOptions.style - The style options for the toasts.
       * @prop {string} toastOptions.style.fontWeight - The font weight of the toast text.
       * @prop {string} toastOptions.style.fontSize - The font size of the toast text.
       * @prop {string} toastOptions.style.fontFamily - The font family of the toast text.
       * @return {ReactElement} The rendered Toaster component.
       */
      position="top-center"
      toastOptions={{
        duration: 4000,
        style: {
          fontWeight: 'bold',
          fontSize: '1.5rem',
          fontFamily: 'times new roman',
        },
      }}
    />
  </BrowserRouter>
);
