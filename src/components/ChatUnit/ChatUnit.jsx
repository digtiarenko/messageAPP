import './chatUnit.scss';

export const ChatUnit = ({ startChat, chat }) => {
   return (
      <li
         className="chatUnit"
         onClick={() => {
            startChat(chat[1].userInfo);
         }}
      >
         <div className="userInfo">
            <img className="avatar" src={chat[1].userInfo.photoURL} alt="" />
            <span>{chat[1].userInfo.displayName}</span>
         </div>
         <div className="userChat">{chat[1].lastMessage?.text}</div>
      </li>
   );
};
