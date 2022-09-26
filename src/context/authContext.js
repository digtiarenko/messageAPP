import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();
export const AuthContextProvider = ({ children }) => {
   const [currentUser, setCurrentUser] = useState({});

   useEffect(() => {
      const login = onAuthStateChanged(auth, user => {
         setCurrentUser(user);
         console.log('user', user);
      });

      return () => {
         login();
      };
   }, []);
   return (
      <AuthContext.Provider value={{ currentUser }}>
         {children}
      </AuthContext.Provider>
   );
};
