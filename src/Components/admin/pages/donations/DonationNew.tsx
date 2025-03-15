import React, { useState, useRef } from 'react';
import { ArrowLeft, Upload } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import adminService, { CreateDonationOrganizationRequest } from '../../../../services/adminService';

const DonationNew = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<CreateDonationOrganizationRequest>({
    name: '',
    description: '',
    phoneNumber: '',
    iban: '',
    address: '',
    website: '',
    instagramUrl: '',
    active: true
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setSelectedFile(file);
      
      // Create a preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const file = files[0];
      setSelectedFile(file);
      
      // Create a preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.description || !formData.phoneNumber || !formData.iban || !formData.address) {
      setError('Lütfen zorunlu alanları doldurun (Kurum Adı, Açıklama, Telefon, IBAN ve Adres)');
      return;
    }
    
    try {
      setLoading(true);
      // First create the organization
      const newOrganization = await adminService.createDonationOrganization(formData);
      
      // Then upload the image if one was selected
      if (selectedFile) {
        try {
          // Add a loading message
          setError('Resim yükleniyor, lütfen bekleyin...');
          
          // Upload the image
          await adminService.uploadDonationOrganizationImage(newOrganization.id, selectedFile);
          console.log('Image uploaded successfully');
          
          // Clear any error messages
          setError(null);
          
          // Show success message
          alert('Kurum ve resim başarıyla kaydedildi!');
        } catch (imageError) {
          console.error('Error uploading image:', imageError);
          setError('Kurum kaydedildi fakat resim yüklenirken bir hata oluştu. Daha sonra resim yükleme sayfasından tekrar deneyebilirsiniz.');
          // Continue with redirect even if image upload fails
        }
      } else {
        // Show success message
        alert('Kurum başarıyla kaydedildi!');
      }
      
      // Add a longer delay before redirecting to ensure the server has time to process the image
      setTimeout(() => {
        // Redirect to the public donation page
        window.location.href = 'http://localhost:3000/donate';
      }, 2000);
    } catch (err: any) {
      setError(err.message || 'Bağış kurumu oluşturulurken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link to="/admin/donations/list" className="text-gray-500 hover:text-gray-700">
          <ArrowLeft size={24} />
        </Link>
        <h1 className="text-2xl font-semibold text-gray-900">Yeni Bağış Kurumu Ekle</h1>
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
            <div 
              className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center h-64 bg-gray-50 cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              {previewUrl ? (
                <div className="w-full h-full overflow-hidden">
                  <img 
                    src={previewUrl} 
                    alt="Önizleme" 
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <>
                  <Upload size={40} className="text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500 text-center">
                    Resim yüklemek için tıklayın veya sürükleyip bırakın
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    PNG, JPG, JPEG (max. 5MB)
                  </p>
                </>
              )}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/png, image/jpeg, image/jpg"
                className="hidden"
              />
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
                Aktif (Hemen yayınla)
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
              {loading ? 'Kaydediliyor...' : 'Kaydet'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DonationNew; 