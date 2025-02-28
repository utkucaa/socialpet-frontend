import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './AdDetail.css';
import { FaWhatsapp, FaFacebook, FaTwitter, FaPinterest } from 'react-icons/fa';
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';
import adoptionService, { AdoptionListingDetail } from '../../services/adoptionService';

const AdDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [adDetails, setAdDetails] = useState<AdoptionListingDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchAdDetails = async () => {
      if (!id) {
        setError("İlan ID'si bulunamadı.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");
        console.log("Fetching ad details for ID:", id);
        const data = await adoptionService.getAdoptionListingById(id);
        console.log("Received ad details:", data);
        
        if (!data) {
          setError("İlan bulunamadı.");
          return;
        }
        
        setAdDetails(data);
      } catch (err: any) {
        console.error("Error fetching ad details:", err);
        setError(err.response?.data?.message || "İlan detayları yüklenirken bir hata oluştu.");
      } finally {
        setLoading(false);
      }
    };

    fetchAdDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading">Yükleniyor...</div>
      </div>
    );
  }

  if (error || !adDetails) {
    return (
      <div className="error-container">
        <div className="error">{error || "İlan bulunamadı."}</div>
      </div>
    );
  }

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const text = `${adDetails.title} - SocialPet'te bir ilan`;
    
    switch (platform) {
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`);
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`);
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`);
        break;
      case 'pinterest':
        window.open(`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&description=${encodeURIComponent(text)}`);
        break;
    }
  };

  return (
    <div className="ad-detail-container">
      <div className="breadcrumb">
        <a href="/">Anasayfa</a> {'>'}
        <a href="/adopt">Sahiplendirme İlanları</a> {'>'}
        <span>{adDetails.title}</span>
      </div>

      <div className="ad-header">
        <h1>{adDetails.title}</h1>
        <div className="header-actions">
          <button className="favorite-btn">Favorilere Ekle</button>
          <button className="print-btn" onClick={() => window.print()}>Yazdır</button>
          <div className="social-share">
            <div className="share-icon" onClick={() => handleShare('facebook')}>
              <FaFacebook size={20} color="#3b5998" />
            </div>
            <div className="share-icon" onClick={() => handleShare('twitter')}>
              <FaTwitter size={20} color="#1da1f2" />
            </div>
            <div className="share-icon" onClick={() => handleShare('pinterest')}>
              <FaPinterest size={20} color="#bd081c" />
            </div>
          </div>
        </div>
      </div>

      <div className="ad-content">
        <div className="ad-gallery">
          <div className="main-image">
            {adDetails.imageUrl ? (
              <img src={adDetails.imageUrl} alt={adDetails.title} />
            ) : (
              <div className="no-image">Fotoğraf Yok</div>
            )}
            <button className="nav-btn prev">
              <MdNavigateBefore />
            </button>
            <button className="nav-btn next">
              <MdNavigateNext />
            </button>
          </div>
          <div className="image-actions">
            <button className="enlarge-btn">Fotoğrafı Büyüt</button>
            <button className="video-btn">Video</button>
          </div>
        </div>

        <div className="specifications">
          <div className="location-info">
            {adDetails.city} / {adDetails.district}
          </div>

          <table className="specs-table">
            <tbody>
              <tr>
                <td>Pet Adı</td>
                <td>{adDetails.petName}</td>
              </tr>
              <tr>
                <td>Cinsi</td>
                <td>{adDetails.breed}</td>
              </tr>
              <tr>
                <td>Yaş</td>
                <td>{adDetails.age}</td>
              </tr>
              <tr>
                <td>Cinsiyet</td>
                <td>{adDetails.gender}</td>
              </tr>
              <tr>
                <td>Boyut</td>
                <td>{adDetails.size}</td>
              </tr>
              <tr>
                <td>Durum</td>
                <td>{adDetails.status}</td>
              </tr>
            </tbody>
          </table>

          <div className="description">
            <h3>Açıklama</h3>
            <p>{adDetails.description}</p>
          </div>
        </div>

        <div className="contact-box">
          <div className="user-info">
            <h3>{adDetails.fullName}</h3>
            <p>İlan Tarihi: {new Date(adDetails.createdAt).toLocaleDateString('tr-TR')}</p>
            <p>Telefon: {adDetails.phone}</p>
          </div>

          <div className="contact-buttons">
            <a href={`tel:${adDetails.phone}`} className="phone-btn">
              {adDetails.phone}
            </a>
            <a 
              href={`https://wa.me/${adDetails.phone.replace(/\D/g, '')}`} 
              className="whatsapp-btn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaWhatsapp /> WhatsApp
            </a>
            <button className="message-btn">İlan Sahibine Mesaj Gönder</button>
          </div>

          <div className="warning-box">
            <h4>Tanımadığınız Kişilere Dikkat!</h4>
            <p>Socialpet.com, pet arayanlar ve sahiplendirme yapanları buluşturan bir platform olup, satış yapmamaktadır. Bunun için hayvan alacak kişilerin, hayvan satan kişilerle mutlaka yüz yüze görüşmesi gerektiğini söylemektedir. Yüz yüze görüşülmeyen kişilere hiçbir şekilde kaparo ya da bir ödeme yapılmamalıdır.</p>
          </div>

          <button className="report-btn">İlan İle İlgili Şikayetim Var</button>
        </div>
      </div>
    </div>
  );
};

export default AdDetail;