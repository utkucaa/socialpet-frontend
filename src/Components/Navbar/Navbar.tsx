// @ts-nocheck
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface User {
  // Add user properties based on your actual user type
  id?: string;
  name?: string;
  email?: string;
  // Add other user properties as needed
}

interface NavbarProps {
  user: User | null;
  setUser: (user: User | null) => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, setUser }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  
  const handleLogout = (): void => {
    setUser(null);
  };

  return (
    <nav className="bg-white shadow-lg z-10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/">
              <img className="h-8 w-auto" src="/logo.png" alt="Social Pet Logo" />
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
            >
              <svg
                className={`${isOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg
                className={`${isOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <Link to="/" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Ana Sayfa</Link>
            <Link to="/adopt" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Sahiplen</Link>
            <Link to="/lost" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Kayıp</Link>
            <Link to="/health-tracking" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Sağlık Takibi</Link>
            <Link to="/breed-detector" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Cins Dedektifi</Link>
            <Link to="/help-info" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Yardım ve Bilgi</Link>
            <Link to="/donate" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Bağış Yap</Link>
            
            {!user ? (
              <>
                <Link to="/login" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Giriş / Kayıt Ol</Link>
                <Link to="/create-ad" className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700">
                  Hemen İlan Ver
                </Link>
              </>
            ) : (
              <>
                <Link to="/pets" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Hayvanlarım</Link>
                <Link to="/profile" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Profil</Link>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700"
                >
                  Çıkış Yap
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link to="/" className="block text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-base font-medium">Ana Sayfa</Link>
          <Link to="/adopt" className="block text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-base font-medium">Sahiplen</Link>
          <Link to="/lost" className="block text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-base font-medium">Kayıp</Link>
          <Link to="/health-tracking" className="block text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-base font-medium">Sağlık Takibi</Link>
          <Link to="/breed-detector" className="block text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-base font-medium">Cins Dedektifi</Link>
          <Link to="/help-info" className="block text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-base font-medium">Yardım ve Bilgi</Link>
          <Link to="/donate" className="block text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-base font-medium">Bağış Yap</Link>
          
          {!user ? (
            <>
              <Link to="/login" className="block text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-base font-medium">Giriş / Kayıt Ol</Link>
              <Link to="/create-ad" className="block bg-blue-600 text-white px-4 py-2 rounded-md text-base font-medium hover:bg-blue-700">
                Hemen İlan Ver
              </Link>
            </>
          ) : (
            <>
              <Link to="/pets" className="block text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-base font-medium">Hayvanlarım</Link>
              <Link to="/profile" className="block text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-base font-medium">Profil</Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left bg-red-600 text-white px-4 py-2 rounded-md text-base font-medium hover:bg-red-700"
              >
                Çıkış Yap
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

