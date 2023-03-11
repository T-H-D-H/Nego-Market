import {BrowserRouter, Route, Routes} from 'react-router-dom';
import SignUP from './pages/SignUp';
import Home from './pages/Home';
import Login from './pages/Login';
import MyPage from './pages/MyPage';
import UploadProduct from './pages/UploadProduct';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/signup" element={<SignUP/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/mypage" element={<MyPage/>}/>
        <Route path="/upload" element={<UploadProduct/>}/>
      </Routes>
      
    </BrowserRouter>
  );
}

export default App;
