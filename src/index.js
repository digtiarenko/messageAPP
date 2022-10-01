import { AuthContextProvider } from 'context/authContext';
import { ChatContextProvider } from 'context/chatContext';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   <React.StrictMode>
      <AuthContextProvider>
         <ChatContextProvider>
            <App />
         </ChatContextProvider>
      </AuthContextProvider>
   </React.StrictMode>,
);
