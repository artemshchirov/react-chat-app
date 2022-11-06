import { useContext } from 'react';
import { Navigate } from 'react-router-dom';

import { AuthContext } from '../context/AuthContext';

import { PAGES } from '../utils/constants';

function ProtectedRoute({ children }) {
  const { currentUser } = useContext(AuthContext);

  return currentUser ? children : <Navigate to={PAGES.SIGNIN} />;
}

export default ProtectedRoute;
