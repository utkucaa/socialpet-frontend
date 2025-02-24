import React, { useState, FormEvent, ChangeEvent } from 'react';
import './Register.css';
import { Link, useNavigate } from 'react-router-dom';

interface RegisterData {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
}

const Register: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [surname, setSurname] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  const navigate = useNavigate();

  const handleRegister = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
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
  
    try {
      const registerData: RegisterData = {
        firstName: name,
        lastName: surname,
        userName: username,
        email: email,
        phoneNumber: phone,
        password: password,
        confirmPassword: confirmPassword
      };

      // Backend'e POST isteği
      const response = await fetch("http://localhost:8080/api/v1/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(registerData)
      });
  
      if (!response.ok) {
        throw new Error('Kayıt işlemi başarısız. Lütfen tekrar deneyin.');
      }

      setSuccess('Kayıt işlemi başarılı!');
      setError('');
  
      // 2 saniye sonra giriş sayfasına yönlendirme
      setTimeout(() => navigate("/login"), 2000);
    } catch (error: any) {
      setError(error.message);
      setSuccess('');
    }
  };
  
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>, setter: (value: string) => void): void => {
    setter(e.target.value);
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
                onChange={(e) => handleInputChange(e, setName)}
                required
              />
            </div>
            <div className="form-group">
              <label>Soyad</label>
              <input
                type="text"
                placeholder="Soyadınızı girin"
                value={surname}
                onChange={(e) => handleInputChange(e, setSurname)}
                required
              />
            </div>
            <div className="form-group">
              <label>Kullanıcı Adı</label>
              <input
                type="text"
                placeholder="Kullanıcı adınızı girin"
                value={username}
                onChange={(e) => handleInputChange(e, setUsername)}
                required
              />
            </div>
            <div className="form-group">
              <label>E-posta</label>
              <input
                type="email"
                placeholder="E-postanızı girin"
                value={email}
                onChange={(e) => handleInputChange(e, setEmail)}
                required
              />
            </div>
            <div className="form-group">
              <label>Telefon Numarası</label>
              <input
                type="tel"
                placeholder="Telefon numaranızı girin"
                value={phone}
                onChange={(e) => handleInputChange(e, setPhone)}
                required
              />
            </div>
            <div className="form-group">
              <label>Şifre</label>
              <input
                type="password"
                placeholder="Şifrenizi girin"
                value={password}
                onChange={(e) => handleInputChange(e, setPassword)}
                required
              />
            </div>
            <div className="form-group">
              <label>Şifreyi Onayla</label>
              <input
                type="password"
                placeholder="Şifrenizi onaylayın"
                value={confirmPassword}
                onChange={(e) => handleInputChange(e, setConfirmPassword)}
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
