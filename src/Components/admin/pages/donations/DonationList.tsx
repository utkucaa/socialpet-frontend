import React, { useState, useEffect } from 'react';
import { Plus, Search, Pencil, Trash2, ExternalLink, ToggleLeft, ToggleRight, Upload, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';
import adminService, { DonationOrganization } from '../../../../services/adminService';

const DonationList = () => {
  const [organizations, setOrganizations] = useState<DonationOrganization[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  useEffect(() => {
    fetchOrganizations();
  }, []);

  const fetchOrganizations = async () => {
    try {
      setLoading(true);
      const data = await adminService.getAllDonationOrganizations();
      
      // Add timestamp to image URLs to prevent caching
      const timestamp = new Date().getTime();
      const processedData = data.map(org => ({
        ...org,
        imageUrl: org.imageUrl ? `${org.imageUrl}?t=${timestamp}` : org.imageUrl
      }));
      
      setOrganizations(processedData);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Bağış kurumları yüklenirken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteOrganization = async (id: number) => {
    if (window.confirm('Bu bağış kurumunu silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.')) {
      try {
        await adminService.deleteDonationOrganization(id);
        // Refresh the organizations list
        fetchOrganizations();
      } catch (err: any) {
        setError(err.message || 'Bağış kurumu silinirken bir hata oluştu');
      }
    }
  };

  const handleToggleStatus = async (id: number) => {
    try {
      await adminService.toggleDonationOrganizationStatus(id);
      // Refresh the organizations list
      fetchOrganizations();
    } catch (err: any) {
      setError(err.message || 'Bağış kurumu durumu değiştirilirken bir hata oluştu');
    }
  };

  // Filter organizations based on search term and status filter
  const filteredOrganizations = organizations.filter(org => {
    const matchesSearch = searchTerm === '' || 
      org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      org.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || 
      (statusFilter === 'active' && org.active) || 
      (statusFilter === 'inactive' && !org.active);
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Bağış Kurumları</h1>
        <div className="flex gap-3">
          <button
            onClick={() => fetchOrganizations()}
            className="p-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center gap-1"
            title="Listeyi Yenile"
          >
            <RefreshCw size={18} />
            <span>Yenile</span>
          </button>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Kurum ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="py-2 px-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="all">Tüm Kurumlar</option>
            <option value="active">Aktif Kurumlar</option>
            <option value="inactive">Pasif Kurumlar</option>
          </select>
          
          <a
            href="http://localhost:3000/donate"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
          >
            <ExternalLink size={20} />
            Bağış Sayfasını Görüntüle
          </a>
          
          <Link
            to="/admin/donations/new"
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center gap-2"
          >
            <Plus size={20} />
            Yeni Kurum
          </Link>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      ) : filteredOrganizations.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <p className="text-gray-500">Henüz bağış kurumu bulunmamaktadır.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOrganizations.map((org) => (
            <div key={org.id} className={`bg-white rounded-lg shadow overflow-hidden ${!org.active ? 'opacity-70' : ''}`}>
              <div className="h-48 overflow-hidden relative">
                {org.imageUrl ? (
                  <img 
                    src={org.imageUrl} 
                    alt={org.name} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // If image fails to load, try reloading with a new timestamp
                      const target = e.target as HTMLImageElement;
                      if (!target.src.includes('?t=')) {
                        const timestamp = new Date().getTime();
                        target.src = `${org.imageUrl}?t=${timestamp}`;
                      }
                    }}
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500">Resim Yok</span>
                  </div>
                )}
                {!org.active && (
                  <div className="absolute inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
                    <span className="px-2 py-1 bg-red-600 text-white text-xs font-bold uppercase rounded">Pasif</span>
                  </div>
                )}
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-semibold text-gray-900">{org.name}</h3>
                  <button
                    onClick={() => handleToggleStatus(org.id)}
                    className={`p-1 rounded-full ${org.active ? 'text-green-600 hover:bg-green-50' : 'text-red-600 hover:bg-red-50'}`}
                    title={org.active ? 'Pasif Yap' : 'Aktif Yap'}
                  >
                    {org.active ? <ToggleRight size={20} /> : <ToggleLeft size={20} />}
                  </button>
                </div>
                <p className="text-gray-600 mt-1 line-clamp-2">{org.description}</p>
                
                <div className="mt-3 space-y-1">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Adres:</span> {org.address}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Telefon:</span> {org.phoneNumber}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">IBAN:</span> {org.iban}
                  </p>
                </div>

                <div className="mt-3 flex gap-2">
                  {org.website && (
                    <a href={org.website} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-800">
                      <ExternalLink size={20} />
                    </a>
                  )}
                  {org.facebookUrl && (
                    <a href={org.facebookUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                      </svg>
                    </a>
                  )}
                  {org.twitterUrl && (
                    <a href={org.twitterUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-600">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                      </svg>
                    </a>
                  )}
                  {org.instagramUrl && (
                    <a href={org.instagramUrl} target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:text-pink-800">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    </a>
                  )}
                </div>

                <div className="mt-4 flex justify-end gap-2">
                  <Link
                    to={`/admin/donations/edit/${org.id}`}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
                    title="Düzenle"
                  >
                    <Pencil size={18} />
                  </Link>
                  <Link
                    to={`/admin/donations/upload-image/${org.id}`}
                    className="p-2 text-green-600 hover:bg-green-50 rounded-full"
                    title="Resim Yükle"
                  >
                    <Upload size={18} />
                  </Link>
                  <button
                    onClick={() => handleDeleteOrganization(org.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                    title="Sil"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DonationList; 