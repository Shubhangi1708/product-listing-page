import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import ProductListingPage from './components/ProductListingPage';
import Banner from './components/Banner';

function App() {
  return (
    <div>
    <Header/>
    <Banner/>
    <ProductListingPage/>
    </div>
  );
}

export default App;
