import { useEffect, useState } from 'react';
import { ChatUnit } from 'components/ChatUnit/ChatUnit';
import { Filter } from 'components/Filter/Filter';
import { AuthContext } from 'context/authContext';
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
      const combinedID =
         currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid;
      try {
         const res = await getDoc(doc(db, 'chats', combinedID));

         if (!res.exists()) {
            await setDoc(doc(db, 'chat', combinedID), { messages: [] });

            await updateDoc(doc(db, 'userChats', currentUser.uid), {
               [combinedID + '.userInfo']: {
                  uid: user.uid,
                  displayName: user.displayName,
                  photoURL: user.photoURL,
               },
               [combinedID + '.date']: serverTimestamp(),
            });
            await updateDoc(doc(db, 'userChats', user.uid), {
               [combinedID + '.userInfo']: {
                  uid: currentUser.uid,
                  displayName: currentUser.displayName,
                  photoURL: currentUser.photoURL,
               },
               [combinedID + '.date']: serverTimestamp(),
            });
         }
      } catch (error) {}
      setUser(null);
      setUserName('');
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
   console.log(chats);
   console.log('userName', userName);

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
               {user && <ChatUnit content={chats} startChat={handleSelect} user={user} />}

               {Object.entries(chats)?.map(chat => (
                  <ChatUnit key={chat[0]} chat={chat} startChat={handleSelect} />
               ))}
            </ul>
         </div>
      </div>
   );
};
