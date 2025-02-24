// @ts-nocheck
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Stats.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouseChimney, faShareNodes, faChartSimple } from '@fortawesome/free-solid-svg-icons';
import axiosInstance from '../../services/axios';

interface AdDetails {
  petName: string;
  breed: string;
  imageUrl: string;
}

interface Ad extends AdDetails {
  id: string;
  location: string;
  createdAt: string;
  user: {
    id: number;
  };
}

const Stats: React.FC = () => {
  const navigate = useNavigate();
  const [recentAds, setRecentAds] = useState<Ad[]>([]);
  const [adDetails, setAdDetails] = useState<AdDetails>({
    petName: "",
    breed: "",
    imageUrl: "",
  });

  useEffect(() => {
    fetchRecentAds();
  }, []);

  const fetchRecentAds = async (): Promise<void> => {
    try {
      const response = await axiosInstance.get<Ad[]>('/v1/adoption/recent');
      setRecentAds(response.data);
    } catch (error) {
      console.error("İlanlar yüklenirken hata oluştu:", error);
    }
  };

  const handleCreateAdClick = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault();

    try {
      const response = await axiosInstance.post<Ad>("/v1/adoption/create", {
        ...adDetails,
        user: { id: 12 },
        createdAt: new Date().toISOString(),
      });

      if (response.data) {
        fetchRecentAds(); 
        navigate("/adopt");  
      }
    } catch (error) {
      console.error("İlan eklenemedi:", error);
    }
  };

  const handleAdClick = (ad: Ad): void => {
    navigate(`/ad-detail/${ad.id}`, { state: { ad } });
  };

  return (
    <>
      <section className="stats">
        <div className="stat-item">
          <h3>
            <FontAwesomeIcon icon={faHouseChimney} style={{ marginRight: '10px' }} />
            163.959 YUVA
          </h3>
          <p>163.959 PATİLİ DOSTUMUZ, SOCIALPET'DE YUVA BULDU ÇOK MUTLUYUZ!</p>
        </div>
        <div className="stat-item">
          <h3>
            <FontAwesomeIcon icon={faShareNodes} />
            94.568 PAYLAŞIM
          </h3>
          <p>İLANLARIMIZ SOSYAL MEDYADA 94.568 KERE PAYLAŞILDI.</p>
        </div>
        <div className="stat-item">
          <h3>
            <FontAwesomeIcon icon={faChartSimple} />
            23.345.678 GÖSTERİM
          </h3>
          <p>İLANLARIMIZ 23.345.678 KERE GÖRÜNTÜLENDİ, MİLYONLARA ULAŞTI.</p>
        </div>
      </section>

      <div className="adoption-section">
        <div className="new-adoption">
          <h2 className="adoption-title">Yeni Sahiplendirme İlanı</h2>
          <p className="adoption-text">
            Sahipsiz, yeni bir yuvaya ihtiyaç duyan kedi ve köpeklerin ilanlarını siz de socialpet.com'da ücretsiz yayınlayabilirsiniz.
          </p>
          <button className='adoption-button'>
            <Link to="/create-ad" className="no-underline">Sahiplendirme İlan Ver</Link>
          </button>
        </div>
        <div className="recent-ads">
          <h2 className="recent-ads-title">Yeni İlanlar</h2>
          <ul className="ads-list">
            {recentAds.length > 0 ? (
              recentAds.map((ad) => (
                <li key={ad.id} className="ad-item">
                  <Link to={`/ad/${ad.id}`} className="ad-link">
                    {ad.imageUrl && (
                      <img 
                        src={`http://localhost:8080${ad.imageUrl}`} 
                        alt={ad.petName} 
                      />
                    )}
                    <div className="ad-info">
                      <h3>{ad.petName}</h3>
                      <p className="ad-breed">{ad.breed}</p>
                      <p className="ad-location">{ad.location}</p>
                      <p className="ad-date">
                        {new Date(ad.createdAt).toLocaleDateString('tr-TR')}
                      </p>
                    </div>
                  </Link>
                </li>
              ))
            ) : (
              <p>Henüz ilan bulunmamaktadır.</p>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Stats;
