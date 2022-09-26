import './chatUnit.scss';

export const ChatUnit = ({ user }) => {
   return (
      <li className="chatUnit">
         <div className="userInfo">
            <img className="avatar" src={user.photoURL} alt="" />
            <span>{user.displayName}</span>
         </div>
         <div className="userChat">Lorem ipsum dolor sit amet.</div>
      </li>
   );
};
