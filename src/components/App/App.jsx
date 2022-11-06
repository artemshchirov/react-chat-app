import { Routes, Route } from 'react-router-dom';

import Register from '../../pages/Register/Register';
import Login from '../../pages/Login/Login';
import Main from '../../pages/Main/Main';
import Alert from '../Alert/Alert';
import ProtectedRoute from '../../hocs/ProtectedRoute';

import { PAGES } from '../../utils/constants';

import './App.scss';

const App = () => {
  return (
    <div className="page">
      <div className="page__container">
        <Routes>
          <Route
            index
            path={PAGES.MAIN}
            element={
              <ProtectedRoute path={PAGES.MAIN}>
                <Main />
              </ProtectedRoute>
            }
          />
          <Route path={PAGES.SIGNIN} element={<Login />} />
          <Route path={PAGES.SIGNUP} element={<Register />} />
        </Routes>
        <Alert messageAlert={'messageAlert'} isActiveAlert={'isActiveAlert'} />
      </div>
    </div>
  );
};

export default App;
