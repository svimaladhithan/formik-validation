import React from 'react';
import Sidebar from './Components/Sidebar';
import Footer from './Components/Footer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {Row, Col } from "react-bootstrap";
import Home from './Pages/Home';
import Manage from './Pages/Manage';
import Create from './Pages/Create';
import Edit from './Pages/Edit';
import Header from './Components/Header';
import './index.css'


const App = () => {
  return (
      
      <BrowserRouter>
      <Header />
      <Row>
        <Col className='col-md-2'>
      <div>
      <Sidebar />
      </div>
      </Col>
      <Col className='col-md-10'>
      <div>
      <Routes>
        <Route path="/" element={<Home />} />       
        <Route path='/manage' element={<Manage />} />
        <Route path='/edit/:id' element={<Edit />} />
        <Route path='/create' element={<Create />} />
      </Routes>
      </div>
      </Col>
      </Row>
      <Footer />
      </BrowserRouter>
    
  );
};

export default App;