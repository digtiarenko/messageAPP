import { useState } from 'react';
import { ChatUnit } from 'components/ChatUnit/ChatUnit';
import { Filter } from 'components/Filter/Filter';
import { AuthContext } from 'context/authContext';
import { signOut } from 'firebase/auth';
import { useContext } from 'react';
import { auth } from '../../firebase';
import { collection, query, where, getDocs, setDoc, doc, updateDoc, serverTimestamp, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import './sidebar.scss';

export const Sidebar = () => {
   const [userName, setUserName] = useState('');
   const [user, setUser] = useState('');
   const [error, setError] = useState('');

   const handleFilter = async () => {
      const chats = query(collection(db, 'users'), where('displayName', '==', userName));
      try {
         const querySnapshot = await getDocs(chats);
         querySnapshot.forEach(doc => {
            setUser(doc.data());
            console.log(user);
         });
      } catch (err) {
         setError(err);
      }
   };

   console.log('userName', userName);

   const { currentUser } = useContext(AuthContext);
   return (
      <div className="sidebar">
         <header id="navbar" className="navbar">
            <h1 className="logo">React_Chat</h1>
            <div className="user">
               <img className="avatar" src={currentUser.photoURL} alt="" />
               <span>{currentUser.displayName}</span>
               <button onClick={() => signOut(auth)} className="button" type="button">
                  Logout
               </button>
            </div>
         </header>
         <div className="list">
            <Filter
               handleFilter={handleFilter}
               setUserName={setUserName}
               userName={userName}
               setUser={setUser}
               className={'searchBar'}
            />
            {error && <span> Not found</span>}
            <ul className="listUnit">{user && <ChatUnit user={user} />}</ul>
         </div>
      </div>
   );
};
