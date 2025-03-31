import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from '../features/home/MainPage';
import AdminPage from '../features/admin/AdminPage';
import LoginPage from '../features/login/LoginPage';
import ProtectedRoute from './ProtectedRoute';

const AppRoutes = () => {
    return(
        <Router>
            <Routes>
                <Route path='/' element={<MainPage/>}/>
                
                <Route path='/admin' element={
                    <ProtectedRoute>
                        <AdminPage/>
                    </ProtectedRoute>
                }/>

                <Route path='/login' element={<LoginPage/>}/>
            </Routes>
        </Router>
    )
}

export default AppRoutes;