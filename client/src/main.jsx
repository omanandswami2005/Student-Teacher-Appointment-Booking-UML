import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/authContext';

import 'flowbite';
import 'flowbite/dist/flowbite.css';
import { Toaster } from 'react-hot-toast';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <App />
    </AuthProvider>
    <Toaster
      position="top-center"
      toastOptions={{
        duration: 4000,
        style: {
          background: '#888',
          color: '#fff',
          fontWeight: 'bold',
          fontSize: '1.5rem',
          fontFamily: 'times new roman',
        },
      }}
    />
  </BrowserRouter>
);
