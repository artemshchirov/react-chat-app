import Sidebar from '../../components/Sidebar/Sidebar';
import Chat from '../../components/Chat/Chat';

import './Main.scss';

const Main = () => {
  return (
    <div className="main">
      <div className="main__container">
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
};

export default Main;
