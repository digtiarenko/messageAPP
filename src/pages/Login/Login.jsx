import React from 'react';
import './login.scss';

export const Login = () => {
   return (
      <div className="formContainer">
         <div className="formWrapper">
            <h1 className="logo">React_Chat</h1>
            <h2 className="title">Sign up</h2>
            <form className="form">
               <input type="email" placeholder="email" />
               <input type="text" placeholder="pasword" />
               <button type="submit">GO</button>
            </form>
            <p> Already have an account? Login</p>
         </div>
      </div>
   );
};
