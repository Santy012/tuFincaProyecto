import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from '../features/home/MainPage';
import AdminPage from '../features/Admin/AdminPage';

const AppRoutes = () => {
    return(
        <Router>
            <Routes>
                <Route path='/' element={<MainPage/>}/>

                <Route path='/admin' element={<AdminPage/>}/>
            </Routes>
        </Router>
    )
}

export default AppRoutes;