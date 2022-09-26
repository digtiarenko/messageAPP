import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import './login.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

export const Login = () => {
   const [error, setError] = useState(null);
   const [loading, setLoading] = useState(false);
   const navigate = useNavigate();

   const handleLogin = async e => {
      e.preventDefault();
      const email = e.target[0].value;
      const password = e.target[1].value;
      try {
         await signInWithEmailAndPassword(auth, email, password);
         navigate('/');
      } catch (err) {
         setError(err);
         setLoading(false);
      }
   };
   return (
      <div className="formContainer">
         <div className="formWrapper">
            <h1 className="logo">React_Chat</h1>
            <h2 className="title">Sign in</h2>
            <form onSubmit={handleLogin} className="form">
               <input type="email" placeholder="email" />
               <input type="text" placeholder="pasword" />
               <button type="submit">GO</button>
               {error && (
                  <span style={{ color: 'red' }}> {error.message} </span>
               )}
            </form>
            <Link to="/register">
               <p> Don't have an account? Register</p>
            </Link>
         </div>
      </div>
   );
};
