import React from 'react';
import Navbar from './Components/Navbar';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Page/Home';
import Product from './Page/Product';
import Cart from './Page/Cart';
import ShopCategory from './Page/ShopCategory';
import ShopContextProvider from './Context/ShopContext';
import Login from './Page/Login';
import AddressDelivery from './Page/AddressDelivery';
import Order from './Page/Order';
import SearchPage from './Page/SearchPage';
import Footer from './Components/Footer';
import OrderAddress from './Page/OrderAddress';

const App = () => {
  return (
    <ShopContextProvider>
      <BrowserRouter>
        <Navbar/>

        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/women' element={<ShopCategory category="women"/>} />
          <Route path='/shoes' element={<ShopCategory category="shoes"/>} />
          <Route path='/kid' element={<ShopCategory category="kid"/>} />
          <Route path='/men' element={<ShopCategory category="men"/>} />
          <Route path='/home' element={<ShopCategory category="home"/>} />
          <Route path='/beauty' element={<ShopCategory category="beauty"/>} />
          <Route path='/accessories' element={<ShopCategory category="accessories"/>} />
          <Route path='/electronics' element={<ShopCategory category="electronics"/>} />
          <Route path='/toys' element={<ShopCategory category="toys"/>} />
          <Route path='/furniture' element={<ShopCategory category="furniture"/>} />
          <Route path='/adult' element={<ShopCategory category="adult"/>} />
          <Route path='/food' element={<ShopCategory category="food"/>} />
          <Route path='/zoo' element={<ShopCategory category="zoo"/>} />
          <Route path='/cartools' element={<ShopCategory category="cartools"/>} />
          <Route path='/health' element={<ShopCategory category="health"/>} />
          <Route path='/sports' element={<ShopCategory category="sports"/>} />

          <Route path='/product' element={<Product/>}>
            <Route path=':productId' element={<Product/>}/>
          </Route>
          <Route path='/login' element={<Login/>} />
          <Route path='/cart' element={<Cart/>} />
          <Route path='/addressdelivery' element={<AddressDelivery/>} />
          <Route path='/order' element={<Order/>} />
          <Route path='/orderaddress' element={<OrderAddress/>} />
          <Route path='/search' element={<SearchPage/>} />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </ShopContextProvider>
  );
}

export default App;
