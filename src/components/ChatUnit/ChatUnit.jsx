import './chatUnit.scss';

export const ChatUnit = ({ user, startChat, chat }) => {
   console.log('chat in ChatUnit :', chat);
   return (
      <li className="chatUnit" onClick={startChat}>
         <div className="userInfo">
            <img className="avatar" src={chat[1].userInfo.photoURL || user?.photoURL} alt="" />
            <span>{chat[1].userInfo.displayName || user.displayName}</span>
         </div>
         <div className="userChat">{chat[1].userInfo.lastMessage?.text}</div>
      </li>
   );
};
