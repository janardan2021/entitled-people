import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

import Header from './components/Header';
import Footer from './components/Footer';

// Bootstrap css
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

// pages
import Home from './pages/Home';
import AllFrustations from './pages/AllFrustations';
import FrustationPage from './pages/FrustationPage';
import Login from './pages/Login';
import Signup from './pages/Signup';


function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <Header />
      <ToastContainer />
      <div className='pages'>
        <Routes>
           <Route path='/' element={ < Home /> } />
           <Route path='/frustations' element={ < AllFrustations /> } />
           <Route path='/page/:pageNumber' element={ < AllFrustations /> } />
           <Route path='/login' element={ < Login /> } />
           <Route path='/signup' element={ < Signup /> } />
           <Route path='/frustations/:id' element={ < FrustationPage /> } />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  </div>
  );
}

export default App;
