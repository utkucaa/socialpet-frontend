import React, { useState } from 'react';
import './Register.css'; 
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    // Form Validasyonu
    if (!name || !surname || !username || !email || !phone || !password || !confirmPassword) {
      setError('Lütfen tüm alanları doldurun!');
      setSuccess('');
      return;
    }
    if (password !== confirmPassword) {
      setError('Şifreler uyuşmuyor!');
      return;
    }

    // Backend'e POST isteği
    try {
      const response = await fetch("http://localhost:8080/api/v1/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          firstName: name,
          lastName: surname,
          userName: username,
          email: email,
          phoneNumber: phone,
          password: password
        })
      });

      console.log('Response:', response);

      if (!response.ok) {
        throw new Error('Kayıt işlemi başarısız. Lütfen tekrar deneyin.');
      }

      setSuccess('Kayıt işlemi başarılı!'); 
      setError('');
      
      // 2 saniye sonra giriş sayfasına yönlendirme
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      setError(error.message);
      setSuccess('');
    }
  };

  return (
    <div className="register-page">
      <div className="register-left">
        <img src="/soll.png" alt="Social Pet Logo" className="register-logo" />
        <h1>SocialPet Platformuna Hoş Geldiniz!</h1>
        <p>Dostlarınızı bulmak, paylaşmak ve daha fazlası için kaydolun.</p>
      </div>

      <div className="register-right">
        <div className="register-box">
          <h2>Kayıt Ol</h2>
          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}
          <form onSubmit={handleRegister}>
            <div className="form-group">
              <label>Ad</label>
              <input
                type="text"
                placeholder="Adınızı girin"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Soyad</label>
              <input
                type="text"
                placeholder="Soyadınızı girin"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Kullanıcı Adı</label>
              <input
                type="text"
                placeholder="Kullanıcı adınızı girin"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>E-posta</label>
              <input
                type="email"
                placeholder="E-postanızı girin"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Telefon Numarası</label>
              <input
                type="tel"
                placeholder="Telefon numaranızı girin"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Şifre</label>
              <input
                type="password"
                placeholder="Şifrenizi girin"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Şifreyi Onayla</label>
              <input
                type="password"
                placeholder="Şifrenizi onaylayın"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="register-button">Kayıt Ol</button>
          </form>
          <p className="redirect-message">
            Zaten hesabınız var mı? <Link to="/login">Giriş Yap</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
