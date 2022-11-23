import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './components/login';
import Signup from './components/signup';
import PageNotFound from './components/PageNotFound';

export default function App (){
    return (
        <>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="*" element={<PageNotFound />} />
              </Routes>
            </BrowserRouter>
        </>
      );
}