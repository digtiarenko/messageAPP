import './message.scss';
import { MESSAGE_TYPE } from '../../constants/messageType';

export const Message = ({ type }) => {
   let styles;
   switch (type) {
      case 'income':
         styles = MESSAGE_TYPE.income;
         break;
      case 'outcome':
         styles = MESSAGE_TYPE.outcome;
         break;
      default:
         break;
   }

   return (
      <div className="message" style={styles}>
         <div className="messageInfo">
            <img
               className="avatar"
               src="https://static.wixstatic.com/media/9fd359_d63e59f338694736affc6fa986369c30~mv2.png/v1/fill/w_315,h_409,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Facepic.png"
               alt="avatar"
            />
            <span>just now</span>
         </div>
         <div className="messageContent">
            {/* <p>
               message Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
               consectetur adipisicing elit. Quaerat, sed?
            </p> */}
            <img
               className="userImg"
               src="https://static.wixstatic.com/media/9fd359_d63e59f338694736affc6fa986369c30~mv2.png/v1/fill/w_315,h_409,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Facepic.png"
               alt="avatar"
            />
         </div>
      </div>
   );
};
