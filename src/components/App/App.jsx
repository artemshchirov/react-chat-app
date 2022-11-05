import { Routes, Route, useNavigate } from 'react-router-dom';

import Register from '../../pages/Register/Register';
import Login from '../../pages/Login/Login';
import Alert from '../Alert/Alert';

import { PAGES } from '../../utils/constants';

import './App.scss';

function App() {
  return (
    <div className="page">
      <div className="page__container">
        <Routes>
          {/* <div className="content-wrapper"> */}
          <Route path={PAGES.SIGNUP} element={<Register />} />
          <Route path={PAGES.SIGNIN} element={<Login />} />

          {/* </div>
        <div>Footer</div> */}
        </Routes>
        <Alert messageAlert={'messageAlert'} isActiveAlert={'isActiveAlert'} />
      </div>
    </div>
  );
}

export default App;
