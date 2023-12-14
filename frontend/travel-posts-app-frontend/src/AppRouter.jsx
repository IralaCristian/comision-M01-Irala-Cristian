import { Route, Routes} from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { LoginForm } from './components/LoginForm';
import { RegisterForm } from './components/RegisterForm';
import PrivateRoutes from './components/PrivateRoutes';
import NewPostForm from './components/NewPostForm';


function AppRouter() {
    return (
        
        <Routes>
            {/*public routes */}
            <Route  path="/" element={<HomePage/>}  />
            <Route  path='/register' element={<RegisterForm/>} />
            <Route  path='/login' element={<LoginForm/>} />

            {/*private routes */}
            <Route element={<PrivateRoutes/>}>
                <Route path='post/new' element={<NewPostForm/>}/>

            </Route>

        </Routes>

    
    )
}

export default AppRouter;