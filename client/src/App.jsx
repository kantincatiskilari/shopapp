import './App.css';
import Footer from './components/footer/Footer';
import Navbar from './components/navbar/Navbar';
import Cart from './pages/cart/Cart';
import Home from './pages/home/Home';
import LoginRegister from './pages/loginRegister/LoginRegister';
import Product from './pages/product/Product';
import Section from './pages/section/Section';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import Redirection from './pages/redirection/Redirection';
import { useSelector } from 'react-redux';
import Cookies from 'universal-cookie';
import { useEffect } from 'react';

function App() {
  const {user} = useSelector(state => state.user);
  const cookies = new Cookies();

  useEffect(() => {  
    if(!cookies.get("access_token")){
      cookies.set("access_token",user?.access_token)
    }
  },[])

  return (
    <>
      <Router>
        <Navbar />
        <div className="app">
          <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/login' element={<LoginRegister />}/>
            <Route path='/women/*' element={<Section />}/>
            <Route path='/men/*' element={<Section />}/>
            <Route path='/kids/*' element={<Section />}/>
            <Route path='/sale/*' element={<Section />}/>        
            <Route path='/product/:productName' element={<Product />}/>
            <Route path='/cart' element={user && <Cart />}/>
            {user 
            ? <Route path='/redirection' element={<Redirection type/>}/> 
            : <Route path='/redirection' element={<Redirection />}/>}
          </Routes>
        </div>
        <Footer />
      </Router>
    </>
  );
}

export default App;
