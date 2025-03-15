import React, { useState, useEffect } from 'react';
import { ArrowLeft, Save, X, Loader, AlertCircle, UserCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import * as petHealthService from '../../../../services/petHealthService';

interface FormData {
  petName: string;
  petType: string;
  petBreed: string;
  ownerId: string;
  ownerName: string;
  ownerContact: string;
  birthDate: string;
  weight: string;
  lastCheckup: string;
  nextVaccine: string;
  status: 'healthy' | 'treatment' | 'critical';
  notes: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
}

const PetHealthNew: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    petName: '',
    petType: '',
    petBreed: '',
    ownerId: '',
    ownerName: '',
    ownerContact: '',
    birthDate: '',
    weight: '',
    lastCheckup: new Date().toISOString().split('T')[0],
    nextVaccine: '',
    status: 'healthy',
    notes: ''
  });
  
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showManualEntry, setShowManualEntry] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [retryCount, setRetryCount] = useState<number>(0);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null);
        const userData = await petHealthService.getAllUsers();
        
        if (userData && userData.length > 0) {
          setUsers(userData);
          console.log(`Loaded ${userData.length} users successfully`);
        } else {
          console.warn('No users returned from API or empty array');
          setError('Kullanıcı listesi boş veya API yanıt vermedi. Manuel giriş yapabilirsiniz.');
        }
      } catch (error) {
        console.error('Error fetching users:', error);
        setError('Kullanıcılar yüklenirken bir hata oluştu. Lütfen sayfayı yenileyin veya manuel giriş yapın.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchUsers();
  }, [retryCount]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleUserSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const userId = e.target.value;
    
    if (userId === 'manual') {
      setShowManualEntry(true);
      setFormData(prev => ({
        ...prev,
        ownerId: '',
        ownerName: '',
        ownerContact: ''
      }));
      return;
    }
    
    setShowManualEntry(false);
    
    const selectedUser = users.find(user => user.id === userId);
    if (selectedUser) {
      setFormData(prev => ({
        ...prev,
        ownerId: selectedUser.id,
        ownerName: selectedUser.name,
        ownerContact: selectedUser.phone || selectedUser.email || ''
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setSubmitting(true);
      
      // Prepare data for API
      const petData = {
        name: formData.petName,
        type: formData.petType,
        breed: formData.petBreed || undefined,
        ownerId: formData.ownerId || undefined, // Only include if selected from dropdown
        ownerName: formData.ownerName,
        ownerContact: formData.ownerContact,
        birthDate: formData.birthDate || undefined,
        weight: formData.weight ? parseFloat(formData.weight) : undefined,
        lastCheckupDate: formData.lastCheckup,
        nextVaccineDate: formData.nextVaccine || undefined,
        status: formData.status,
        notes: formData.notes || undefined
      };
      
      // Send to API
      const result = await petHealthService.createPet(petData);
      console.log('Pet created successfully:', result);
      
      // Navigate back to list
      navigate('/admin/pet-health');
    } catch (error) {
      console.error('Error creating pet:', error);
      alert('Evcil hayvan kaydı oluşturulurken bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setSubmitting(false);
    }
  };
  
  const handleRetryUserLoad = () => {
    setRetryCount(prev => prev + 1);
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <button 
              onClick={() => navigate('/admin/pet-health')}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-2xl font-bold text-gray-800">Yeni Sağlık Kaydı Oluştur</h1>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => navigate('/admin/pet-health')}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
              disabled={submitting}
            >
              <X size={18} />
              <span>İptal</span>
            </button>
            <button 
              onClick={handleSubmit}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
              disabled={submitting}
            >
              {submitting ? <Loader size={18} className="animate-spin" /> : <Save size={18} />}
              <span>{submitting ? 'Kaydediliyor...' : 'Kaydet'}</span>
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h2 className="text-lg font-medium text-gray-800 mb-4">Evcil Hayvan Bilgileri</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label htmlFor="petName" className="block text-sm font-medium text-gray-700 mb-1">
                  Hayvan Adı *
                </label>
                <input
                  type="text"
                  id="petName"
                  name="petName"
                  value={formData.petName}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              
              <div>
                <label htmlFor="petType" className="block text-sm font-medium text-gray-700 mb-1">
                  Hayvan Türü *
                </label>
                <select
                  id="petType"
                  name="petType"
                  value={formData.petType}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Seçiniz</option>
                  <option value="Köpek">Köpek</option>
                  <option value="Kedi">Kedi</option>
                  <option value="Kuş">Kuş</option>
                  <option value="Balık">Balık</option>
                  <option value="Kemirgen">Kemirgen</option>
                  <option value="Sürüngen">Sürüngen</option>
                  <option value="Diğer">Diğer</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="petBreed" className="block text-sm font-medium text-gray-700 mb-1">
                  Irk
                </label>
                <input
                  type="text"
                  id="petBreed"
                  name="petBreed"
                  value={formData.petBreed}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              
              <div>
                <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700 mb-1">
                  Doğum Tarihi
                </label>
                <input
                  type="date"
                  id="birthDate"
                  name="birthDate"
                  value={formData.birthDate}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              
              <div>
                <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-1">
                  Ağırlık (kg)
                </label>
                <input
                  type="number"
                  id="weight"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  step="0.1"
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h2 className="text-lg font-medium text-gray-800 mb-4">Sahip Bilgileri</h2>
            
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                <div className="flex items-center">
                  <AlertCircle size={18} className="text-red-500 mr-2" />
                  <p className="text-sm text-red-700">{error}</p>
                  <button 
                    onClick={handleRetryUserLoad}
                    className="ml-auto px-2 py-1 bg-red-100 text-red-700 rounded text-xs hover:bg-red-200"
                  >
                    Yeniden Dene
                  </button>
                </div>
              </div>
            )}
            
            {loading ? (
              <div className="flex justify-center items-center py-6">
                <Loader className="animate-spin h-6 w-6 text-purple-600 mr-2" />
                <span className="text-gray-600">Kullanıcılar yükleniyor...</span>
              </div>
            ) : (
              <>
                <div className="mb-4">
                  <label htmlFor="ownerId" className="block text-sm font-medium text-gray-700 mb-1">
                    Kayıtlı Kullanıcı Seç *
                  </label>
                  <select
                    id="ownerId"
                    name="ownerId"
                    value={formData.ownerId}
                    onChange={handleUserSelect}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="">Kullanıcı Seçiniz</option>
                    {users.length > 0 ? (
                      users.map(user => (
                        <option key={user.id} value={user.id}>
                          {user.name} - {user.email || user.phone || 'İletişim bilgisi yok'}
                        </option>
                      ))
                    ) : (
                      <option value="" disabled>Kullanıcı bulunamadı</option>
                    )}
                    <option value="manual">Manuel Giriş</option>
                  </select>
                </div>
              </>
            )}
            
            {showManualEntry && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="ownerName" className="block text-sm font-medium text-gray-700 mb-1">
                    Sahip Adı *
                  </label>
                  <input
                    type="text"
                    id="ownerName"
                    name="ownerName"
                    value={formData.ownerName}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="ownerContact" className="block text-sm font-medium text-gray-700 mb-1">
                    İletişim Bilgisi *
                  </label>
                  <input
                    type="text"
                    id="ownerContact"
                    name="ownerContact"
                    value={formData.ownerContact}
                    onChange={handleChange}
                    required
                    placeholder="Telefon veya e-posta"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
            )}
            
            {!showManualEntry && formData.ownerId && (
              <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-md">
                <div className="flex items-start">
                  <UserCheck size={20} className="text-blue-500 mr-2 mt-0.5" />
                  <div>
                    <p className="text-sm text-blue-800">
                      <strong>Seçilen Kullanıcı:</strong> {formData.ownerName}
                    </p>
                    <p className="text-sm text-blue-800">
                      <strong>İletişim:</strong> {formData.ownerContact || 'Belirtilmemiş'}
                    </p>
                    <p className="text-xs text-blue-600 mt-1">
                      Kullanıcı ID: {formData.ownerId}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h2 className="text-lg font-medium text-gray-800 mb-4">Sağlık Bilgileri</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label htmlFor="lastCheckup" className="block text-sm font-medium text-gray-700 mb-1">
                  Son Kontrol Tarihi *
                </label>
                <input
                  type="date"
                  id="lastCheckup"
                  name="lastCheckup"
                  value={formData.lastCheckup}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              
              <div>
                <label htmlFor="nextVaccine" className="block text-sm font-medium text-gray-700 mb-1">
                  Sonraki Aşı Tarihi
                </label>
                <input
                  type="date"
                  id="nextVaccine"
                  name="nextVaccine"
                  value={formData.nextVaccine}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                  Sağlık Durumu *
                </label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="healthy">Sağlıklı</option>
                  <option value="treatment">Tedavi Altında</option>
                  <option value="critical">Kritik</option>
                </select>
              </div>
              
              <div className="md:col-span-2 lg:col-span-3">
                <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                  Notlar
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Sağlık durumu, tedavi bilgileri, özel notlar..."
                ></textarea>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <button 
              type="button"
              onClick={() => navigate('/admin/pet-health')}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              disabled={submitting}
            >
              İptal
            </button>
            <button 
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
              disabled={submitting}
            >
              {submitting ? <Loader size={18} className="animate-spin" /> : null}
              <span>{submitting ? 'Kaydediliyor...' : 'Kaydet'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PetHealthNew; 