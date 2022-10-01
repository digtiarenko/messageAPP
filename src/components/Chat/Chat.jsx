import { Message } from 'components/Message/Message';
import { ChatContext } from 'context/chatContext';
import { db, storage } from '../../firebase';
import { useContext, useEffect, useState } from 'react';
import './chat.scss';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { v4 as uuid } from 'uuid';
import {
   arrayUnion,
   onSnapshot,
   doc,
   serverTimestamp,
   Timestamp,
   updateDoc,
} from 'firebase/firestore';
import { AuthContext } from 'context/authContext';

export const Chat = () => {
   const [messages, setMessages] = useState([]);
   const [text, setText] = useState('');
   const [img, setImg] = useState(null);
   const { data } = useContext(ChatContext);
   const { currentUser } = useContext(AuthContext);

   const handleSend = async () => {
      if (img) {
         const storageRef = ref(storage, uuid());
         const uploadTask = uploadBytesResumable(storageRef, img);

         uploadTask.on(
            error => {
               //TODO:Handle Error
            },
            () => {
               getDownloadURL(uploadTask.snapshot.ref).then(async downloadURL => {
                  await updateDoc(doc(db, 'chat', data.chatId), {
                     messages: arrayUnion({
                        id: uuid(),
                        text,
                        senderId: currentUser.uid,
                        date: Timestamp.now(),
                        img: downloadURL,
                     }),
                  });
               });
            },
         );
         setText('');
         setImg(null);
      } else {
         await updateDoc(doc(db, 'chat', data.chatId), {
            messages: arrayUnion({
               id: uuid(),
               text,
               senderId: currentUser.uid,
               date: Timestamp.now(),
            }),
         });
      }
      setText('');
      setImg(null);

      await updateDoc(doc(db, 'userChats', currentUser.uid), {
         [data.chatId + '.lastMessage']: {
            text,
         },
         [data.chatId + '.date']: serverTimestamp(),
      });

      await updateDoc(doc(db, 'userChats', data.user.uid), {
         [data.chatId + '.lastMessage']: {
            text,
         },
         [data.chatId + '.date']: serverTimestamp(),
      });
   };

   useEffect(() => {
      const fn = () => {
         const unSub = onSnapshot(doc(db, 'chat', data.chatId), doc => {
            doc.exists() && setMessages(doc.data().messages);
         });
         return () => {
            unSub();
         };
      };
      data.chatId && fn();
   }, [data.chatId]);

   return (
      <div className="chat">
         <div className="chatHeader">
            <img className="avatar" src={data.user.photoURL} alt="avatar" />
            <span>{data.user.displayName}</span>
         </div>
         <div className="messages">
            <div className="messageWrap">
               {messages.map(m => (
                  <Message type={'outcome'} message={m} key={m.id} />
               ))}
               {/* <Message type={'outcome'} />
               <Message type={'outcome'} />
               <Message type={'outcome'} />
               <Message type={'outcome'} />
               <Message type={'outcome'} />
               <Message type={'outcome'} />
               <Message type={'outcome'} />
               <Message type={'outcome'} />
               <Message type={'outcome'} />
               <Message type={'outcome'} /> */}
            </div>
            <div className="input">
               <textarea
                  onChange={e => setText(e.target.value)}
                  className="textarea"
                  value={text}
                  name="input"
                  rows="5"
                  cols="33"
                  placeholder="type smth..."
               ></textarea>
               <input
                  id="file"
                  type="file"
                  onChange={e => setImg(e.target.files[0])}
                  style={{ display: 'none' }}
               />
               <div className="sendElement">
                  <label htmlFor="file" className="icon">
                     Add a picture
                     <span className="material-symbols-outlined">add_a_photo</span>
                  </label>
                  <button type="submit" onClick={handleSend} className="button">
                     Send
                  </button>
               </div>
            </div>
         </div>
      </div>
   );
};
