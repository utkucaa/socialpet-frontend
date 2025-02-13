import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Login from './Components/Login/Login';
import Intro from './Components/Intro/Intro';
import Register from './Components/Register/Register';
import ProfilePage from './Components/Profile/ProfilePage';
import AdoptionPage from './Components/Adoption/AdoptionPage';
import CreatedPage from './Components/Adoption/CreatedPage';
import LostPage from './Components/Lost/LostPage';
import CreateListingPage from './Components/Lost/CreateListingPage'; // Bu satırı ekleyin
import CategoryBar from './Components/Lost/CategoryBar';
import Answer from './Components/HelpAndInfo/HelpAndInfo';

import './App.css';
import HelpAndInfo from './Components/HelpAndInfo/HelpAndInfo';

function App() {
  const [user, setUser] = useState(null);  // Kullanıcı bilgisini tutacak state

  useEffect(() => {
    // Sayfa yüklendiğinde localStorage'dan kullanıcı bilgisini al
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <Router>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/adopt" element={<AdoptionPage />} />
        <Route path="/lost" element={<LostPage/>} />
        <Route path="/create-listing" element={<CreateListingPage />} />
        <Route path="/health-tracking" element={<div>Sağlık Takibi</div>} />
        <Route path="/breed-detector" element={<div>Cins Dedektifi</div>} />
        <Route path="/help-info" element={<HelpAndInfo/>} />
        <Route path="/donate" element={<div>Bağış Yap</div>} />
        <Route path="/create-ad" element={<CreatedPage />} />
        <Route path="/profile" element={<ProfilePage user={user} setUser={setUser} />} />
      </Routes>
    </Router>
  );
}

export default App;


