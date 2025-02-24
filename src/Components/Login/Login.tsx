// @ts-nocheck
import React, { useState, FormEvent } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../services/axios';

interface LoginResponse {
  accessToken: string;
  userId: string;
  email: string;
  joinDate: string;
  username: string;
  firstName: string;
  lastName: string;
  avatarUrl: string;
}

interface UserData {
  id: string;
  email: string;
  joinDate: string;
  username: string;
  firstName: string;
  lastName: string;
  avatar: string;
}

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  const navigate = useNavigate();

  const handleLogin = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (!email || !password) {
      setError('Lütfen tüm alanları doldurun!');
      return;
    }

    try {
      const response = await axiosInstance.post<LoginResponse>("/auth/login", {
        email,
        password
      });

      const { accessToken, userId, email: userEmail, joinDate, username, firstName, lastName, avatarUrl } = response.data;
      
      // JWT token'ı localStorage'a kaydet
      localStorage.setItem('token', accessToken);
      
      // Kullanıcı bilgilerini localStorage'a kaydet
      const userData: UserData = {
        id: userId,
        email: userEmail,
        joinDate,
        username,
        firstName,
        lastName,
        avatar: avatarUrl
      };
      
      localStorage.setItem('user', JSON.stringify(userData));

      setSuccess('Başarıyla giriş yapıldı!');
      setError('');

      // Giriş başarılıysa kullanıcıyı profile sayfasına yönlendir
      setTimeout(() => navigate("/profile"), 2000);

    } catch (error: any) {
      console.log(error);
      setError(error.response?.data?.message || 'Giriş yapılırken bir hata oluştu'); 
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
