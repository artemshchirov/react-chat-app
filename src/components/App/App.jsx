import Register from '../../pages/Register/Register';
import Alert from '../Alert/Alert';

import './App.scss';

function App() {
  return (
    <div className="page">
      <div className="page__container">
        <div className="content-wrapper">
          <Register />
          <Alert
            messageAlert={'messageAlert'}
            isActiveAlert={'isActiveAlert'}
          />
        </div>
        <div>Footer</div>
      </div>
    </div>
  );
}

export default App;
