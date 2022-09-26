import { Chat } from 'components/Chat/Chat';
import { Sidebar } from 'components/Sidebar/Sidebar';
// import { useEffect, useState } from 'react';
import './home.scss';

export const Home = () => {
   return (
      <div className="home">
         <div className="container">
            <Sidebar />
            <Chat />
         </div>
      </div>
   );
};
