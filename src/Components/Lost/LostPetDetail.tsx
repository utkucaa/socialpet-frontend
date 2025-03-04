import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import lostPetService from '../../services/lostPetService';
import './LostPetDetail.css';

const LostPetDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [lostPet, setLostPet] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLostPet = async () => {
      if (!id) return;

      try {
        setIsLoading(true);
        const data = await lostPetService.getLostPetById(id);
        setLostPet(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching lost pet:', err);
        setError('İlan yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchLostPet();
  }, [id]);

  if (isLoading) {
    return <div className="loading">Yükleniyor...</div>;
  }

  if (error || !lostPet) {
    return (
      <div className="error-container">
        <div className="error">{error || 'İlan bulunamadı'}</div>
        <button onClick={() => navigate('/lost')} className="back-button">
          Kayıp İlanlarına Dön
        </button>
      </div>
    );
  }

  return (
    <div className="lost-pet-detail">
      <div className="detail-header">
        <h1>{lostPet.title}</h1>
        <button onClick={() => navigate('/lost')} className="back-button">
          Kayıp İlanlarına Dön
        </button>
      </div>

      <div className="detail-content">
        <div className="image-section">
          <img src={lostPet.image} alt={lostPet.title} className="pet-image" />
        </div>

        <div className="info-section">
          <div className="info-group">
            <h3>Hayvan Türü</h3>
            <p>{lostPet.animalType}</p>
          </div>

          <div className="info-group">
            <h3>Kaybolduğu Yer</h3>
            <p>{lostPet.location}</p>
          </div>

          <div className="info-group">
            <h3>Detaylar</h3>
            <p>{lostPet.details}</p>
          </div>

          {lostPet.additionalInfo && (
            <div className="info-group">
              <h3>Ek Bilgiler</h3>
              <p>{lostPet.additionalInfo}</p>
            </div>
          )}

          <div className="info-group">
            <h3>İlan Tarihi</h3>
            <p>{new Date(lostPet.timestamp).toLocaleDateString('tr-TR')}</p>
          </div>

          <div className="info-group">
            <h3>Durum</h3>
            <p className={`status ${lostPet.status.toLowerCase()}`}>
              {lostPet.status === 'active' ? 'Aktif' : 'Bulundu'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LostPetDetail; 