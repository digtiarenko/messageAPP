import React from 'react';

export const Message = () => {
   return (
      <div className="message">
         <div className="messageInfo">
            <img
               src="https://static.wixstatic.com/media/9fd359_d63e59f338694736affc6fa986369c30~mv2.png/v1/fill/w_315,h_409,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Facepic.png"
               alt="avatar"
            />
            <span>just know</span>
         </div>
         <div className="messageContent">
            <p>message text</p>
            <img
               src="https://static.wixstatic.com/media/9fd359_d63e59f338694736affc6fa986369c30~mv2.png/v1/fill/w_315,h_409,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Facepic.png"
               alt="avatar"
            />
         </div>
      </div>
   );
};
