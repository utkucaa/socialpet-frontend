import React, { useState, useEffect, ChangeEvent } from 'react';
import './ProfilePage.css';
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
    <div className={`profile-container ${isDarkMode ? 'dark-mode' : ''}`}>
      {/* Profile Header Card */}
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-avatar-container">
            <div className="profile-avatar">
              <img src={avatar} alt="Profile" />
              <div className="avatar-overlay">
                <div className="edit-icon-container">
                  <FiEdit2 size={24} />
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="avatar-input"
                />
              </div>
            </div>
          </div>
          <div className="profile-info">
            <h1>{userInfo.name}</h1>
            <p className="profile-bio">{userData?.bio}</p>
            <div className="profile-meta">
              <span><FiCalendar /> Üyelik: {userStats.membershipDate}</span>
            </div>
          </div>
          <div className="profile-actions">
            <button className="btn btn-edit">
              <FiEdit2 /> Profil Düzenle
            </button>
            <button className="btn btn-logout" onClick={handleLogout}>
              <FiLogOut /> Çıkış Yap
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-section">
        <div className="stat-card">
          <div className="stat-icon"><FaPaw /></div>
          <div className="stat-content">
            <h3>Toplam İlan</h3>
            <span className="stat-value">{userStats.totalAds}</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon"><FiHeart /></div>
          <div className="stat-content">
            <h3>Aktif İlanlar</h3>
            <span className="stat-value">{userStats.activeAds}</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon"><FiEye /></div>
          <div className="stat-content">
            <h3>Görüntülenme</h3>
            <span className="stat-value">{userStats.views}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-container">
        {/* Sidebar */}
        <div className="sidebar">
          <h3>Menü</h3>
          <ul className="sidebar-menu">
            <li 
              className={activeTab === 'pets' ? 'active' : ''} 
              onClick={() => setActiveTab('pets')}
            >
              <FaPaw /> Evcil Hayvanlarım
            </li>
            <li 
              className={activeTab === 'ads' ? 'active' : ''} 
              onClick={() => setActiveTab('ads')}
            >
              <FiFileText /> İlanlarım
            </li>
            <li 
              className={activeTab === 'messages' ? 'active' : ''} 
              onClick={() => setActiveTab('messages')}
            >
              <FiMessageCircle /> Mesajlarım
            </li>
            <li 
              className={activeTab === 'notifications' ? 'active' : ''} 
              onClick={() => setActiveTab('notifications')}
            >
              <FiBell /> Bildirimlerim
            </li>
          </ul>
          
          <div className="sidebar-footer">
            <button className="btn btn-add sidebar-add-btn">
              <FiPlus /> Yeni İlan Ekle
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="content-area">
          {activeTab === 'pets' && (
            <div className="pets-content">
              <div className="section-header">
                <h2>Evcil Hayvanlarım</h2>
                <button className="btn btn-add">
                  <FiPlus /> Yeni Evcil Hayvan Ekle
                </button>
              </div>
              
              <div className="pets-grid">
                {pets.map(pet => (
                  <div className="pet-card" key={pet.id}>
                    <div className="pet-image">
                      <img src={pet.imageUrl} alt={pet.name} />
                    </div>
                    <div className="pet-info">
                      <h3>{pet.name}</h3>
                      <p>{pet.type} • {pet.breed}</p>
                      <p>{pet.age} yaşında</p>
                    </div>
                    <div className="pet-actions">
                      <button className="btn-icon">
                        <FiEdit2 />
                      </button>
                    </div>
                  </div>
                ))}
                
                <div className="pet-card add-pet">
                  <div className="add-pet-content">
                    <div className="add-icon-container">
                      <FiPlus size={32} />
                    </div>
                    <p>Yeni Evcil Hayvan Ekle</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'ads' && (
            <div className="ads-section">
              <div className="ads-header">
                <h2>İlanlarım</h2>
                <button className="btn-primary">
                  <FiPlus size={18} /> Yeni İlan Ekle
                </button>
              </div>
              
              <div className="filter-container">
                <div className="filter-group">
                  <h4>Kategori</h4>
                  <div className="ads-filter">
                    <button 
                      className={`filter-btn ${adsFilter.category === 'all' ? 'active' : ''}`}
                      onClick={() => setAdsFilter({ ...adsFilter, category: 'all' })}
                    >
                      Tüm Kategoriler
                    </button>
                    <button 
                      className={`filter-btn ${adsFilter.category === 'sahiplendirme' ? 'active' : ''}`}
                      onClick={() => setAdsFilter({ ...adsFilter, category: 'sahiplendirme' })}
                    >
                      Sahiplendirme
                    </button>
                    <button 
                      className={`filter-btn ${adsFilter.category === 'kayıp' ? 'active' : ''}`}
                      onClick={() => setAdsFilter({ ...adsFilter, category: 'kayıp' })}
                    >
                      Kayıp İlanları
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="ads-grid">
                {filteredAds.length > 0 ? (
                  <>
                    {filteredAds.map(ad => (
                      <div key={ad.id} className="ad-card">
                        <img src={ad.imageUrl} alt={ad.title} className="ad-image" />
                        <div className="ad-content">
                          <div className="ad-category-badge" data-category={ad.category}>
                            {ad.category === 'sahiplendirme' ? 'Sahiplendirme' : 'Kayıp İlanı'}
                          </div>
                          <h3 className="ad-title">{ad.title}</h3>
                          <div className="ad-info">
                            <div className="ad-info-item">
                              <FiMapPin size={16} />
                              {ad.location}
                            </div>
                            <div className="ad-info-item">
                              <FiTag size={16} />
                              {ad.petType}
                            </div>
                            <div className="ad-info-item">
                              <FiCalendar size={16} />
                              {ad.date}
                            </div>
                          </div>
                          <p className="ad-description">{ad.description}</p>
                          <div className="ad-footer">
                            <div className="ad-edit-btn">
                              <FiEdit2 size={18} />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    <div className="add-ad-card">
                      <div className="add-ad-icon">
                        <FiPlus size={24} />
                      </div>
                      <span className="add-ad-text">Yeni İlan Ekle</span>
                      <div className="add-ad-categories">
                        <button className="add-category-btn">
                          <span>Sahiplendirme İlanı</span>
                        </button>
                        <button className="add-category-btn">
                          <span>Kayıp İlanı</span>
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="empty-state">
                    <div className="empty-icon">
                      <FiFileText size={32} />
                    </div>
                    <h3>Henüz İlanınız Bulunmuyor</h3>
                    <p>İlk ilanınızı eklemek için "Yeni İlan Ekle" butonuna tıklayın.</p>
                    <button className="btn-primary">
                      <FiPlus size={18} /> Yeni İlan Ekle
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'messages' && (
            <div className="messages-content">
              <h2>Mesajlarım</h2>
              <div className="empty-state">
                <div className="empty-icon-container">
                  <FiMessageCircle size={48} />
                </div>
                <p>Henüz mesajınız bulunmamaktadır.</p>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="notifications-content">
              <h2>Bildirimlerim</h2>
              <div className="empty-state">
                <div className="empty-icon-container">
                  <FiBell size={48} />
                </div>
                <p>Henüz bildiriminiz bulunmamaktadır.</p>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Footer */}
      <div className="profile-footer">
        <div className="footer-links">
          <a href="#" className="footer-link">Hakkımızda</a>
          <a href="#" className="footer-link">Gizlilik Politikası</a>
          <a href="#" className="footer-link">Kullanım Koşulları</a>
          <a href="#" className="footer-link">Yardım</a>
          <a href="#" className="footer-link">İletişim</a>
        </div>
        <div className="footer-copyright">
          © {new Date().getFullYear()} SocialPet. Tüm hakları saklıdır.
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;