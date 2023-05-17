import Calculator from './main/calculator';
import Header from './main/header';
import Footer from './main/footer';
import React from 'react';
import './App.css';

function App() {
  return (
    <React.Fragment>
      <Header />
      <Calculator />
      <Footer/>
    </React.Fragment>

  );
}

export default App;
