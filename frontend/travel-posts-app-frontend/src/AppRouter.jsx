import { Route, Routes} from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { LoginForm } from './components/LoginForm';
import { RegisterForm } from './components/RegisterForm';


function AppRouter() {
    return (
        <Routes>
            <Route  path="/" element={<HomePage/>}  />
            <Route  path='/register' element={<RegisterForm/>} />
            <Route  path='/login' element={<LoginForm/>} />
        </Routes>
    )
}

export default AppRouter;