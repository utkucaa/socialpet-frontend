import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './AdoptionList.css';
import adoptionService, { AdoptionListingDetail } from '../../services/adoptionService';

const AdoptionList: React.FC = () => {
  const [listings, setListings] = useState<AdoptionListingDetail[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchListings = async () => {
      try {
        setLoading(true);
        const data = await adoptionService.getAdoptionListings();
        setListings(data);
      } catch (err) {
        setError("İlanlar yüklenirken bir hata oluştu.");
        console.error("Error fetching listings:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  if (loading) {
    return <div className="loading">İlanlar Yükleniyor...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="adoption-listings">
      <h2>Tüm Sahiplendirme İlanları</h2>
      <div className="listings-grid">
        {listings.map((listing) => (
          <Link 
            to={`/adoption/${listing.id}`} 
            key={listing.id} 
            className="listing-card"
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <div className="listing-image">
              <img src={listing.imageUrl} alt={listing.title} />
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
    </div>
  );
};

export default AdoptionList; 