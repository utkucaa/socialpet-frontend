import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';

const Login = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Lütfen tüm alanları doldurun!');
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/v1/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      });

      if (!response.ok) {
        throw new Error('E-posta veya şifre yanlış!');
      }

      const data = await response.json();
      setSuccess('Başarıyla giriş yapıldı!');
      setError('');

      // Kullanıcı bilgilerini setUser ile güncelle
      setUser(data.user); // Örneğin, kullanıcı verisi içinde "name" olabilir.

      // Giriş başarılıysa kullanıcıyı profile sayfasına yönlendir
      setTimeout(() => navigate("/profile"), 2000);

    } catch (error) {
      setError(error.message); // Hata mesajını göster
      setSuccess('');
    }
  };

  return (
    <div className="login-page">
      <div className="login-left">
        <img src="/soll.png" alt="Social Pet Logo" className="login-logo" />
        <h1>SocialPet Platformuna Hoş Geldiniz!</h1>
        <p>Dostlarınızı bulmak, paylaşmak ve daha fazlası için giriş yapın.</p>
      </div>

      <div className="login-right">
        <div className="login-box">
          <h2>Giriş Yap</h2>
          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}
          <form onSubmit={handleLogin}>
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
              <label>Şifre</label>
              <input
                type="password"
                placeholder="Şifrenizi girin"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="login-button">Giriş Yap</button>
          </form>
          <p className="redirect-message">
            Hesabınız yok mu? <a href="/register">Kayıt Ol</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

