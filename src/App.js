import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Login from './components/Login/Login';
import Intro from './components/Intro/Intro';
import Register from './components/Register/Register';
import ProfilePage from './components/Profile/ProfilePage';
import AdoptionPage from './components/Adoption/AdoptionPage';
import CreatedPage from './components/Adoption/CreatedPage';
import LostPage from './components/Lost/LostPage';
import CreateListingPage from './components/Lost/CreateListingPage'; // Bu satırı ekleyin
import QuestionDetail from './components/HelpAndInfo/QuestionDetail';
import AdDetail from './components/Adoption/AdDetail';
import Donate from './components/Donate/Donate';
import NewAnswer from './components/HelpAndInfo/NewAnswer';
import MedicalRecord from './components/MedicalRecord/MedicalRecord';

import './App.css';
import HelpAndInfo from './components/HelpAndInfo/HelpAndInfo';

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
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/adopt" element={<AdoptionPage />} />
        <Route path="/lost" element={<LostPage/>} />
        <Route path="/create-listing" element={<CreateListingPage />} />
        <Route path="/health-tracking" element={<MedicalRecord/>} />
        <Route path="/breed-detector" element={<div>Cins Dedektifi</div>} />
        <Route path="/help-info" element={<HelpAndInfo/>} />
        <Route path="/question/:id" element={<QuestionDetail />} />
        <Route path="/donate" element={<Donate/>} />
        <Route path="/create-ad" element={<CreatedPage />} />
        <Route path="/profile" element={<ProfilePage user={user} setUser={setUser} />} />
        <Route path="/ad/:id" element={<AdDetail />} />
        <Route path="/new-answer" element={<NewAnswer />} />
      </Routes>
    </Router>
  );
}

export default App;
