import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import './register.scss';
import { auth, storage, db } from '../../firebase';
import { useState } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

export const Register = () => {
   const [error, setError] = useState(false);
   const [loading, setLoading] = useState(false);
   // const navigate = useNavigate();

   const handleSubmit = async e => {
      e.preventDefault();
      const displayName = e.target[0].value;
      const email = e.target[1].value;
      const password = e.target[2].value;
      const file = e.target[3].files[0];

      try {
         //Create user
         const res = await createUserWithEmailAndPassword(
            auth,
            email,
            password,
         );
         //Create a unique image name
         const date = new Date().getTime();
         const storageRef = ref(storage, `${displayName + date}`);

         await uploadBytesResumable(storageRef, file).then(() => {
            getDownloadURL(storageRef).then(async downloadURL => {
               try {
                  //Update profile
                  await updateProfile(res.user, {
                     displayName,
                     photoURL: downloadURL,
                  });
                  //create user on firestore
                  await setDoc(doc(db, 'users', res.user.uid), {
                     uid: res.user.uid,
                     displayName,
                     email,
                     photoURL: downloadURL,
                  });
                  //create empty user chats on firestore
                  await setDoc(doc(db, 'userChats', res.user.uid), {});
                  // navigate('/');
               } catch (err) {
                  console.log(err);
                  setError(true);
                  setLoading(false);
               }
            });
         });
      } catch (err) {
         setError(true);
         setLoading(false);
      }
   };
   return (
      <div className="formContainer">
         <div className="formWrapper">
            <h1 className="logo">React_Chat</h1>
            <h2 className="title">Sign up</h2>
            <form className="form" onSubmit={handleSubmit}>
               <input
                  type="text"
                  name="chatName"
                  placeholder="pick your chat name"
               />
               <input type="email" placeholder="email" />
               <input type="text" placeholder="pasword" />
               <input id="file" type="file" style={{ display: 'none' }} />
               <label htmlFor="file">
                  Add an avatar
                  <span className="material-symbols-outlined">add_a_photo</span>
               </label>

               <button type="submit">GO</button>
               {error && (
                  <span style={{ color: 'red' }}>Something went wrong</span>
               )}
            </form>
            <p> Already have an account? Login</p>
         </div>
      </div>
   );
};
