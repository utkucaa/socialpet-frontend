import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Upload } from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import adminService, { DonationOrganization } from '../../../../services/adminService';

const DonationImageUpload = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [organization, setOrganization] = useState<DonationOrganization | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [fetchLoading, setFetchLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState<boolean>(false);

  useEffect(() => {
    if (id) {
      fetchOrganization(parseInt(id));
    }
  }, [id]);

  const fetchOrganization = async (organizationId: number) => {
    try {
      setFetchLoading(true);
      // Add a cache-busting parameter to the API request
      const timestamp = new Date().getTime();
      const data = await adminService.getDonationOrganizationDetails(organizationId);
      
      // Add timestamp to image URL to prevent caching
      if (data.imageUrl) {
        data.imageUrl = `${data.imageUrl}?t=${timestamp}`;
      }
      
      setOrganization(data);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Bağış kurumu bilgileri yüklenirken bir hata oluştu');
    } finally {
      setFetchLoading(false);
    }
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

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!id) {
      setError('Kurum ID bulunamadı');
      return;
    }
    
    if (!selectedFile) {
      setError('Lütfen bir resim seçin');
      return;
    }
    
    try {
      setLoading(true);
      // Upload the image and get the image URL
      const imageUrl = await adminService.uploadDonationOrganizationImage(parseInt(id), selectedFile);
      
      // Add a timestamp to force browser to reload the image
      const timestamp = new Date().getTime();
      const imageUrlWithTimestamp = `${imageUrl}?t=${timestamp}`;
      
      // Refresh the organization data to show the new image
      if (organization) {
        setOrganization({
          ...organization,
          imageUrl: imageUrlWithTimestamp
        });
      }
      
      setUploadSuccess(true);
      setError(null);
      
      // Redirect to the public donation page after a longer delay
      setTimeout(() => {
        window.location.href = 'http://localhost:3000/donate';
      }, 5000); // Longer delay to show the uploaded image
    } catch (err: any) {
      setError(err.message || 'Resim yüklenirken bir hata oluştu');
    } finally {
      setLoading(false);
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

  if (fetchLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (!organization) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
        <span className="block sm:inline">Bağış kurumu bulunamadı</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link to="/admin/donations/list" className="text-gray-500 hover:text-gray-700">
          <ArrowLeft size={24} />
        </Link>
        <h1 className="text-2xl font-semibold text-gray-900">Bağış Kurumu Resmi Yükle</h1>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="mb-6">
          <h2 className="text-lg font-medium text-gray-900">{organization.name}</h2>
          <p className="text-sm text-gray-500">{organization.description}</p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {uploadSuccess && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-6">
            <div className="flex flex-col items-center">
              <div className="text-center mb-3">
                <span className="block font-bold text-lg mb-1">Resim başarıyla yüklendi!</span>
                <p className="text-sm">Bağış sayfasına yönlendiriliyorsunuz... (5 saniye)</p>
              </div>
              {organization?.imageUrl && (
                <div className="w-32 h-32 overflow-hidden rounded border-2 border-green-500">
                  <img 
                    src={`${organization.imageUrl}?t=${new Date().getTime()}`} 
                    alt="Yüklenen resim" 
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-md font-medium text-gray-900 mb-2">Mevcut Resim</h3>
            {organization.imageUrl ? (
              <div className="border rounded-lg overflow-hidden h-64">
                <img 
                  src={`${organization.imageUrl}?t=${new Date().getTime()}`}
                  alt={organization.name} 
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="border rounded-lg flex items-center justify-center h-64 bg-gray-50">
                <p className="text-gray-500">Resim yok</p>
              </div>
            )}
          </div>

          <div>
            <h3 className="text-md font-medium text-gray-900 mb-2">Yeni Resim</h3>
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
        </div>

        <div className="flex justify-end mt-6">
          <button
            type="button"
            onClick={() => navigate('/admin/donations/list')}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-3"
          >
            İptal
          </button>
          <button
            type="button"
            onClick={handleUpload}
            disabled={!selectedFile || loading}
            className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${(!selectedFile || loading) ? 'opacity-75 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Yükleniyor...' : 'Resmi Yükle'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DonationImageUpload; 