import React from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css';
import App from './App';

// Contexts
import { FrustationsContextProvider } from './context/FrustationsContext';
import { UsersContextProvider } from './context/UsersContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UsersContextProvider>
      <FrustationsContextProvider>
          <App />
      </FrustationsContextProvider>
    </UsersContextProvider>
  </React.StrictMode>
);

