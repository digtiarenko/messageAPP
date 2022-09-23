import './message.scss';

export const Message = ({ type }) => {
   let styles;
   console.log(type);

   switch (type) {
      case 'income':
         styles = {
            alignSelf: 'flex-start',
            borderRadius: '0px 15px 15px 0px',
         };
         break;
      case 'outcome':
         styles = {
            alignSelf: 'flex-end',
            borderRadius: '15px 0px 0px 15px',
            flexDirection: 'row-reverse',
         };
         break;
      default:
         break;
   }
   console.log(styles);

   return (
      <div className="message" style={styles}>
         <div className="messageInfo">
            <img
               src="https://static.wixstatic.com/media/9fd359_d63e59f338694736affc6fa986369c30~mv2.png/v1/fill/w_315,h_409,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Facepic.png"
               alt="avatar"
            />
            <span>just now</span>
         </div>
         <div className="messageContent">
            <p>
               message Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
               consectetur adipisicing elit. Quaerat, sed?
            </p>
            {/* <img
               src="https://static.wixstatic.com/media/9fd359_d63e59f338694736affc6fa986369c30~mv2.png/v1/fill/w_315,h_409,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Facepic.png"
               alt="avatar"
            /> */}
         </div>
      </div>
   );
};
