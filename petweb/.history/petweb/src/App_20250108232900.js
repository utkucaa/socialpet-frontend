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
import NewAnswer from './Components/HelpAndInfo/NewAnswer';
import QuestionDetail from './Components/HelpAndInfo/QuestionDetail';
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
   
  // Kullanıcı giriş yaparsa sayfayı güncelle
  const handleLogin = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData)); // Kullanıcıyı localStorage'a kaydet
    setUser(userData); // Kullanıcıyı state'e ilet
  };

  // Kullanıcı çıkışı yaparsa sayfayı güncelle
  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null); // Kullanıcıyı sıfırla
  };


  return (
    <Router>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/login" element={<Login handleLogin={handleLogin}/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/adopt" element={<AdoptionPage />} />
        <Route path="/lost" element={<LostPage/>} />
        <Route path="/create-listing" element={<CreateListingPage />} />
        <Route path="/health-tracking" element={<div>Sağlık Takibi</div>} />
        <Route path="/breed-detector" element={<div>Cins Dedektifi</div>} />
        <Route path="/help-info" element={<HelpAndInfo/>} />
        <Route path="/question/:id" element={<QuestionDetail />} />
        <Route path="/new-answer" element={<NewAnswer />} />
        <Route path="/donate" element={<div>Bağış Yap</div>} />
        <Route path="/create-ad" element={user ? <CreatedPage /> : <Login />} />
        <Route path="/profile" element={user ? <ProfilePage/> : <Login />} />
      </Routes>
    </Router>
  );
}

export default App;


