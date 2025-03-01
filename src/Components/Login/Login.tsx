// @ts-nocheck
import React, { useState, FormEvent } from 'react';
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
      const response = await axiosInstance.post<LoginResponse>("/api/auth/login", {
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
    <div className="flex flex-col md:flex-row h-screen w-full">
      {/* Sol Taraf */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center bg-gradient-to-br from-gray-100 to-blue-100 p-6 md:p-10 text-center rounded-2xl md:ml-8 my-4 md:my-8">
        <img src="/soll.png" alt="Social Pet Logo" className="w-full max-w-md rounded-lg mt-4" />
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mt-4 mb-2">SocialPet Platformuna Hoş Geldiniz!</h1>
        <p className="text-lg text-gray-600">Dostlarınızı bulmak, paylaşmak ve daha fazlası için giriş yapın.</p>
      </div>

      {/* Sağ Taraf */}
      <div className="w-full md:w-1/2 flex justify-center items-center bg-white p-4">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Giriş Yap</h2>
          
          {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
          {success && <p className="text-green-500 text-sm mb-4 text-center">{success}</p>}
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="text-left">
              <label className="block text-sm font-medium text-gray-600 mb-1">E-posta</label>
              <input
                type="email"
                placeholder="E-postanızı girin"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
              />
            </div>
            
            <button 
              type="submit" 
              className="w-full bg-gray-700 hover:bg-gray-800 text-white py-2 px-4 rounded-md transition duration-300 ease-in-out"
            >
              Giriş Yap
            </button>
          </form>
          
          <p className="mt-6 text-center text-sm">
            Hesabınız yok mu? <a href="/register" className="text-blue-500 hover:underline">Kayıt Ol</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
