import { useEffect, useState } from 'react';
import { ChatUnit } from 'components/ChatUnit/ChatUnit';
import { Filter } from 'components/Filter/Filter';
import { AuthContext } from 'context/authContext';
import { ChatContext } from 'context/chatContext';
import { signOut } from 'firebase/auth';
import { useContext } from 'react';
import { auth } from '../../firebase';
import {
   collection,
   query,
   where,
   getDocs,
   setDoc,
   doc,
   updateDoc,
   serverTimestamp,
   getDoc,
   onSnapshot,
} from 'firebase/firestore';
import { db } from '../../firebase';
import './sidebar.scss';

export const Sidebar = () => {
   const [userName, setUserName] = useState('');
   const [user, setUser] = useState('');
   const [error, setError] = useState('');
   const { currentUser } = useContext(AuthContext);
   const { dispatch } = useContext(ChatContext);

   const [chats, setChats] = useState([]);

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
   const handleSelect = async () => {
      const combinedId =
         currentUser?.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid;

      try {
         const res = await getDoc(doc(db, 'chat', combinedId));

         if (!res.exists()) {
            await setDoc(doc(db, 'chat', combinedId), { messages: [] });

            await updateDoc(doc(db, 'userChats', currentUser.uid), {
               [combinedId + '.userInfo']: {
                  uid: user.uid,
                  displayName: user.displayName,
                  photoURL: user.photoURL,
               },
               [combinedId + '.date']: serverTimestamp(),
            });
            await updateDoc(doc(db, 'userChats', user.uid), {
               [combinedId + '.userInfo']: {
                  uid: currentUser.uid,
                  displayName: currentUser.displayName,
                  photoURL: currentUser.photoURL,
               },
               [combinedId + '.date']: serverTimestamp(),
            });
         }
      } catch (error) {}
      setUser(null);
      setUserName('');
   };

   const handlePickChat = u => {
      dispatch({ type: 'CHANGE_USER', payload: u });
   };

   useEffect(() => {
      const getChats = () => {
         const fetchChats = onSnapshot(doc(db, 'userChats', currentUser.uid), doc => {
            setChats(doc.data());
         });
         return () => {
            fetchChats();
         };
      };
      currentUser.uid && getChats();
   }, [currentUser.uid]);

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
            <ul className="listUnit">
               {user && (
                  <li className="chatUnit" onClick={handleSelect}>
                     <div className="userInfo">
                        <img className="avatar" src={user.photoURL} alt="" />
                        <span>{user.displayName}</span>
                     </div>
                  </li>
               )}

               {Object.entries(chats)
                  ?.sort((a, b) => b[1].date - a[1].date)
                  .map(chat => (
                     <ChatUnit key={chat[0]} chat={chat} startChat={handlePickChat} />
                  ))}
            </ul>
         </div>
      </div>
   );
};
