import React, { useState, useEffect } from 'react';
import { Plus, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import adoptionService, { AdoptionListingDetail } from '../../../../services/adoptionService';
import lostPetService, { LostPet } from '../../../../services/lostPetService';
import userService, { User } from '../../../../services/userService';

type AdType = 'all' | 'sahiplendirme' | 'kayip';
type StatusType = 'all' | 'aktif' | 'beklemede' | 'acil';

interface Ad {
  id: string;
  title: string;
  type: 'Sahiplendirme' | 'Kayıp';
  status: string;
  date: string;
  author: string;
  userId?: string;
}

const AdList = () => {
  const [ads, setAds] = useState<Ad[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [typeFilter, setTypeFilter] = useState<AdType>('all');
  const [statusFilter, setStatusFilter] = useState<StatusType>('all');
  const [userFilter, setUserFilter] = useState<string>('all');
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    // Fetch users first, then fetch ads
    fetchUsers().then(() => {
      fetchAds();
    });
  }, []);

  const fetchUsers = async () => {
    try {
      const userList = await userService.getUsers();
      setUsers(userList);
      return userList;
    } catch (err: any) {
      console.error('Error fetching users:', err);
      setError('Kullanıcılar yüklenirken bir hata oluştu: ' + err.message);
      return [];
    }
  };

  const fetchAds = async () => {
    setLoading(true);
    setError(null);
    try {
      // Fetch both adoption and lost pet listings
      const [adoptionListings, lostPetListings] = await Promise.all([
        adoptionService.getAdoptionListings(),
        lostPetService.getLostPets()
      ]);

      // Transform adoption listings to common format
      const adoptionAds: Ad[] = adoptionListings.map((listing: AdoptionListingDetail) => {
        // Extract user ID if available
        const userId = (listing as any).user?.id?.toString();
        
        return {
          id: listing.id,
          title: listing.title,
          type: 'Sahiplendirme',
          status: listing.status || 'Aktif',
          date: new Date(listing.createdAt).toISOString().split('T')[0],
          author: listing.fullName,
          userId: userId
        };
      });

      // Transform lost pet listings to common format
      const lostPetAds: Ad[] = lostPetListings.map((listing: LostPet) => ({
        id: listing.id || '',
        title: listing.title,
        type: 'Kayıp',
        status: listing.status,
        date: listing.lastSeenDate || new Date(listing.timestamp).toISOString().split('T')[0],
        author: listing.contactInfo || 'Bilinmiyor',
        userId: listing.userId?.toString()
      }));

      // Combine both types of listings
      setAds([...adoptionAds, ...lostPetAds]);
    } catch (err: any) {
      setError(err.message || 'İlanlar yüklenirken bir hata oluştu');
      console.error('Error fetching ads:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, type: 'Sahiplendirme' | 'Kayıp') => {
    if (!window.confirm('Bu ilanı silmek istediğinize emin misiniz?')) {
      return;
    }

    try {
      if (type === 'Sahiplendirme') {
        await adoptionService.deleteAdoptionListing(id);
      } else {
        // For lost pets, we need a userId. In a real app, you'd get this from auth context
        const ad = ads.find(a => a.id === id);
        const userId = ad?.userId || '1';
        await lostPetService.deleteLostPet(id, userId);
      }
      
      // Refresh the list after deletion
      fetchAds();
    } catch (err: any) {
      alert(`İlan silinirken bir hata oluştu: ${err.message}`);
      console.error('Error deleting ad:', err);
    }
  };

  // Filter ads based on search term and filters
  const filteredAds = ads.filter(ad => {
    const matchesSearch = searchTerm === '' || 
      ad.title.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = typeFilter === 'all' || 
      (typeFilter === 'sahiplendirme' && ad.type === 'Sahiplendirme') ||
      (typeFilter === 'kayip' && ad.type === 'Kayıp');
    
    const matchesStatus = statusFilter === 'all' || 
      ad.status.toLowerCase() === statusFilter;
    
    const matchesUser = userFilter === 'all' || 
      ad.userId === userFilter;
    
    return matchesSearch && matchesType && matchesStatus && matchesUser;
  });

  // Get user name by ID
  const getUserName = (userId?: string) => {
    if (!userId) return 'Bilinmiyor';
    const user = users.find(u => u.id.toString() === userId);
    return user ? (user.firstName || user.lastName) : 'Bilinmiyor';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">İlan Listesi</h1>
        <Link
          to="/admin/ads/new"
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center gap-2"
        >
          <Plus size={20} />
          Yeni İlan
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-wrap gap-4">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="İlan Ara..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select 
              className="px-4 py-2 rounded-lg border border-gray-200"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value as AdType)}
            >
              <option value="all">Tüm Tipler</option>
              <option value="sahiplendirme">Sahiplendirme</option>
              <option value="kayip">Kayıp</option>
            </select>
            <select 
              className="px-4 py-2 rounded-lg border border-gray-200"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as StatusType)}
            >
              <option value="all">Tüm Durumlar</option>
              <option value="aktif">Aktif</option>
              <option value="beklemede">Beklemede</option>
              <option value="acil">Acil</option>
            </select>
            <select 
              className="px-4 py-2 rounded-lg border border-gray-200"
              value={userFilter}
              onChange={(e) => setUserFilter(e.target.value)}
            >
              <option value="all">Tüm Kullanıcılar</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.firstName || user.lastName}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-6 text-center">Yükleniyor...</div>
          ) : error ? (
            <div className="p-6 text-center text-red-500">{error}</div>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">İlan</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tip</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Durum</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tarih</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kullanıcı</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">İletişim</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">İşlemler</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAds.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                      Gösterilecek ilan bulunamadı
                    </td>
                  </tr>
                ) : (
                  filteredAds.map((ad) => (
                    <tr key={ad.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{ad.title}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                          {ad.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          ad.status === 'Aktif' ? 'bg-green-100 text-green-800' :
                          ad.status === 'Acil' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {ad.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ad.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {getUserName(ad.userId)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ad.author}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link 
                          to={`/admin/ads/edit/${ad.id}`} 
                          className="text-purple-600 hover:text-indigo-900 mr-3"
                        >
                          Düzenle
                        </Link>
                        <button 
                          className="text-red-600 hover:text-red-900"
                          onClick={() => handleDelete(ad.id, ad.type)}
                        >
                          Sil
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>

        <div className="px-6 py-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Toplam {filteredAds.length} ilan gösteriliyor
            </div>
            <div className="flex gap-2">
              <button className="px-3 py-1 border border-gray-300 rounded-md text-sm">Önceki</button>
              <button className="px-3 py-1 bg-indigo-600 text-white rounded-md text-sm">1</button>
              <button className="px-3 py-1 border border-gray-300 rounded-md text-sm">Sonraki</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdList;