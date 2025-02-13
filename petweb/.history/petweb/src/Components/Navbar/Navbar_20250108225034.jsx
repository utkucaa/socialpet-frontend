import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ user, setUser }) => {
  const handleLogout = () => {
    setUser(null); // Kullanıcıyı çıkış yaptır
  };

  return (
    <div className='n-container'>
      <div className="n-left">
        <Link to="/">
          <img src="/logo.png" alt="Social Pet Logo" className="n-logo" />
        </Link>
      </div>
      <div className="n-right">
        <div className="n-list">
          <ul>
            <li><Link to="/">Ana Sayfa</Link></li>
            <li><Link to="/adopt">Sahiplen</Link></li>
            <li><Link to="/lost">Kayıp</Link></li>
            <li><Link to="/health-tracking">Sağlık Takibi</Link></li>
            <li><Link to="/breed-detector">Cins Dedektifi</Link></li>
            <li><Link to="/help-info">Yardım ve Bilgi</Link></li>
            <li><Link to="/donate">Bağış Yap</Link></li>

            {/* Eğer user varsa (giriş yapılmışsa) Profil ve Çıkış Yap butonlarını göster */}
            {user ? (
              <>
                <li><Link to="/profile">Profil</Link></li>
                <button className='giris-cıkıs' onClick={handleLogout}>Çıkış Yap</button>
              </>
            ) : (
              // Eğer user yoksa (giriş yapılmamışsa) Giriş / Kayıt Ol butonunu göster
              <li><Link to="/login">Giriş / Kayıt Ol</Link></li>
            )}
          </ul>
        </div>

        {/* Eğer kullanıcı giriş yapmamışsa, "Hemen İlan Ver" butonunu göster */}
        {!user && (
          <button className='giris-cıkıs'>
            <Link to="/create-ad">Hemen İlan Ver</Link>
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
