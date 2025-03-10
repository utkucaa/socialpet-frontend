import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaWhatsapp, FaFacebook, FaTwitter, FaPinterest, FaHeart, FaPrint, FaShare, FaMapMarkerAlt, FaPhone, FaExclamationTriangle, FaFlag } from 'react-icons/fa';
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';
import lostPetService from '../../services/lostPetService';
import GoogleMap from '../Adoption/GoogleMap';
import axiosInstance from '../../services/axios';

const LostPetDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [lostPet, setLostPet] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchLostPet = async () => {
      if (!id) {
        setError("İlan ID'si bulunamadı.");
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        console.log("Fetching lost pet details for ID:", id);
        
        // Doğrudan axios instance kullanarak API çağrısı yapıyoruz
        const response = await axiosInstance.get(`/api/lostpets/${id}`);
        console.log("Received lost pet details:", response.data);
        
        if (!response.data) {
          setError("İlan bulunamadı.");
          return;
        }
        
        // API'den gelen veriyi işliyoruz
        const data = response.data;
        
        // Resim URL'ini düzenliyoruz
        if (data.image) {
          // Base64 kontrolü
          if (data.image.startsWith('data:image')) {
            console.log('Base64 image detected, this should be handled on the server side');
            // Base64 resimler sunucu tarafında işlenmeli, burada sadece log
          } 
          // Tam URL kontrolü (http veya https ile başlayan)
          else if (data.image.startsWith('http')) {
            // URL zaten tam, değişiklik yapmaya gerek yok
            console.log('Full URL detected:', data.image);
          }
          // FileController URL formatı kontrolü
          else if (data.image.includes('/api/v1/files/')) {
            // URL zaten doğru formatta, değişiklik yapmaya gerek yok
            console.log('File controller URL detected:', data.image);
          }
          // Göreceli URL kontrolü
          else {
            // Dosya adı olabilir, FileController URL'ine dönüştür
            data.image = `/api/v1/files/${data.image}`;
          }
        }
        
        if (data.imageUrl) {
          // Base64 kontrolü
          if (data.imageUrl.startsWith('data:image')) {
            console.log('Base64 imageUrl detected, this should be handled on the server side');
            // Base64 resimler sunucu tarafında işlenmeli, burada sadece log
          } 
          // Tam URL kontrolü (http veya https ile başlayan)
          else if (data.imageUrl.startsWith('http')) {
            // URL zaten tam, değişiklik yapmaya gerek yok
            console.log('Full URL detected:', data.imageUrl);
          }
          // FileController URL formatı kontrolü
          else if (data.imageUrl.includes('/api/v1/files/')) {
            // URL zaten doğru formatta, değişiklik yapmaya gerek yok
            console.log('File controller URL detected:', data.imageUrl);
          }
          // Göreceli URL kontrolü
          else {
            // Dosya adı olabilir, FileController URL'ine dönüştür
            data.imageUrl = `/api/v1/files/${data.imageUrl}`;
          }
        }
        
        setLostPet(data);
      } catch (err: any) {
        console.error('Error fetching lost pet:', err);
        setError(err.response?.data?.message || 'İlan yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchLostPet();
  }, [id]);

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const text = `${lostPet?.title} - SocialPet'te bir kayıp ilanı`;
    
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

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    // Here you would typically call an API to save the favorite status
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (error || !lostPet) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg shadow-md">
          <p className="font-medium">{error || "İlan bulunamadı."}</p>
        </div>
      </div>
    );
  }

  // Prepare images array
  const images: string[] = [];
  
  // Resim URL'lerini kontrol et ve base64 olmayanları ekle
  if (lostPet?.image && !lostPet.image.startsWith('data:image')) {
    images.push(lostPet.image);
  }
  
  if (lostPet?.imageUrl && !lostPet.imageUrl.startsWith('data:image') && 
      lostPet.imageUrl !== lostPet.image) {
    images.push(lostPet.imageUrl);
  }
  
  if (images.length === 0) {
    images.push('/placeholder-pet.jpg'); // Fallback image
  }

  // Extract city and district from location if available
  let city = 'Belirtilmemiş';
  let district = 'Belirtilmemiş';
  
  if (lostPet?.city) {
    city = lostPet.city;
  } else if (lostPet?.location) {
    const locationParts = lostPet.location.split('/').map((part: string) => part.trim());
    city = locationParts[0] || 'Belirtilmemiş';
    district = locationParts.length > 1 ? locationParts[1] : 'Belirtilmemiş';
  }
  
  if (lostPet?.district) {
    district = lostPet.district;
  }

  // Format date
  const formatDate = (dateString: string | number) => {
    if (!dateString) return 'Belirtilmemiş';
    
    try {
      const date = typeof dateString === 'number' 
        ? new Date(dateString) 
        : new Date(dateString);
      
      return date.toLocaleDateString('tr-TR');
    } catch (e) {
      console.error('Date formatting error:', e);
      return 'Geçersiz Tarih';
    }
  };

  // Get contact info
  const contactInfo = lostPet?.contactInfo || lostPet?.phone || '';
  
  // Get status
  const status = lostPet?.status || 'active';
  const statusText = status === 'active' ? 'Aranıyor' : 'Bulundu';
  
  // Get owner name
  const ownerName = lostPet?.fullName || lostPet?.userName || 'İlan Sahibi';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex text-sm text-gray-500 mb-6">
        <a href="/" className="hover:text-purple-600 transition-colors">Anasayfa</a>
        <span className="mx-2">/</span>
        <a href="/lost" className="hover:text-purple-600 transition-colors">Kayıp İlanları</a>
        <span className="mx-2">/</span>
        <span className="text-gray-700 font-medium">{lostPet.title}</span>
      </nav>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Images */}
        <div className="lg:col-span-2">
          {/* Title and Actions - Mobile */}
          <div className="lg:hidden mb-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">{lostPet.title}</h1>
            <div className="flex flex-wrap gap-2 mb-4">
              <button 
                onClick={toggleFavorite}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  isFavorite 
                    ? 'bg-red-100 text-red-600' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <FaHeart color={isFavorite ? '#DC2626' : '#9CA3AF'} />
                {isFavorite ? 'Favorilerimde' : 'Favorilere Ekle'}
              </button>
              <button 
                onClick={() => window.print()}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors"
              >
                <FaPrint />
                Yazdır
              </button>
            </div>
          </div>

          {/* Image Gallery */}
          <div className="relative rounded-xl overflow-hidden bg-gray-100 aspect-w-16 aspect-h-9 mb-4">
            {images.length > 0 ? (
              <img 
                src={images[currentImageIndex]} 
                alt={lostPet.title} 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full bg-gray-200 text-gray-500">
                Fotoğraf Yok
              </div>
            )}
            
            {images.length > 1 && (
              <>
                <button 
                  onClick={() => setCurrentImageIndex(prev => (prev === 0 ? images.length - 1 : prev - 1))}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition-colors"
                  aria-label="Previous image"
                >
                  <MdNavigateBefore size={24} />
                </button>
                <button 
                  onClick={() => setCurrentImageIndex(prev => (prev === images.length - 1 ? 0 : prev + 1))}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition-colors"
                  aria-label="Next image"
                >
                  <MdNavigateNext size={24} />
                </button>
              </>
            )}
          </div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
              {images.map((img: string, index: number) => (
                <button 
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 ${
                    currentImageIndex === index ? 'border-purple-500' : 'border-transparent'
                  }`}
                >
                  <img src={img} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Pet Details */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Kayıp Hayvan Bilgileri</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-500">Hayvan Türü</p>
                <p className="font-medium text-gray-800">{lostPet.animalType || 'Belirtilmemiş'}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-500">Kaybolduğu Tarih</p>
                <p className="font-medium text-gray-800">{formatDate(lostPet.lastSeenDate) || formatDate(lostPet.timestamp)}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-500">Durum</p>
                <p className="font-medium text-gray-800">
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                    status === 'active' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                  }`}>
                    {statusText}
                  </span>
                </p>
              </div>
              {lostPet.lastSeenLocation && (
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-500">Son Görüldüğü Yer</p>
                  <p className="font-medium text-gray-800">{lostPet.lastSeenLocation}</p>
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Detaylar</h2>
            <div className="prose max-w-none text-gray-700">
              <p>{lostPet.details}</p>
            </div>
          </div>

          {/* Additional Info */}
          {lostPet.additionalInfo && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Ek Bilgiler</h2>
              <div className="prose max-w-none text-gray-700">
                <p>{lostPet.additionalInfo}</p>
              </div>
            </div>
          )}

          {/* Location */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Konum</h2>
            <div className="flex items-center text-gray-700 mb-2">
              <span className="mr-2 text-purple-500"><FaMapMarkerAlt color="#8B5CF6" /></span>
              <span>{city} {district !== 'Belirtilmemiş' ? `/ ${district}` : ''}</span>
            </div>
            <div className="h-48 mt-4">
              <GoogleMap 
                city={city} 
                district={district} 
                className="h-full w-full"
              />
            </div>
          </div>
        </div>

        {/* Right Column - Contact and Actions */}
        <div className="lg:col-span-1">
          {/* Title and Actions - Desktop */}
          <div className="hidden lg:block mb-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">{lostPet.title}</h1>
            <div className="flex flex-wrap gap-2 mb-4">
              <button 
                onClick={toggleFavorite}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  isFavorite 
                    ? 'bg-red-100 text-red-600' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <FaHeart color={isFavorite ? '#DC2626' : '#9CA3AF'} />
                {isFavorite ? 'Favorilerimde' : 'Favorilere Ekle'}
              </button>
              <button 
                onClick={() => window.print()}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors"
              >
                <FaPrint />
                Yazdır
              </button>
            </div>
          </div>

          {/* Contact Box */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6 sticky top-4">
            <div className="border-b border-gray-200 pb-4 mb-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-1">{ownerName}</h2>
              <p className="text-sm text-gray-500">
                İlan Tarihi: {formatDate(lostPet.createdAt || lostPet.timestamp)}
              </p>
            </div>

            <div className="space-y-3 mb-6">
              {contactInfo && (
                <a 
                  href={`tel:${contactInfo}`} 
                  className="flex items-center justify-center gap-2 w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors"
                >
                  <FaPhone />
                  {contactInfo}
                </a>
              )}
              {contactInfo && (
                <a 
                  href={`https://wa.me/${contactInfo.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg transition-colors"
                >
                  <FaWhatsapp size={18} />
                  WhatsApp ile İletişim
                </a>
              )}
              <button className="w-full py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium rounded-lg transition-colors">
                İlan Sahibine Mesaj Gönder
              </button>
            </div>

            {/* Social Share */}
            <div className="mb-6">
              <p className="text-sm font-medium text-gray-700 mb-2">Bu İlanı Paylaş</p>
              <div className="flex gap-2">
                <button 
                  onClick={() => handleShare('facebook')}
                  className="p-2 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 transition-colors"
                  aria-label="Share on Facebook"
                >
                  <FaFacebook size={18} />
                </button>
                <button 
                  onClick={() => handleShare('twitter')}
                  className="p-2 bg-blue-100 text-blue-400 rounded-full hover:bg-blue-200 transition-colors"
                  aria-label="Share on Twitter"
                >
                  <FaTwitter size={18} />
                </button>
                <button 
                  onClick={() => handleShare('whatsapp')}
                  className="p-2 bg-green-100 text-green-500 rounded-full hover:bg-green-200 transition-colors"
                  aria-label="Share on WhatsApp"
                >
                  <FaWhatsapp size={18} />
                </button>
                <button 
                  onClick={() => handleShare('pinterest')}
                  className="p-2 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition-colors"
                  aria-label="Share on Pinterest"
                >
                  <FaPinterest size={18} />
                </button>
              </div>
            </div>

            {/* Warning Box */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <div className="flex items-start">
                <span className="text-yellow-500 mt-1 mr-3 flex-shrink-0"><FaExclamationTriangle color="#EAB308" /></span>
                <div>
                  <h3 className="text-sm font-semibold text-gray-800">Önemli Uyarı</h3>
                  <p className="text-xs text-gray-600 mt-1">
                    Kayıp hayvanınızı bulduğunuzda lütfen ilanı güncelleyiniz. Socialpet.com, kayıp hayvanların bulunmasına yardımcı olmak için bir platform sağlamaktadır.
                  </p>
                </div>
              </div>
            </div>

            {/* Report Button */}
            <button className="flex items-center justify-center gap-2 w-full py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors">
              <FaFlag color="#6B7280" />
              İlan İle İlgili Şikayetim Var
            </button>
          </div>
        </div>
      </div>

      {/* Similar Listings */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Benzer İlanlar</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* This would be populated with actual similar listings */}
          <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center text-gray-500">
            Benzer ilan bulunamadı
          </div>
        </div>
      </div>
    </div>
  );
};

export default LostPetDetail; 