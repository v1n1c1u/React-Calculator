import Calculator from './main/calculator';
import Header from './main/header';
import Footer from './main/footer';
import Snackbars from './components/snackbar';
import React from 'react';
import './App.css';

function App() {

  return (
    <React.Fragment>
      <Snackbars />
      <Header />
      <Calculator />
      <Footer/>
    </React.Fragment>

  );
}

export default App;
