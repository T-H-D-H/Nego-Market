import {BrowserRouter, Route, Routes} from 'react-router-dom';
import SignUP from './pages/SignUp';
import Home from './pages/Home';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/signup" element={<SignUP/>}/>
      </Routes>
      
    </BrowserRouter>
  );
}

export default App;
