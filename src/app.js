import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './components/login';
import PageNotFound from './components/PageNotFound';

export default function App (){
    return (
        <>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="*" element={<PageNotFound />} />
              </Routes>
            </BrowserRouter>
        </>
      );
}