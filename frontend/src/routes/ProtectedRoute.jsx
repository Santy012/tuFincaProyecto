import { Navigate } from 'react-router-dom';
import { useGlobalContext } from '../context/GlobalContext';

const ProtectedRoute = ({ children }) => {
  const { admin } = useGlobalContext();
  
  if (!admin) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

export default ProtectedRoute;