import React, { useState, useEffect } from 'react';
import { ArrowLeft, Upload } from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import adminService, { CreateDonationOrganizationRequest, DonationOrganization } from '../../../../services/adminService';

const DonationEdit = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [fetchLoading, setFetchLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [organization, setOrganization] = useState<DonationOrganization | null>(null);
  
  const [formData, setFormData] = useState<CreateDonationOrganizationRequest>({
    name: '',
    description: '',
    phoneNumber: '',
    iban: '',
    address: '',
    website: '',
    facebookUrl: '',
    twitterUrl: '',
    instagramUrl: '',
    active: true
  });

  useEffect(() => {
    if (id) {
      fetchOrganization(parseInt(id));
    }
  }, [id]);

  const fetchOrganization = async (organizationId: number) => {
    try {
      setFetchLoading(true);
      const data = await adminService.getDonationOrganizationDetails(organizationId);
      setOrganization(data);
      
      setFormData({
        name: data.name,
        description: data.description,
        phoneNumber: data.phoneNumber,
        iban: data.iban,
        address: data.address,
        website: data.website || '',
        facebookUrl: data.facebookUrl || '',
        twitterUrl: data.twitterUrl || '',
        instagramUrl: data.instagramUrl || '',
        active: data.active
      });
      
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Bağış kurumu bilgileri yüklenirken bir hata oluştu');
    } finally {
      setFetchLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.description || !formData.phoneNumber || !formData.iban || !formData.address) {
      setError('Lütfen zorunlu alanları doldurun (Kurum Adı, Açıklama, Telefon, IBAN ve Adres)');
      return;
    }
    
    if (!id) {
      setError('Kurum ID bulunamadı');
      return;
    }
    
    try {
      setLoading(true);
      await adminService.updateDonationOrganization(parseInt(id), formData);
      // Redirect to the public donation page instead of the admin list
      window.location.href = 'http://localhost:3000/donate';
    } catch (err: any) {
      setError(err.message || 'Bağış kurumu güncellenirken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link to="/admin/donations/list" className="text-gray-500 hover:text-gray-700">
          <ArrowLeft size={24} />
        </Link>
        <h1 className="text-2xl font-semibold text-gray-900">Bağış Kurumu Düzenle</h1>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      <div className="bg-white rounded-lg shadow p-6">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Kurum Adı *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Telefon Numarası *</label>
              <input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Açıklama *</label>
            <textarea
              id="description"
              name="description"
              rows={3}
              value={formData.description}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">Adres *</label>
            <textarea
              id="address"
              name="address"
              rows={2}
              value={formData.address}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label htmlFor="iban" className="block text-sm font-medium text-gray-700">IBAN *</label>
            <input
              type="text"
              id="iban"
              name="iban"
              value={formData.iban}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Kurum Resmi</label>
            <div className="border rounded-lg overflow-hidden h-64 bg-gray-50">
              {organization?.imageUrl ? (
                <div className="relative h-full">
                  <img 
                    src={organization.imageUrl} 
                    alt={organization.name} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <Link
                      to={`/admin/donations/upload-image/${id}`}
                      className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center gap-2"
                    >
                      <Upload size={20} />
                      Resmi Değiştir
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center">
                  <p className="text-gray-500 mb-4">Henüz resim yüklenmemiş</p>
                  <Link
                    to={`/admin/donations/upload-image/${id}`}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center gap-2"
                  >
                    <Upload size={20} />
                    Resim Yükle
                  </Link>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="website" className="block text-sm font-medium text-gray-700">Web Sitesi</label>
              <input
                type="text"
                id="website"
                name="website"
                value={formData.website}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label htmlFor="facebookUrl" className="block text-sm font-medium text-gray-700">Facebook URL</label>
              <input
                type="text"
                id="facebookUrl"
                name="facebookUrl"
                value={formData.facebookUrl}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="twitterUrl" className="block text-sm font-medium text-gray-700">Twitter URL</label>
              <input
                type="text"
                id="twitterUrl"
                name="twitterUrl"
                value={formData.twitterUrl}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label htmlFor="instagramUrl" className="block text-sm font-medium text-gray-700">Instagram URL</label>
              <input
                type="text"
                id="instagramUrl"
                name="instagramUrl"
                value={formData.instagramUrl}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="active"
                name="active"
                checked={formData.active}
                onChange={handleCheckboxChange}
                className="h-4 w-4 text-purple-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="active" className="ml-2 block text-sm text-gray-700">
                Aktif (Sitede görüntülensin)
              </label>
            </div>
            <p className="mt-1 text-sm text-gray-500">
              İşaretlenmezse, kurum pasif olarak kaydedilir ve sitede görüntülenmez.
            </p>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => navigate('/admin/donations/list')}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-3"
            >
              İptal
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${loading ? 'opacity-75 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Güncelleniyor...' : 'Güncelle'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DonationEdit; 