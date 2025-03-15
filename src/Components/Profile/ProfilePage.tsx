import React, { useState, useEffect, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiEdit2, FiPlus, FiMessageCircle, FiBell, FiUser, FiLogOut, FiHeart, FiEye, FiCalendar, FiFileText, FiMapPin, FiTag } from 'react-icons/fi';
import { FaPaw } from 'react-icons/fa';

import moment from 'moment'
import 'moment/locale/tr'  
import axiosInstance from '../../services/axios';
moment.locale('tr')

interface UserData {
  firstName: string;
  lastName: string;
  avatar?: string;
  joinDate: string;
  bio?: string;
  [key: string]: any; // For other potential properties
}

interface UserStats {
  totalAds: number;
  activeAds: number;
  views: number;
  membershipDate: string;
}

interface UserInfo {
  name: string;
}

interface ProfilePictureResponse {
  data: string;
}

interface Pet {
  id: string;
  name: string;
  type: string;
  breed?: string;
  age: number;
  imageUrl: string;
}

interface Ad {
  id: string;
  title: string;
  description: string;
  petType: string;
  location: string;
  date: string;
  status: 'active' | 'inactive';
  category: 'kayıp' | 'sahiplendirme';
  imageUrl: string;
}

const ProfilePage: React.FC = () => {
  const [avatar, setAvatar] = useState<string>('/avatar.png');
  const [userData, setUserData] = useState<UserData | null>(null);
  const [activeTab, setActiveTab] = useState<string>('pets');
  const [pets, setPets] = useState<Pet[]>([]);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [ads, setAds] = useState<Ad[]>([]);
  const [adsFilter, setAdsFilter] = useState({
    status: 'all',
    category: 'all'
  });
  const navigate = useNavigate();

  // Mock pet data - in a real app, this would come from an API
  useEffect(() => {
    // Simulating pet data fetch
    const mockPets: Pet[] = [
      {
        id: '1',
        name: 'Buddy',
        type: 'Köpek',
        breed: 'Golden Retriever',
        age: 3,
        imageUrl: 'https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZG9nfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60'
      },
      {
        id: '2',
        name: 'Whiskers',
        type: 'Kedi',
        breed: 'British Shorthair',
        age: 2,
        imageUrl: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2F0fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60'
      }
    ];
    setPets(mockPets);
  }, []);

  useEffect(() => {
    const storedUserData = localStorage.getItem('user');
    if (storedUserData) {
      const _userData: UserData = JSON.parse(storedUserData);
      // Add a mock bio if not present
      if (!_userData.bio) {
        _userData.bio = 'Hayvan sever ve doğa tutkunu. İki köpek ve bir kedi sahibiyim. Onlarla vakit geçirmekten keyif alıyorum.';
      }
      setUserData(_userData);
      if (_userData.avatar) {
        setAvatar("http://localhost:8080" + _userData.avatar);
      }
    }
  }, []);

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>): Promise<void> => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const formData = new FormData();
        formData.append('file', file);

        const response = await axiosInstance.post<ProfilePictureResponse>('/v1/users/profile-picture', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        const imageUrl = URL.createObjectURL(file);
        setAvatar(imageUrl);

        // Update user data in localStorage with new avatar
        const storedUserData = localStorage.getItem('user');
        if (storedUserData) {
          const userData: UserData = JSON.parse(storedUserData);
          userData.avatar = response.data.data;
          localStorage.setItem('user', JSON.stringify(userData));
        }
      } catch (error) {
        console.error('Error uploading profile picture:', error);
      }
    }
  };

  const userStats: UserStats = {
    totalAds: 5,
    activeAds: 2,
    views: 120,
    membershipDate: moment(userData?.joinDate).format('LL')
  };

  const userInfo: UserInfo = {
    name: userData ? `${userData.firstName} ${userData.lastName}` : ''
  };

  const handleLogout = (): void => {
    localStorage.removeItem('user');
    navigate('/');
  };

  const toggleDarkMode = (): void => {
    setIsDarkMode(!isDarkMode);
    // In a real app, you would apply dark mode classes to the body or a container
  };

  // Mock ads data
  useEffect(() => {
    // Simulating ads data fetch
    const mockAds: Ad[] = [
      {
        id: '1',
        title: 'Golden Retriever Yavruları',
        description: 'Sağlıklı ve sevimli Golden Retriever yavruları sahiplendirme ilanı.',
        petType: 'Köpek',
        location: 'İstanbul',
        date: '2023-10-15',
        status: 'active',
        category: 'sahiplendirme',
        imageUrl: 'https://images.unsplash.com/photo-1601979031925-424e53b6caaa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHVwcHl8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60'
      },
      {
        id: '2',
        title: 'British Shorthair Kedi Sahiplendirme',
        description: 'Ev ortamına alışık, 1 yaşında British Shorthair kedi sahiplendirme ilanı.',
        petType: 'Kedi',
        location: 'Ankara',
        date: '2023-09-28',
        status: 'active',
        category: 'sahiplendirme',
        imageUrl: 'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2F0JTIwYnJpdGlzaHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60'
      },
      {
        id: '3',
        title: 'Kayıp Köpek İlanı',
        description: 'Kadıköy bölgesinde kaybolan Beagle cinsi köpek. Bulan veya gören olursa lütfen iletişime geçin.',
        petType: 'Köpek',
        location: 'İstanbul',
        date: '2023-10-20',
        status: 'inactive',
        category: 'kayıp',
        imageUrl: 'https://images.unsplash.com/photo-1505628346881-b72b27e84530?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YmVhZ2xlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60'
      }
    ];
    setAds(mockAds);
  }, []);

  // Filter ads based on selected filters
  const filteredAds = ads.filter(ad => {
    // Filter by category only
    if (adsFilter.category !== 'all' && ad.category !== adsFilter.category) {
      return false;
    }
    
    return true;
  });

  return (
    <div className={`p-5 max-w-7xl mx-auto font-sans text-gray-700 bg-gray-50 ${isDarkMode ? 'bg-gray-800 text-gray-100' : ''}`}>
      {/* Profile Header Card */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
        <div className="p-6 flex items-start gap-6 relative">
          <div className="relative">
            <div className="w-30 h-30 rounded-full overflow-hidden relative border-3 border-purple-600 shadow-sm">
              <img src={avatar} alt="Profile" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex justify-center items-center opacity-0 hover:opacity-100 transition-opacity duration-200 cursor-pointer">
                <div className="text-white text-2xl">
                  <FiEdit2 size={24} />
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="absolute inset-0 opacity-0 cursor-pointer z-10"
                />
              </div>
            </div>
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-semibold text-gray-700 mb-2">{userInfo.name}</h1>
            <p className="text-base text-gray-500 mb-4 leading-relaxed">{userData?.bio}</p>
            <div className="flex gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1"><FiCalendar /> Üyelik: {userStats.membershipDate}</span>
            </div>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 py-2 px-4 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
              <FiEdit2 /> Profil Düzenle
            </button>
            <button 
              className="flex items-center gap-2 py-2 px-4 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-400 hover:text-white transition-colors"
              onClick={handleLogout}
            >
              <FiLogOut /> Çıkış Yap
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-5 mb-6">
        <div className="bg-white rounded-xl p-5 flex items-center gap-4 shadow-sm hover:translate-y-[-2px] hover:shadow-md transition-all">
          <div className="w-12 h-12 rounded-full bg-purple-500 text-white flex items-center justify-center text-2xl">
            <FaPaw />
          </div>
          <div className="flex-1">
            <h3 className="text-sm text-gray-500 mb-1">Toplam İlan</h3>
            <span className="text-2xl font-semibold text-gray-700">{userStats.totalAds}</span>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 flex items-center gap-4 shadow-sm hover:translate-y-[-2px] hover:shadow-md transition-all">
          <div className="w-12 h-12 rounded-full bg-purple-500 text-white flex items-center justify-center text-2xl">
            <FiHeart />
          </div>
          <div className="flex-1">
            <h3 className="text-sm text-gray-500 mb-1">Aktif İlanlar</h3>
            <span className="text-2xl font-semibold text-gray-700">{userStats.activeAds}</span>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 flex items-center gap-4 shadow-sm hover:translate-y-[-2px] hover:shadow-md transition-all">
          <div className="w-12 h-12 rounded-full bg-purple-500 text-white flex items-center justify-center text-2xl">
            <FiEye />
          </div>
          <div className="flex-1">
            <h3 className="text-sm text-gray-500 mb-1">Görüntülenme</h3>
            <span className="text-2xl font-semibold text-gray-700">{userStats.views}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex gap-6 relative mt-6">
        {/* Sidebar */}
        <div className="w-60 bg-white rounded-xl p-5 shadow-sm sticky top-5 h-fit flex flex-col self-start">
          <h3 className="text-base text-gray-700 mb-5 pb-2 border-b border-gray-200 relative">
            Menü
            <span className="absolute bottom-[-1px] left-0 w-10 h-[3px] bg-purple-600 rounded-sm"></span>
          </h3>
          <ul className="list-none p-0 m-0 mb-5">
            <li 
              className={`flex items-center gap-2 py-3 px-4 mb-2 rounded-lg cursor-pointer transition-all font-medium ${activeTab === 'pets' ? 'bg-purple-600 text-white' : 'hover:bg-gray-100'}`}
              onClick={() => setActiveTab('pets')}
            >
              <FaPaw /> Evcil Hayvanlarım
            </li>
            <li 
              className={`flex items-center gap-2 py-3 px-4 mb-2 rounded-lg cursor-pointer transition-all font-medium ${activeTab === 'ads' ? 'bg-purple-600 text-white' : 'hover:bg-gray-100'}`}
              onClick={() => setActiveTab('ads')}
            >
              <FiFileText /> İlanlarım
            </li>
            <li 
              className={`flex items-center gap-2 py-3 px-4 mb-2 rounded-lg cursor-pointer transition-all font-medium ${activeTab === 'messages' ? 'bg-purple-600 text-white' : 'hover:bg-gray-100'}`}
              onClick={() => setActiveTab('messages')}
            >
              <FiMessageCircle /> Mesajlarım
            </li>
            <li 
              className={`flex items-center gap-2 py-3 px-4 mb-2 rounded-lg cursor-pointer transition-all font-medium ${activeTab === 'notifications' ? 'bg-purple-600 text-white' : 'hover:bg-gray-100'}`}
              onClick={() => setActiveTab('notifications')}
            >
              <FiBell /> Bildirimlerim
            </li>
          </ul>
          
          <div className="mt-auto pt-5 border-t border-gray-200">
            <button className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors">
              <FiPlus /> Yeni İlan Ekle
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 bg-white rounded-xl p-6 shadow-sm min-h-[600px]">
          {activeTab === 'pets' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl text-gray-700 m-0">Evcil Hayvanlarım</h2>
                <button className="flex items-center gap-2 py-2 px-4 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors">
                  <FiPlus /> Yeni Evcil Hayvan Ekle
                </button>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {pets.map(pet => (
                  <div className="bg-white rounded-xl overflow-hidden shadow-sm transition-all hover:translate-y-[-2px] hover:shadow-md border border-gray-200" key={pet.id}>
                    <div className="h-40 overflow-hidden">
                      <img src={pet.imageUrl} alt={pet.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg text-gray-700 m-0 mb-2">{pet.name}</h3>
                      <p className="text-sm text-gray-500 m-0 mb-1">{pet.type} • {pet.breed}</p>
                      <p className="text-sm text-gray-500 m-0">{pet.age} yaşında</p>
                    </div>
                    <div className="px-4 pb-4 flex justify-end">
                      <button className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-100 text-gray-500 border-none cursor-pointer transition-all hover:bg-purple-500 hover:text-white">
                        <FiEdit2 />
                      </button>
                    </div>
                  </div>
                ))}
                
                <div className="border-2 border-dashed border-gray-200 flex items-center justify-center cursor-pointer bg-gray-50 min-h-[240px] rounded-xl hover:border-purple-600">
                  <div className="flex flex-col items-center gap-3 text-gray-500">
                    <div>
                      <FiPlus size={32} />
                    </div>
                    <p>Yeni Evcil Hayvan Ekle</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'ads' && (
            <div className="mt-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl text-gray-700 m-0">İlanlarım</h2>
                <button className="flex items-center gap-2 py-2 px-4 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors">
                  <FiPlus size={18} /> Yeni İlan Ekle
                </button>
              </div>
              
              <div className="mb-6">
                <div className="mb-4">
                  <h4 className="text-sm text-gray-500 m-0 mb-2 font-medium">Kategori</h4>
                  <div className="flex gap-3 flex-wrap">
                    <button 
                      className={`py-2 px-4 rounded-full text-sm ${adsFilter.category === 'all' ? 'bg-purple-600 text-white' : 'bg-gray-100 border border-gray-200 text-gray-600 hover:bg-gray-200'}`}
                      onClick={() => setAdsFilter({ ...adsFilter, category: 'all' })}
                    >
                      Tüm Kategoriler
                    </button>
                    <button 
                      className={`py-2 px-4 rounded-full text-sm ${adsFilter.category === 'sahiplendirme' ? 'bg-purple-600 text-white' : 'bg-gray-100 border border-gray-200 text-gray-600 hover:bg-gray-200'}`}
                      onClick={() => setAdsFilter({ ...adsFilter, category: 'sahiplendirme' })}
                    >
                      Sahiplendirme
                    </button>
                    <button 
                      className={`py-2 px-4 rounded-full text-sm ${adsFilter.category === 'kayıp' ? 'bg-purple-600 text-white' : 'bg-gray-100 border border-gray-200 text-gray-600 hover:bg-gray-200'}`}
                      onClick={() => setAdsFilter({ ...adsFilter, category: 'kayıp' })}
                    >
                      Kayıp İlanları
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredAds.length > 0 ? (
                  <>
                    {filteredAds.map(ad => (
                      <div key={ad.id} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200">
                        <img src={ad.imageUrl} alt={ad.title} className="w-full h-40 object-cover" />
                        <div className="p-4">
                          <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-2 ${ad.category === 'sahiplendirme' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                            {ad.category === 'sahiplendirme' ? 'Sahiplendirme' : 'Kayıp İlanı'}
                          </div>
                          <h3 className="text-lg font-medium text-gray-800 mb-2">{ad.title}</h3>
                          <div className="flex flex-wrap gap-3 text-sm text-gray-500 mb-3">
                            <div className="flex items-center gap-1">
                              <FiMapPin size={16} />
                              {ad.location}
                            </div>
                            <div className="flex items-center gap-1">
                              <FiTag size={16} />
                              {ad.petType}
                            </div>
                            <div className="flex items-center gap-1">
                              <FiCalendar size={16} />
                              {ad.date}
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 mb-4 line-clamp-2">{ad.description}</p>
                          <div className="flex justify-end">
                            <button className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-100 text-gray-500 hover:bg-purple-500 hover:text-white transition-colors">
                              <FiEdit2 size={18} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    <div className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col items-center justify-center gap-3 hover:shadow-md transition-all">
                      <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                        <FiPlus size={24} />
                      </div>
                      <span className="text-gray-600 font-medium">Yeni İlan Ekle</span>
                      <div className="flex flex-col gap-2 w-full mt-2">
                        <button className="w-full py-2 px-4 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors">
                          <span>Sahiplendirme İlanı</span>
                        </button>
                        <button className="w-full py-2 px-4 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors">
                          <span>Kayıp İlanı</span>
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="col-span-3 flex flex-col items-center justify-center py-12 text-center">
                    <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 mb-4">
                      <FiFileText size={32} />
                    </div>
                    <h3 className="text-lg font-medium text-gray-700 mb-2">Henüz İlanınız Bulunmuyor</h3>
                    <p className="text-gray-500 mb-4">İlk ilanınızı eklemek için "Yeni İlan Ekle" butonuna tıklayın.</p>
                    <button className="flex items-center gap-2 py-2 px-4 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors">
                      <FiPlus size={18} /> Yeni İlan Ekle
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'messages' && (
            <div>
              <h2 className="text-xl text-gray-700 m-0 mb-6">Mesajlarım</h2>
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 mb-4">
                  <FiMessageCircle size={48} />
                </div>
                <p className="text-gray-500">Henüz mesajınız bulunmamaktadır.</p>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div>
              <h2 className="text-xl text-gray-700 m-0 mb-6">Bildirimlerim</h2>
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 mb-4">
                  <FiBell size={48} />
                </div>
                <p className="text-gray-500">Henüz bildiriminiz bulunmamaktadır.</p>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Footer */}
      <div className="mt-12 pt-6 border-t border-gray-200">
        <div className="flex flex-wrap gap-4 justify-center mb-3">
          <a href="#" className="text-gray-500 hover:text-purple-600 transition-colors">Hakkımızda</a>
          <a href="#" className="text-gray-500 hover:text-purple-600 transition-colors">Gizlilik Politikası</a>
          <a href="#" className="text-gray-500 hover:text-purple-600 transition-colors">Kullanım Koşulları</a>
          <a href="#" className="text-gray-500 hover:text-purple-600 transition-colors">Yardım</a>
          <a href="#" className="text-gray-500 hover:text-purple-600 transition-colors">İletişim</a>
        </div>
        <div className="text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} SocialPet. Tüm hakları saklıdır.
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;