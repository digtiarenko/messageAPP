import { AuthContext } from 'context/authContext';
import { Home } from 'pages/Home/Home';
import { Login } from 'pages/Login/Login';
import { Register } from 'pages/Register/Register';
import { useContext } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './styles/variables.scss';

function App() {
   const { currentUser } = useContext(AuthContext);

   const ProtectedRoute = ({ children }) => {
      if (!currentUser) {
         return <Navigate to="login" />;
      }
      return children;
   };

   return (
      <BrowserRouter>
         <Routes>
            <Route path="/">
               <Route
                  index
                  element={
                     <ProtectedRoute>
                        <Home />
                     </ProtectedRoute>
                  }
               />
               <Route path="register" element={<Register />} />
               <Route path="login" element={<Login />} />
            </Route>
         </Routes>
         <Register />
      </BrowserRouter>
   );
}

export default App;
