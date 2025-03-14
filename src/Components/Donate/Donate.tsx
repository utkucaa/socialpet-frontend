import React, { useState, useEffect } from 'react';
import './Donate.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faUniversity, faGlobe, faMapMarkerAlt, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { faInstagram, faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons';
import adminService, { DonationOrganization } from '../../services/adminService';

const Donate: React.FC = () => {
  const [organizations, setOrganizations] = useState<DonationOrganization[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Force reload the page when coming from the admin section
    const fromAdmin = document.referrer.includes('/admin/');
    if (fromAdmin) {
      // Clear browser cache for this page
      window.location.reload();
    }
    
    fetchOrganizations();
    
    // Add a timestamp parameter to force cache refresh for all images
    const timestamp = new Date().getTime();
    document.querySelectorAll('img').forEach(img => {
      if (img.src.includes('/api/')) {
        img.src = `${img.src}?t=${timestamp}`;
      }
    });
  }, []);

  const fetchOrganizations = async () => {
    try {
      setLoading(true);
      
      // Add a cache-busting parameter to the request
      const timestamp = new Date().getTime();
      const data = await adminService.getActiveDonationOrganizations();
      
      // Add timestamp to image URLs to prevent caching
      const processedData = data.map(org => ({
        ...org,
        imageUrl: org.imageUrl ? `${org.imageUrl}?t=${timestamp}` : org.imageUrl
      }));
      
      setOrganizations(processedData);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Bağış kurumları yüklenirken bir hata oluştu');
      console.error('Error fetching donation organizations:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main-container">
      {/* Üst Kısım - Resimli Alan */}
      <div className="hero-section">
        <nav className="nav-menu">
          <ul>
            <li>•Barınaklara Bağış</li>
            <li>•Veteriner Klinikleri</li>
            <li>•PetShop</li>
            <li>•Yardım ve Bilgi</li>
            <li>•Fotoğraf Yarışması</li>
          </ul>
        </nav>
        <div className="hero-content">
          <div className="title-box">
            <h1>Barınaklara Bağış</h1>
          </div>
          <div className="subtitle-box">
            <h2>Bağışınızla Umut Işığı Olun!</h2>
          </div>
          <div className="select-container">
            
          </div>
        </div>
      </div>

      {/* Alt Kısım - Bilgilendirme ve Kartlar */}
      <div className="content-section">
        <div className="info-section">
          <h2>BAĞIŞ ALAN KURUMLAR</h2>
        </div>
        
        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Bağış kurumları yükleniyor...</p>
          </div>
        ) : error ? (
          <div className="error-container">
            <p>{error}</p>
          </div>
        ) : organizations.length === 0 ? (
          <div className="empty-container">
            <p>Henüz bağış kurumu bulunmamaktadır.</p>
          </div>
        ) : (
          <div className="donation-cards-container">
            {organizations.map((org) => (
              <div key={org.id} className="donation-card">
                <h3 className="card-title">{org.name}</h3>
                <div className="card-image">
                  {org.imageUrl ? (
                    <img src={org.imageUrl} alt={org.name} />
                  ) : (
                    <div className="no-image">Resim Yok</div>
                  )}
                </div>
                <div className="card-info">
                  <p><FontAwesomeIcon icon={faPhone} /> {org.phoneNumber}</p>
                  <p><FontAwesomeIcon icon={faUniversity} /> {org.iban}</p>
                  
                  {org.address && (
                    <p className="address-info">
                      <FontAwesomeIcon icon={faMapMarkerAlt} /> <strong>Adres:</strong> {org.address}
                    </p>
                  )}
                  
                  {org.description && (
                    <p className="description-info">
                      <FontAwesomeIcon icon={faInfoCircle} /> <strong>Açıklama:</strong> {org.description}
                    </p>
                  )}
                  
                  <div className="social-links">
                    {org.instagramUrl && (
                      <a href={org.instagramUrl} target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faInstagram} />
                      </a>
                    )}
                    {org.facebookUrl && (
                      <a href={org.facebookUrl} target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faFacebook} />
                      </a>
                    )}
                    {org.twitterUrl && (
                      <a href={org.twitterUrl} target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faTwitter} />
                      </a>
                    )}
                    {org.website && (
                      <a href={org.website} target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faGlobe} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Donate;