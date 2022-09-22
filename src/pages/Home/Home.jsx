import { Chat } from 'components/Chat/Chat';
import { Sidebar } from 'components/Sidebar/Sidebar';
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
