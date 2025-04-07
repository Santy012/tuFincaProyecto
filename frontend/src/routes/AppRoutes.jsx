import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from '../features/home/MainPage';
import AdminPage from '../features/admin/AdminPage';
import LoginPage from '../features/login/LoginPage';
import ProtectedRoute from './ProtectedRoute';
import PropertyPage from '../features/propiedades/PropertyPage';
import ScrollToTop from './ScrollToTop';

const AppRoutes = () => {
    return(
        <Router>
            <ScrollToTop />
            <Routes>
                <Route path='/' element={<MainPage/>}/>
                
                <Route path='/admin' element={
                    <ProtectedRoute>
                        <AdminPage/>
                    </ProtectedRoute>
                }/>

                <Route path='/login' element={<LoginPage/>}/>
                <Route path="/propiedad/:id" element={<PropertyPage />} /> 
            </Routes>
        </Router>
    )
}

export default AppRoutes;