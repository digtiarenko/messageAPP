import { Message } from 'components/Message/Message';
import './chat.scss';

export const Chat = () => {
   return (
      <div className="chat">
         <div className="chatHeader">
            <img
               className="avatar"
               src="https://static.wixstatic.com/media/9fd359_d63e59f338694736affc6fa986369c30~mv2.png/v1/fill/w_315,h_409,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Facepic.png"
               alt="avatar"
            />
            <span>John Doe</span>
         </div>
         <div className="messages">
            <div className="messageWrap">
               <Message type={'income'} />
               <Message type={'outcome'} />
               <Message type={'outcome'} />
               <Message type={'outcome'} />
               <Message type={'outcome'} />
               <Message type={'outcome'} />
               <Message type={'outcome'} />
               <Message type={'outcome'} />
               <Message type={'outcome'} />
               <Message type={'outcome'} />
               <Message type={'outcome'} />
               <Message type={'outcome'} />
               <Message type={'outcome'} />
            </div>
            <div className="input">
               <textarea
                  className="textarea"
                  name="input"
                  rows="5"
                  cols="33"
                  placeholder="type smth..."
               ></textarea>
               <input id="file" type="file" style={{ display: 'none' }} />
               <div className="sendElement">
                  <label htmlFor="file" className="icon">
                     Add a picture
                     <span className="material-symbols-outlined">
                        add_a_photo
                     </span>
                  </label>
                  <button type="" className="button">
                     Send
                  </button>
               </div>
            </div>
         </div>
      </div>
   );
};
