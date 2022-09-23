import { Chat } from 'components/Chat/Chat';
import { Sidebar } from 'components/Sidebar/Sidebar';
import { useEffect, useState } from 'react';
import './home.scss';

export const Home = () => {
   const [navbarHeight, setNavbarHeight] = useState(null);

   useEffect(() => {
      const divHeight = () => {
         const navbar = document.querySelector('.navbar');
         setNavbarHeight(navbar?.offsetHeight);
         console.dir(navbarHeight);
      };
      divHeight();
   }, [navbarHeight]);

   return (
      <div className="home">
         <div className="container">
            <Sidebar />
            <Chat elHeight={navbarHeight} />
         </div>
      </div>
   );
};
