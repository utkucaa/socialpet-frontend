// @ts-nocheck
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Stats.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouseChimney, faShareNodes, faChartSimple } from '@fortawesome/free-solid-svg-icons';
import adoptionService, { AdoptionListingDetail } from '../../services/adoptionService';

const Stats: React.FC = () => {
  const [recentAds, setRecentAds] = useState<AdoptionListingDetail[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    fetchRecentAds();
  }, []);

  const fetchRecentAds = async (): Promise<void> => {
    try {
      setLoading(true);
      setError("");
      console.log("İlanlar yükleniyor...");
      const data = await adoptionService.getAdoptionListings();
      console.log("Gelen ilanlar:", data);
      if (!data || data.length === 0) {
        setError("Henüz ilan bulunmamaktadır.");
        return;
      }
      setRecentAds(data);
    } catch (error: any) {
      console.error("İlan yükleme hatası detayı:", error);
      setError(error.message || "İlanlar yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyiniz.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="stats">
        <div className="stat-item">
          <FontAwesomeIcon icon={faHouseChimney} />
          <h3>Sahiplendirme</h3>
          <p>Ücretsiz ilan ver</p>
        </div>
        <div className="stat-item">
          <FontAwesomeIcon icon={faShareNodes} />
          <h3>Paylaş</h3>
          <p>Sosyal medyada paylaş</p>
        </div>
        <div className="stat-item">
          <FontAwesomeIcon icon={faChartSimple} />
          <h3>Takip Et</h3>
          <p>İlanları takip et</p>
        </div>
      </div>

      <div className="adoption-section">
        <div className="new-adoption">
          <h2 className="adoption-title">Yeni Sahiplendirme İlanı</h2>
          <p className="adoption-text">
            Sahipsiz, yeni bir yuvaya ihtiyaç duyan kedi ve köpeklerin ilanlarını siz de socialpet.com'da ücretsiz yayınlayabilirsiniz.
          </p>
          <Link to="/create-ad" className="adoption-button">
            Sahiplendirme İlan Ver
          </Link>
        </div>

        <div className="recent-ads">
          <h2 className="recent-ads-title">Yeni İlanlar</h2>
          {loading ? (
            <div className="loading">Yükleniyor...</div>
          ) : error ? (
            <div className="error">{error}</div>
          ) : (
            <div className="listings-grid">
              {recentAds.map((listing) => (
                <Link 
                  to={`/adoption/${listing.slug || listing.id}`} 
                  key={listing.id} 
                  className="listing-card"
                >
                  <div className="listing-image">
                    {listing.imageUrl ? (
                      <img src={listing.imageUrl} alt={listing.title} />
                    ) : (
                      <div className="no-image">Fotoğraf Yok</div>
                    )}
                  </div>
                  <div className="listing-info">
                    <h3>{listing.title}</h3>
                    <p className="pet-name">{listing.petName}</p>
                    <p className="location">{listing.city} / {listing.district}</p>
                    <div className="pet-details">
                      <span>{listing.breed}</span>
                      <span>{listing.age}</span>
                      <span>{listing.gender}</span>
                    </div>
                    <p className="date">
                      {new Date(listing.createdAt).toLocaleDateString('tr-TR')}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Stats;
