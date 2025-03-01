import React, { useState, FormEvent, ChangeEvent } from 'react';
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

      console.log('Sending registration data:', registerData);

      // Backend'e POST isteği
      const response = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        credentials: "include",
        mode: "cors",
        body: JSON.stringify(registerData)
      });
  
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        console.error('Registration failed:', {
          status: response.status,
          statusText: response.statusText,
          errorData
        });
        throw new Error(
          errorData?.message || 
          `Kayıt işlemi başarısız (${response.status}). Lütfen tekrar deneyin.`
        );
      }

      const responseData = await response.json();
      console.log('Registration successful:', responseData);

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
    <div className="flex flex-col md:flex-row h-screen w-full">
      {/* Sol Taraf */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center bg-gradient-to-br from-gray-100 to-blue-100 p-6 md:p-10 text-center rounded-2xl md:ml-8 my-4 md:my-8">
        <img src="/soll.png" alt="Social Pet Logo" className="w-full max-w-md rounded-lg mt-4" />
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mt-4 mb-2">SocialPet Platformuna Hoş Geldiniz!</h1>
        <p className="text-lg text-gray-600">Dostlarınızı bulmak, paylaşmak ve daha fazlası için kaydolun.</p>
      </div>

      {/* Sağ Taraf */}
      <div className="w-full md:w-1/2 flex justify-center items-center bg-white p-4">
        <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg w-full max-w-md md:max-w-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Kayıt Ol</h2>
          
          {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
          {success && <p className="text-green-500 text-sm mb-4 text-center">{success}</p>}
          
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="text-left">
              <label className="block text-sm font-medium text-gray-600 mb-1">Ad</label>
              <input
                type="text"
                placeholder="Adınızı girin"
                value={name}
                onChange={(e) => handleInputChange(e, setName)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
              />
            </div>
            
            <div className="text-left">
              <label className="block text-sm font-medium text-gray-600 mb-1">Soyad</label>
              <input
                type="text"
                placeholder="Soyadınızı girin"
                value={surname}
                onChange={(e) => handleInputChange(e, setSurname)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
              />
            </div>
            
            <div className="text-left">
              <label className="block text-sm font-medium text-gray-600 mb-1">Kullanıcı Adı</label>
              <input
                type="text"
                placeholder="Kullanıcı adınızı girin"
                value={username}
                onChange={(e) => handleInputChange(e, setUsername)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
              />
            </div>
            
            <div className="text-left">
              <label className="block text-sm font-medium text-gray-600 mb-1">E-posta</label>
              <input
                type="email"
                placeholder="E-postanızı girin"
                value={email}
                onChange={(e) => handleInputChange(e, setEmail)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
              />
            </div>
            
            <div className="text-left">
              <label className="block text-sm font-medium text-gray-600 mb-1">Telefon Numarası</label>
              <input
                type="tel"
                placeholder="Telefon numaranızı girin"
                value={phone}
                onChange={(e) => handleInputChange(e, setPhone)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
              />
            </div>
            
            <div className="text-left">
              <label className="block text-sm font-medium text-gray-600 mb-1">Şifre</label>
              <input
                type="password"
                placeholder="Şifrenizi girin"
                value={password}
                onChange={(e) => handleInputChange(e, setPassword)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
              />
            </div>
            
            <div className="text-left">
              <label className="block text-sm font-medium text-gray-600 mb-1">Şifreyi Onayla</label>
              <input
                type="password"
                placeholder="Şifrenizi onaylayın"
                value={confirmPassword}
                onChange={(e) => handleInputChange(e, setConfirmPassword)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
              />
            </div>
            
            <button 
              type="submit" 
              className="w-full bg-gray-700 hover:bg-gray-800 text-white py-2 px-4 rounded-md transition duration-300 ease-in-out mt-4"
            >
              Kayıt Ol
            </button>
          </form>
          
          <p className="mt-6 text-center text-sm">
            Zaten hesabınız var mı? <Link to="/login" className="text-blue-500 hover:underline">Giriş Yap</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
