import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

interface User {
  id?: string;
  name?: string;
  email?: string;
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
        <div className="flex h-16">
          <div className="flex-shrink-0 flex items-center mr-3">
            <Link to="/" className="flex items-center">
              <img className="h-8 w-auto" src="/logo.png" alt="Social Pet Logo" />
            </Link>
          </div>

          <div className="hidden md:flex md:items-center md:space-x-3 whitespace-nowrap flex-grow">
            <Link to="/" className="text-gray-700 hover:text-purple-600 px-2 py-2 rounded-md text-sm font-medium transition-colors duration-200">Ana Sayfa</Link>
            <Link to="/adopt" className="text-gray-700 hover:text-purple-600 px-2 py-2 rounded-md text-sm font-medium transition-colors duration-200">Sahiplen</Link>
            <Link to="/vet-pet-shop" className="text-gray-700 hover:text-purple-600 px-2 py-2 rounded-md text-sm font-medium transition-colors duration-200">Veteriner & Petshop</Link>
            <Link to="/lost" className="text-gray-700 hover:text-purple-600 px-2 py-2 rounded-md text-sm font-medium transition-colors duration-200">Kayıp</Link>
            <Link to="/health-tracking" className="text-gray-700 hover:text-purple-600 px-2 py-2 rounded-md text-sm font-medium transition-colors duration-200">Sağlık Takibi</Link>
            <Link to="/breed-detector" className="text-gray-700 hover:text-purple-600 px-2 py-2 rounded-md text-sm font-medium transition-colors duration-200">Cins Dedektifi</Link>
            <Link to="/help-info" className="text-gray-700 hover:text-purple-600 px-2 py-2 rounded-md text-sm font-medium transition-colors duration-200">Yardım ve Bilgi</Link>
            <Link to="/donate" className="text-gray-700 hover:text-purple-600 px-2 py-2 rounded-md text-sm font-medium transition-colors duration-200">Bağış Yap</Link>
          </div>
          
          <div className="flex items-center md:hidden ml-auto">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-purple-600 hover:bg-gray-100 focus:outline-none transition-colors duration-200"
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

          <div className="hidden md:flex md:items-center ml-auto">
            {!user ? (
              <>
                <Link to="/login" className="text-gray-700 hover:text-purple-600 px-2 py-2 rounded-md text-sm font-medium transition-colors duration-200">Giriş / Kayıt Ol</Link>
                <Link to="/create-ad" className="bg-purple-600 text-white px-3 py-1.5 rounded-md text-xs font-medium hover:bg-purple-700 transition-colors duration-200 shadow-md ml-2">
                  Hemen İlan Ver
                </Link>
              </>
            ) : (
              <>
                <div className="relative group">
                  <Link to="/profile" className="flex items-center text-gray-700 hover:text-purple-600 px-2 py-2 rounded-md text-sm font-medium transition-colors duration-200">
                    {user.name || 'Profil'}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </Link>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
                    <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50">Profilim</Link>
                    <Link to="/my-ads" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50">İlanlarım</Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      Çıkış Yap
                    </button>
                  </div>
                </div>
                <Link to="/create-ad" className="bg-purple-600 text-white px-3 py-1.5 rounded-md text-xs font-medium hover:bg-purple-700 transition-colors duration-200 shadow-md ml-2">
                  Hemen İlan Ver
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden shadow-lg border-t`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white">
          <Link to="/" className="block text-gray-700 hover:text-purple-600 hover:bg-indigo-50 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200">Ana Sayfa</Link>
          <Link to="/adopt" className="block text-gray-700 hover:text-purple-600 hover:bg-indigo-50 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200">Sahiplen</Link>
          <Link to="/vet-pet-shop" className="block text-gray-700 hover:text-purple-600 hover:bg-indigo-50 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200">Veteriner & Petshop</Link>
          <Link to="/lost" className="block text-gray-700 hover:text-purple-600 hover:bg-indigo-50 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200">Kayıp</Link>
          <Link to="/health-tracking" className="block text-gray-700 hover:text-purple-600 hover:bg-indigo-50 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200">Sağlık Takibi</Link>
          <Link to="/breed-detector" className="block text-gray-700 hover:text-purple-600 hover:bg-indigo-50 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200">Cins Dedektifi</Link>
          <Link to="/help-info" className="block text-gray-700 hover:text-purple-600 hover:bg-indigo-50 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200">Yardım ve Bilgi</Link>
          <Link to="/donate" className="block text-gray-700 hover:text-purple-600 hover:bg-indigo-50 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200">Bağış Yap</Link>
          
          {!user ? (
            <>
              <Link to="/login" className="block text-gray-700 hover:text-purple-600 hover:bg-indigo-50 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200">Giriş / Kayıt Ol</Link>
              <Link to="/create-ad" className="block bg-purple-600 text-white px-4 py-2 rounded-md text-base font-medium hover:bg-purple-700 transition-colors duration-200 mt-2 shadow-md">
                Hemen İlan Ver
              </Link>
            </>
          ) : (
            <>
              <Link to="/profile" className="block text-gray-700 hover:text-purple-600 hover:bg-indigo-50 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200">Profilim</Link>
              <Link to="/my-ads" className="block text-gray-700 hover:text-purple-600 hover:bg-indigo-50 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200">İlanlarım</Link>
              <Link to="/create-ad" className="block bg-purple-600 text-white px-4 py-2 rounded-md text-base font-medium hover:bg-purple-700 transition-colors duration-200 mt-2 shadow-md">
                Hemen İlan Ver
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left bg-red-600 text-white px-4 py-2 rounded-md text-base font-medium hover:bg-red-700 transition-colors duration-200 mt-2 shadow-md"
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

