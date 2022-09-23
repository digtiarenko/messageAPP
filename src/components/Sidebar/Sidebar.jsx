import { ChatUnit } from 'components/ChatUnit/ChatUnit';
import { Filter } from 'components/Filter/Filter';
import React, { useEffect } from 'react';
import './sidebar.scss';

export const Sidebar = () => {
   // useEffect(() => {
   //    const navbarHeight = document.querySelector('.navbar').offsetHeight;
   //    console.dir(navbarHeight);
   // }, []);

   return (
      <div className="sidebar">
         <header id="navbar" className="navbar">
            <h1 className="logo">React_Chat</h1>
            <div className="user">
               <img
                  className="avatar"
                  src="https://static.wixstatic.com/media/9fd359_d63e59f338694736affc6fa986369c30~mv2.png/v1/fill/w_315,h_409,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Facepic.png"
                  alt=""
               />
               <span>Username</span>
               <button className="button" type="button">
                  Logout
               </button>
            </div>
         </header>
         <div className="list">
            <Filter className={'searchBar'} />
            <ul className="listUnit">
               <ChatUnit />
               <li className="chatUnit">
                  <div className="userInfo">
                     <img
                        className="avatar"
                        src="https://static.wixstatic.com/media/9fd359_d63e59f338694736affc6fa986369c30~mv2.png/v1/fill/w_315,h_409,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Facepic.png"
                        alt="avatar"
                     />
                     <span>Usernamee</span>
                  </div>
                  <div className="userChat">Lorem ipsum dolor sit amet.</div>
               </li>
               <li className="chatUnit">
                  <div className="userInfo">
                     <img
                        className="avatar"
                        src="https://static.wixstatic.com/media/9fd359_d63e59f338694736affc6fa986369c30~mv2.png/v1/fill/w_315,h_409,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Facepic.png"
                        alt=""
                     />
                     <span>Usernamee</span>
                  </div>
                  <div className="userChat">Lorem ipsum dolor sit amet.</div>
               </li>
               <li className="chatUnit">
                  <div className="userInfo">
                     <img
                        className="avatar"
                        src="https://static.wixstatic.com/media/9fd359_d63e59f338694736affc6fa986369c30~mv2.png/v1/fill/w_315,h_409,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Facepic.png"
                        alt=""
                     />
                     <span>Usernamee</span>
                  </div>
                  <div className="userChat">Lorem ipsum dolor sit amet.</div>
               </li>
            </ul>
         </div>
      </div>
   );
};
