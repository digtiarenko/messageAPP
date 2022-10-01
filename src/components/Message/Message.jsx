import './message.scss';
import React, { useContext, useEffect, useRef } from 'react';
import { MESSAGE_TYPE } from '../../constants/messageType';
import { AuthContext } from 'context/authContext';
import { ChatContext } from 'context/chatContext';

export const Message = ({ message }) => {
   const { currentUser } = useContext(AuthContext);
   const { data } = useContext(ChatContext);
   const ref = useRef();

   let styles;
   message.senderId === currentUser.uid
      ? (styles = MESSAGE_TYPE.outcome)
      : (styles = MESSAGE_TYPE.income);

   useEffect(() => {
      ref.current?.scrollIntoView({ behavior: 'smooth' });
   }, [message]);

   return (
      <div className="message" style={styles}>
         <div className="messageInfo">
            <img
               className="avatar"
               src={
                  message.senderId === currentUser.uid ? currentUser.photoURL : data.user.photoURL
               }
               alt="avatar"
            />
            <span>just now</span>
         </div>
         <div className="messageContent">
            <p>{message.text}</p>
            {message.img && <img src={message.img} alt="" />}
         </div>
      </div>
   );
};
