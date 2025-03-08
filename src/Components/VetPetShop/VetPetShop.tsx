import React, { useState, useMemo, useEffect } from 'react';
import { Search, MapPin, Phone, Mail, Star, Filter, Map as MapIcon, List, ChevronDown, Clock, Building2, Users } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

type Business = {
  id: string;
  name: string;
  type: 'Veteriner' | 'Petshop';
  rating: number;
  address: string;
  city: string;
  district: string;
  phone: string;
  email: string;
  image: string;
  location: [number, number];
  workingHours: string;
  services: string[];
  reviews: Review[];
};

type Review = {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  avatar: string;
};

const cities = [
  'Konya',
  'İstanbul',
  'Ankara',
  'İzmir',
  'Antalya'
];

const districts = {
  'Konya': ['Selçuklu', 'Meram', 'Karatay'],
  'İstanbul': ['Kadıköy', 'Beşiktaş', 'Üsküdar'],
  'Ankara': ['Çankaya', 'Keçiören', 'Yenimahalle'],
  'İzmir': ['Konak', 'Karşıyaka', 'Bornova'],
  'Antalya': ['Muratpaşa', 'Konyaaltı', 'Kepez']
};

const sampleData: Business[] = [
  {
    id: '1',
    name: 'Dostlar Veteriner Kliniği',
    type: 'Veteriner',
    rating: 4.7,
    address: 'Feritpaşa Mah. Kerkük Cad. No: 45',
    city: 'Konya',
    district: 'Selçuklu',
    phone: '0332 123 45 67',
    email: 'info@dostlarveteriner.com',
    image: 'https://images.unsplash.com/photo-1628009368231-7bb7fb3c71b0?w=800&auto=format&fit=crop',
    location: [37.871593, 32.492719],
    workingHours: '09:00 - 18:00',
    services: ['Aşılama', 'Cerrahi Operasyonlar', 'Mikroçip', 'Yatılı Tedavi'],
    reviews: [
      {
        id: '1',
        userName: 'Ahmet Y.',
        rating: 5,
        comment: 'Harika bir veteriner, çok ilgililer! Kedim için en iyi tedaviyi uyguladılar.',
        date: '2024-03-15',
        avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&auto=format&fit=crop'
      },
      {
        id: '2',
        userName: 'Zeynep K.',
        rating: 4,
        comment: 'Profesyonel hizmet, teşekkürler. Fiyatlar biraz yüksek ama hizmet kalitesi iyi.',
        date: '2024-03-14',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop'
      }
    ]
  },
  {
    id: '2',
    name: 'Happy Pets Shop',
    type: 'Petshop',
    rating: 4.5,
    address: 'Musalla Bağları Mah. Ankara Cad. No: 85',
    city: 'Konya',
    district: 'Selçuklu',
    phone: '0332 234 56 78',
    email: 'info@happypets.com',
    image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=800&auto=format&fit=crop',
    location: [37.873781, 32.493827],
    workingHours: '10:00 - 20:00',
    services: ['Mama Satışı', 'Aksesuar', 'Kuaför', 'Oyuncak'],
    reviews: [
      {
        id: '3',
        userName: 'Mehmet A.',
        rating: 5,
        comment: 'Ürün çeşitliliği çok iyi! Personel yardımsever ve bilgili.',
        date: '2024-03-13',
        avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&auto=format&fit=crop'
      }
    ]
  }
];

export function VeterinerPetshop() {
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<'all' | 'Veteriner' | 'Petshop'>('all');
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('');
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Fix Leaflet default icon issue
  useEffect(() => {
    // This is a workaround for the missing default icon in Leaflet when using webpack
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
      iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    });
  }, []);

  const availableDistricts = selectedCity ? districts[selectedCity as keyof typeof districts] : [];

  const filteredBusinesses = useMemo(() => {
    return sampleData.filter(business => {
      const matchesSearch = business.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           business.address.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = selectedType === 'all' || business.type === selectedType;
      const matchesCity = !selectedCity || business.city === selectedCity;
      const matchesDistrict = !selectedDistrict || business.district === selectedDistrict;
      return matchesSearch && matchesType && matchesCity && matchesDistrict;
    });
  }, [searchTerm, selectedType, selectedCity, selectedDistrict]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-blue-600 py-16">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1587560699334-cc4ff634909a?w=1920&auto=format&fit=crop"
            alt="Background"
            className="h-full w-full object-cover opacity-10"
          />
        </div>
        <div className="relative container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-white mb-4">
              Veteriner ve Petshop Rehberi
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Size en yakın veteriner ve petshopları keşfedin
            </p>
            
            {/* Search Bar */}
            <div className="bg-white rounded-lg shadow-lg p-2">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="İşletme adı veya adres ara..."
                    className="w-full rounded-lg border-0 py-3 pl-10 pr-4 focus:ring-2 focus:ring-blue-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                    className="flex items-center px-4 py-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                  >
                    <Filter className="h-5 w-5 mr-2" />
                    Filtrele
                  </button>
                  <div className="flex rounded-lg border border-gray-200 bg-white">
                    <button
                      className={`flex items-center px-4 py-2 rounded-l-lg ${viewMode === 'list' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}
                      onClick={() => setViewMode('list')}
                    >
                      <List className="h-5 w-5" />
                    </button>
                    <button
                      className={`flex items-center px-4 py-2 rounded-r-lg ${viewMode === 'map' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}
                      onClick={() => setViewMode('map')}
                    >
                      <MapIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Filter Panel */}
              {isFilterOpen && (
                <div className="mt-4 p-4 border-t border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        İşletme Tipi
                      </label>
                      <select
                        className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                        value={selectedType}
                        onChange={(e) => setSelectedType(e.target.value as any)}
                      >
                        <option value="all">Tümü</option>
                        <option value="Veteriner">Veteriner</option>
                        <option value="Petshop">Petshop</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Şehir
                      </label>
                      <select
                        className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                        value={selectedCity}
                        onChange={(e) => {
                          setSelectedCity(e.target.value);
                          setSelectedDistrict('');
                        }}
                      >
                        <option value="">Tüm Şehirler</option>
                        {cities.map(city => (
                          <option key={city} value={city}>{city}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        İlçe
                      </label>
                      <select
                        className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                        value={selectedDistrict}
                        onChange={(e) => setSelectedDistrict(e.target.value)}
                        disabled={!selectedCity}
                      >
                        <option value="">Tüm İlçeler</option>
                        {availableDistricts.map(district => (
                          <option key={district} value={district}>{district}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Results Summary */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              {filteredBusinesses.length} sonuç bulundu
            </h2>
            <p className="text-sm text-gray-500">
              {selectedCity && `${selectedCity}`}
              {selectedDistrict && `, ${selectedDistrict}`}
              {selectedType !== 'all' && ` - ${selectedType}`}
            </p>
          </div>
        </div>

        {/* Results */}
        {viewMode === 'list' ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredBusinesses.map((business) => (
              <BusinessCard
                key={business.id}
                business={business}
                onClick={() => setSelectedBusiness(business)}
              />
            ))}
          </div>
        ) : (
          <div className="h-[600px] rounded-xl overflow-hidden shadow-lg">
            <MapContainer
              className="h-full w-full"
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {filteredBusinesses.map((business) => (
                <Marker
                  key={business.id}
                  position={business.location as L.LatLngExpression}
                >
                  <Popup>
                    <div className="p-2">
                      <h3 className="font-semibold">{business.name}</h3>
                      <p className="text-sm text-gray-600">{business.address}</p>
                      <button
                        className="mt-2 text-sm text-blue-600 hover:underline"
                        onClick={() => setSelectedBusiness(business)}
                      >
                        Detayları Gör
                      </button>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        )}
      </div>

      {/* Business Detail Modal */}
      {selectedBusiness && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-xl bg-white">
            <BusinessDetail
              business={selectedBusiness}
              onClose={() => setSelectedBusiness(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

function BusinessCard({ business, onClick }: { business: Business; onClick: () => void }) {
  return (
    <div className="group overflow-hidden rounded-xl bg-white shadow-sm transition-all hover:shadow-lg">
      <div className="relative h-48 overflow-hidden">
        <img
          src={business.image}
          alt={business.name}
          className="h-full w-full object-cover transition-transform group-hover:scale-105"
        />
        <div className="absolute top-4 right-4 rounded-full bg-white px-3 py-1 text-sm font-medium shadow-sm">
          {business.type}
        </div>
      </div>
      <div className="p-6">
        <div className="mb-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-gray-900">{business.name}</h3>
            <div className="flex items-center rounded-full bg-blue-50 px-2 py-1">
              <Star className="mr-1 h-4 w-4 fill-blue-600 text-blue-600" />
              <span className="font-medium text-blue-600">{business.rating}</span>
            </div>
          </div>
          <p className="mt-1 text-sm text-gray-500">{business.workingHours}</p>
        </div>
        
        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex items-center">
            <MapPin className="mr-2 h-4 w-4 text-gray-400" />
            <span>{business.district}, {business.city}</span>
          </div>
          <div className="flex items-center">
            <Phone className="mr-2 h-4 w-4 text-gray-400" />
            <a href={`tel:${business.phone}`} className="hover:text-blue-600">{business.phone}</a>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {business.services.slice(0, 3).map((service, index) => (
            <span
              key={index}
              className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600"
            >
              {service}
            </span>
          ))}
          {business.services.length > 3 && (
            <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
              +{business.services.length - 3}
            </span>
          )}
        </div>
        
        <button
          onClick={onClick}
          className="mt-6 w-full rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
        >
          Detayları Gör
        </button>
      </div>
    </div>
  );
}

function BusinessDetail({ business, onClose }: { business: Business; onClose: () => void }) {
  return (
    <div>
      <div className="relative h-64">
        <img
          src={business.image}
          alt={business.name}
          className="h-full w-full object-cover"
        />
        <button
          onClick={onClose}
          className="absolute top-4 right-4 rounded-full bg-white/80 p-2 backdrop-blur-sm transition-colors hover:bg-white"
        >
          <span className="sr-only">Kapat</span>
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="p-6">
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">{business.name}</h2>
            <div className="flex items-center rounded-full bg-blue-50 px-3 py-1">
              <Star className="mr-1 h-5 w-5 fill-blue-600 text-blue-600" />
              <span className="font-medium text-blue-600">{business.rating}</span>
            </div>
          </div>
          <p className="mt-1 text-gray-500">{business.type}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <h3 className="mb-4 text-lg font-semibold">İşletme Bilgileri</h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <MapPin className="mr-3 h-5 w-5 text-gray-400" />
                <span>{business.address}, {business.district}/{business.city}</span>
              </div>
              <div className="flex items-center">
                <Phone className="mr-3 h-5 w-5 text-gray-400" />
                <a href={`tel:${business.phone}`} className="hover:text-blue-600">{business.phone}</a>
              </div>
              <div className="flex items-center">
                <Mail className="mr-3 h-5 w-5 text-gray-400" />
                <a href={`mailto:${business.email}`} className="hover:text-blue-600">{business.email}</a>
              </div>
              <div className="flex items-center">
                <Clock className="mr-3 h-5 w-5 text-gray-400" />
                <span>{business.workingHours}</span>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="mb-4 text-lg font-semibold">Hizmetler</h3>
              <div className="flex flex-wrap gap-2">
                {business.services.map((service, index) => (
                  <span
                    key={index}
                    className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-600"
                  >
                    {service}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <h3 className="mb-4 text-lg font-semibold">Konum</h3>
              <div className="h-[200px] rounded-xl overflow-hidden">
                
                <MapContainer
                  className="h-full w-full"
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker position={business.location as L.LatLngExpression}>
                    <Popup>{business.name}</Popup>
                  </Marker>
                </MapContainer>
              </div>
            </div>
          </div>

          <div>
            <div className="mb-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Değerlendirmeler</h3>
                <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
                  Değerlendirme Yap
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {business.reviews.map((review) => (
                <div key={review.id} className="rounded-xl border p-4">
                  <div className="mb-3 flex items-center">
                    <img
                      src={review.avatar}
                      alt={review.userName}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                    <div className="ml-3">
                      <div className="font-medium">{review.userName}</div>
                      <div className="flex items-center">
                        <Star className="mr-1 h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="mr-2">{review.rating}</span>
                        <span className="text-sm text-gray-500">
                          {new Date(review.date).toLocaleDateString('tr-TR')}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VeterinerPetshop;