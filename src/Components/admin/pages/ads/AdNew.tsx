import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import adoptionService from '../../../../services/adoptionService';
import lostPetService from '../../../../services/lostPetService';
import userService, { User } from '../../../../services/userService';

type AdType = 'sahiplendirme' | 'kayip';

const AdNew = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [adType, setAdType] = useState<AdType>('sahiplendirme');
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<string>('');
  const [formData, setFormData] = useState({
    // Common fields
    title: '',
    description: '',
    status: 'aktif',
    
    // Adoption specific fields
    petName: '',
    animalType: '',
    breed: '',
    age: '',
    gender: '',
    size: '',
    source: '',
    city: '',
    district: '',
    fullName: '',
    phone: '',
    
    // Lost pet specific fields
    location: '',
    additionalInfo: '',
    contactInfo: '',
    lastSeenDate: '',
    lastSeenLocation: '',
  });
  const [photo, setPhoto] = useState<File | null>(null);

  useEffect(() => {
    // Fetch users when component mounts
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const userList = await userService.getUsers();
      setUsers(userList);
      // Set the first user as default if available
      if (userList.length > 0) {
        setSelectedUserId(userList[0].id);
      }
    } catch (err: any) {
      console.error('Error fetching users:', err);
      setError('Kullanıcılar yüklenirken bir hata oluştu: ' + err.message);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setPhoto(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!selectedUserId) {
      setError('Lütfen bir kullanıcı seçin');
      setLoading(false);
      return;
    }

    try {
      if (adType === 'sahiplendirme') {
        // Create adoption listing
        const adoptionData = {
          petName: formData.petName,
          animalType: formData.animalType,
          city: formData.city,
          breed: formData.breed,
          age: formData.age,
          size: formData.size,
          gender: formData.gender,
          source: formData.source,
          title: formData.title,
          description: formData.description,
          district: formData.district,
          fullName: formData.fullName,
          phone: formData.phone,
          user: {
            id: parseInt(selectedUserId)
          }
        };

        const response = await adoptionService.createAdoptionListing(adoptionData);
        
        // Upload photo if available
        if (photo && response.id) {
          await adoptionService.uploadPhoto(response.id, photo);
        }
        
        alert('Sahiplendirme ilanı başarıyla oluşturuldu!');
      } else {
        // Create lost pet listing
        const lostPetData = {
          title: formData.title,
          details: formData.description,
          location: formData.location,
          animalType: formData.animalType,
          category: formData.animalType,
          status: formData.status,
          additionalInfo: formData.additionalInfo,
          contactInfo: formData.contactInfo,
          lastSeenDate: formData.lastSeenDate,
          lastSeenLocation: formData.lastSeenLocation,
          image: '', // This will be updated after upload
          timestamp: Date.now()
        };

        // For lost pets, we need a userId
        await lostPetService.createLostPet(selectedUserId, lostPetData);
        
        alert('Kayıp ilanı başarıyla oluşturuldu!');
      }
      
      // Redirect to the listing page
      navigate('/admin/ads/list');
    } catch (err: any) {
      setError(err.message || 'İlan oluşturulurken bir hata oluştu');
      console.error('Error creating ad:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link to="/admin/ads/list" className="text-gray-500 hover:text-gray-700">
          <ArrowLeft size={24} />
        </Link>
        <h1 className="text-2xl font-semibold text-gray-900">Yeni İlan Oluştur</h1>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div className="bg-white rounded-lg shadow p-6">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Kullanıcı</label>
              <select
                name="userId"
                value={selectedUserId}
                onChange={(e) => setSelectedUserId(e.target.value)}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="">Kullanıcı Seçin</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.firstName || user.lastName} ({user.email})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">İlan Başlığı</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">İlan Tipi</label>
              <select 
                name="adType"
                value={adType}
                onChange={(e) => setAdType(e.target.value as AdType)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="sahiplendirme">Sahiplendirme</option>
                <option value="kayip">Kayıp</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Açıklama</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            {adType === 'sahiplendirme' ? (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Hayvan Adı</label>
                    <input
                      type="text"
                      name="petName"
                      value={formData.petName}
                      onChange={handleChange}
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Hayvan Türü</label>
                    <input
                      type="text"
                      name="animalType"
                      value={formData.animalType}
                      onChange={handleChange}
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Irk</label>
                    <input
                      type="text"
                      name="breed"
                      value={formData.breed}
                      onChange={handleChange}
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Yaş</label>
                    <input
                      type="text"
                      name="age"
                      value={formData.age}
                      onChange={handleChange}
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Cinsiyet</label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    >
                      <option value="">Seçiniz</option>
                      <option value="Erkek">Erkek</option>
                      <option value="Dişi">Dişi</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Boyut</label>
                    <select
                      name="size"
                      value={formData.size}
                      onChange={handleChange}
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    >
                      <option value="">Seçiniz</option>
                      <option value="Küçük">Küçük</option>
                      <option value="Orta">Orta</option>
                      <option value="Büyük">Büyük</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Şehir</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">İlçe</label>
                    <input
                      type="text"
                      name="district"
                      value={formData.district}
                      onChange={handleChange}
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">İletişim Adı</label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Telefon</label>
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Kaynak</label>
                  <select
                    name="source"
                    value={formData.source}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  >
                    <option value="">Seçiniz</option>
                    <option value="Barınak">Barınak</option>
                    <option value="Sokak">Sokak</option>
                    <option value="Sahipli">Sahipli</option>
                  </select>
                </div>
              </>
            ) : (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Hayvan Türü</label>
                    <input
                      type="text"
                      name="animalType"
                      value={formData.animalType}
                      onChange={handleChange}
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Konum</label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Son Görülme Tarihi</label>
                    <input
                      type="date"
                      name="lastSeenDate"
                      value={formData.lastSeenDate}
                      onChange={handleChange}
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Son Görülme Yeri</label>
                    <input
                      type="text"
                      name="lastSeenLocation"
                      value={formData.lastSeenLocation}
                      onChange={handleChange}
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">İletişim Bilgisi</label>
                  <input
                    type="text"
                    name="contactInfo"
                    value={formData.contactInfo}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Ek Bilgi</label>
                  <input
                    type="text"
                    name="additionalInfo"
                    value={formData.additionalInfo}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="Örn: Ödüllü"
                  />
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700">Fotoğraflar</label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <div className="flex text-sm text-gray-600">
                    <label className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500">
                      <span>Fotoğraf Yükle</span>
                      <input 
                        type="file" 
                        className="sr-only" 
                        onChange={handlePhotoChange}
                        accept="image/*"
                      />
                    </label>
                    <p className="pl-1">veya sürükle bırak</p>
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF max 10MB</p>
                  {photo && (
                    <p className="text-sm text-green-600">
                      {photo.name} ({Math.round(photo.size / 1024)} KB)
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Durum</label>
              <select 
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="aktif">Aktif</option>
                <option value="beklemede">Beklemede</option>
                <option value="acil">Acil</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Link
              to="/admin/ads/list"
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              İptal
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400"
            >
              {loading ? 'Yükleniyor...' : 'İlanı Yayınla'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdNew;