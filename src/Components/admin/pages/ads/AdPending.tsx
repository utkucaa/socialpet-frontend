import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Search, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import axiosInstance from '../../../../services/axios';
import adminService, { PendingCounts, PendingAdoption, PendingLostPet } from '../../../../services/adminService';

type AdType = 'all' | 'sahiplendirme' | 'kayip';
type PriorityType = 'all' | 'normal' | 'yuksek' | 'acil';

interface PendingAd {
  id: string;
  title: string;
  type: 'Sahiplendirme' | 'Kayıp';
  priority: string;
  submittedDate: string;
  submittedBy: string;
  userId?: string;
  description?: string;
  imageUrl?: string;
}

interface User {
  id: string;
  userName: string;
  firstName?: string;
  lastName?: string;
}

const API_BASE_URL = 'http://localhost:8080';

const AdPending = () => {
  const [pendingAds, setPendingAds] = useState<PendingAd[]>([]);
  const [pendingCounts, setPendingCounts] = useState<PendingCounts>({
    pendingAdoptionsCount: 0,
    pendingLostPetsCount: 0,
    totalPendingCount: 0
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [typeFilter, setTypeFilter] = useState<AdType>('all');
  const [priorityFilter, setPriorityFilter] = useState<PriorityType>('all');
  const [userFilter, setUserFilter] = useState<string>('all');
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    // Fetch users first, then fetch pending ads and counts
    fetchUsers().then(() => {
      fetchPendingAds();
      fetchPendingCounts();
    });
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axiosInstance.get('/api/v1/admin/users');
      setUsers(response.data);
      return response.data;
    } catch (err: any) {
      console.error('Error fetching users:', err);
      setError('Kullanıcılar yüklenirken bir hata oluştu: ' + err.message);
      return [];
    }
  };

  const fetchPendingCounts = async () => {
    try {
      const counts = await adminService.getPendingCounts();
      setPendingCounts(counts);
    } catch (err: any) {
      console.error('Error fetching pending counts:', err);
    }
  };

  const fetchPendingAds = async () => {
    setLoading(true);
    setError(null);
    try {
      // Fetch all pending listings using the adminService
      const pendingListings = await adminService.getPendingListings();
      
      // Process adoption listings
      const pendingAdoptionAds: PendingAd[] = pendingListings.pendingAdoptions.map((listing: PendingAdoption) => {
        return {
          id: listing.id.toString(),
          title: listing.title,
          type: 'Sahiplendirme',
          priority: getPriorityFromDate(listing.createdAt),
          submittedDate: new Date(listing.createdAt).toISOString().split('T')[0],
          submittedBy: listing.fullName,
          userId: listing.user?.id?.toString(),
          description: listing.description,
          imageUrl: listing.imageUrl
        };
      });

      // Process lost pet listings
      const pendingLostPetAds: PendingAd[] = pendingListings.pendingLostPets.map((listing: PendingLostPet) => {
        return {
          id: listing.id.toString(),
          title: listing.title,
          type: 'Kayıp',
          priority: getPriorityFromDate(listing.lastSeenDate || ''),
          submittedDate: listing.lastSeenDate || '',
          submittedBy: listing.contactInfo || 'Bilinmiyor',
          userId: listing.user?.id?.toString(),
          description: listing.details,
          imageUrl: listing.imageUrl
        };
      });

      // Combine both types of pending listings
      setPendingAds([...pendingAdoptionAds, ...pendingLostPetAds]);
    } catch (err: any) {
      setError(err.message || 'Onay bekleyen ilanlar yüklenirken bir hata oluştu');
      console.error('Error fetching pending ads:', err);
    } finally {
      setLoading(false);
    }
  };

  // Helper function to determine priority based on submission date
  const getPriorityFromDate = (dateString: string): string => {
    const submissionDate = new Date(dateString);
    const now = new Date();
    const daysDifference = Math.floor((now.getTime() - submissionDate.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysDifference > 7) {
      return 'Acil';
    } else if (daysDifference > 3) {
      return 'Yüksek';
    } else {
      return 'Normal';
    }
  };

  const handleApprove = async (id: string, type: 'Sahiplendirme' | 'Kayıp') => {
    if (!window.confirm('Bu ilanı onaylamak istediğinize emin misiniz?')) {
      return;
    }

    try {
      if (type === 'Sahiplendirme') {
        // Use the adminService to approve adoption
        await adminService.approveAdoption(id);
      } else {
        // Use the adminService to approve lost pet
        await adminService.approveLostPet(id);
      }
      
      // Refresh the list and counts after approval
      fetchPendingAds();
      fetchPendingCounts();
    } catch (err: any) {
      alert(`İlan onaylanırken bir hata oluştu: ${err.message}`);
      console.error('Error approving ad:', err);
    }
  };

  const handleReject = async (id: string, type: 'Sahiplendirme' | 'Kayıp') => {
    if (!window.confirm('Bu ilanı reddetmek istediğinize emin misiniz?')) {
      return;
    }

    try {
      if (type === 'Sahiplendirme') {
        // Use the adminService to reject adoption
        await adminService.rejectAdoption(id);
      } else {
        // Use the adminService to reject lost pet
        await adminService.rejectLostPet(id);
      }
      
      // Refresh the list and counts after rejection
      fetchPendingAds();
      fetchPendingCounts();
    } catch (err: any) {
      alert(`İlan reddedilirken bir hata oluştu: ${err.message}`);
      console.error('Error rejecting ad:', err);
    }
  };

  // Function to approve all filtered ads
  const handleApproveAll = async () => {
    if (!window.confirm('Filtrelenmiş tüm ilanları onaylamak istediğinize emin misiniz?')) {
      return;
    }

    try {
      const approvalPromises = filteredAds.map(ad => handleApprove(ad.id, ad.type));

      await Promise.all(approvalPromises);
      
      fetchPendingAds();
      fetchPendingCounts();
    } catch (err: any) {
      alert(`İlanlar toplu onaylanırken bir hata oluştu: ${err.message}`);
      console.error('Error approving all ads:', err);
    }
  };

  const filteredAds = pendingAds.filter(ad => {
    const matchesSearch = searchTerm === '' || 
      ad.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (ad.description && ad.description.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesType = typeFilter === 'all' || 
      (typeFilter === 'sahiplendirme' && ad.type === 'Sahiplendirme') ||
      (typeFilter === 'kayip' && ad.type === 'Kayıp');
    
    const matchesPriority = priorityFilter === 'all' || 
      ad.priority.toLowerCase() === priorityFilter;
    
    const matchesUser = userFilter === 'all' || 
      ad.userId === userFilter;
    
    return matchesSearch && matchesType && matchesPriority && matchesUser;
  });

  // Get user name by ID
  const getUserName = (userId?: string) => {
    if (!userId) return 'Bilinmiyor';
    const user = users.find(u => u.id.toString() === userId);
    return user ? (user.firstName || user.lastName || user.userName) : 'Bilinmiyor';
  };

  // Get priority badge color
  const getPriorityBadgeColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'acil':
        return 'bg-red-100 text-red-800';
      case 'yüksek':
      case 'yuksek':
        return 'bg-orange-100 text-orange-800';
      case 'normal':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Onay Bekleyen İlanlar</h1>
        <div className="flex gap-2">
          <button 
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
            onClick={handleApproveAll}
            disabled={filteredAds.length === 0}
          >
            <CheckCircle size={20} />
            Tümünü Onayla
          </button>
        </div>
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
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value as PriorityType)}
            >
              <option value="all">Tüm Öncelikler</option>
              <option value="acil">Acil</option>
              <option value="yuksek">Yüksek</option>
              <option value="normal">Normal</option>
            </select>
            <select 
              className="px-4 py-2 rounded-lg border border-gray-200"
              value={userFilter}
              onChange={(e) => setUserFilter(e.target.value)}
            >
              <option value="all">Tüm Kullanıcılar</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.firstName || user.lastName || user.userName}
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
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Öncelik</th>
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
                      Onay bekleyen ilan bulunamadı
                    </td>
                  </tr>
                ) : (
                  filteredAds.map((ad) => (
                    <tr key={ad.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {ad.imageUrl && (
                            <img 
                              src={ad.imageUrl.startsWith('http') ? ad.imageUrl : `${API_BASE_URL}${ad.imageUrl}`} 
                              alt={ad.title}
                              className="w-10 h-10 rounded-full object-cover mr-3"
                            />
                          )}
                          <div className="text-sm font-medium text-gray-900">{ad.title}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                          {ad.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getPriorityBadgeColor(ad.priority)}`}>
                          {ad.priority}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ad.submittedDate}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {getUserName(ad.userId)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ad.submittedBy}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link 
                          to={`/admin/ads/view/${ad.id}`} 
                          className="text-blue-600 hover:text-blue-900 mr-3"
                        >
                          <Eye size={18} />
                        </Link>
                        <button 
                          className="text-green-600 hover:text-green-900 mr-3"
                          onClick={() => handleApprove(ad.id, ad.type)}
                        >
                          <CheckCircle size={18} />
                        </button>
                        <button 
                          className="text-red-600 hover:text-red-900"
                          onClick={() => handleReject(ad.id, ad.type)}
                        >
                          <XCircle size={18} />
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
              Toplam {filteredAds.length} onay bekleyen ilan gösteriliyor
            </div>
            <div className="flex gap-2">
              <button className="px-3 py-1 border border-gray-300 rounded-md text-sm">Önceki</button>
              <button className="px-3 py-1 bg-indigo-600 text-white rounded-md text-sm">1</button>
              <button className="px-3 py-1 border border-gray-300 rounded-md text-sm">Sonraki</button>
            </div>
          </div>
        </div>
      </div>

      {/* İstatistik Kartları */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500">Toplam Bekleyen</p>
              <p className="text-2xl font-semibold mt-2">{pendingCounts.totalPendingCount}</p>
            </div>
            <div className="p-3 rounded-lg bg-yellow-50">
              <XCircle className="w-6 h-6 text-yellow-500" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500">Sahiplendirme İlanları</p>
              <p className="text-2xl font-semibold mt-2">
                {pendingCounts.pendingAdoptionsCount}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-blue-50">
              <XCircle className="w-6 h-6 text-blue-500" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500">Kayıp İlanları</p>
              <p className="text-2xl font-semibold mt-2">{pendingCounts.pendingLostPetsCount}</p>
            </div>
            <div className="p-3 rounded-lg bg-red-50">
              <XCircle className="w-6 h-6 text-red-500" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdPending; 