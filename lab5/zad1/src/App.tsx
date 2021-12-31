import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Components/Home';
import NavbarHeader from './Components/NavbarHeader';
import Photos from './Components/Photos';
import Posts from './Components/Posts';

const App = () => (
    <div className="App">
        <BrowserRouter>
            <NavbarHeader />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="posts" element={<Posts />} />
                <Route path="photos" element={<Photos />} />
            </Routes>
        </BrowserRouter>
    </div>
);

export default App;
