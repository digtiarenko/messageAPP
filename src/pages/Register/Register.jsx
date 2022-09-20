import React from 'react';
import './register.scss';

export const Register = () => {
   return (
      <div className="formContainer">
         <div className="formWrapper">
            <h1 className="logo">React_Chat</h1>
            <h2 className="title">Sign up</h2>
            <form className="form">
               <input type="text" placeholder="pick your chat name" />
               <input type="email" placeholder="email" />
               <input type="text" placeholder="pasword" />
               <input id="file" type="file" style={{ display: 'none' }} />
               <label htmlFor="file">
                  Upload your image{' '}
                  <span class="material-symbols-outlined">add_a_photo</span>
               </label>

               <button type="submit">GO</button>
            </form>
            <p> Already have an account? Login</p>
         </div>
      </div>
   );
};
