import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  ChevronDown, 
  ChevronUp, 
  Edit, 
  Trash2, 
  Eye, 
  Syringe,
  AlertCircle,
  Loader
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import * as petHealthService from '../../../../services/petHealthService';

interface PetHealthRecord {
  id: string;
  name: string;
  type: string;
  breed: string;
  ownerName: string;
  lastCheckup: string;
  nextVaccine: string;
  status: 'healthy' | 'treatment' | 'critical';
  notes: string;
}

const PetHealthList: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<keyof PetHealthRecord>('lastCheckup');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [petHealthRecords, setPetHealthRecords] = useState<PetHealthRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchPets = async () => {
      try {
        setLoading(true);
        const pets = await petHealthService.getAllPets();
        
        // Transform API data to match our component's data structure
        const transformedData: PetHealthRecord[] = pets.map((pet: any) => ({
          id: pet.id,
          name: pet.name,
          type: pet.type,
          breed: pet.breed || '',
          ownerName: pet.ownerName || 'Bilinmiyor',
          lastCheckup: pet.lastCheckupDate || new Date().toISOString().split('T')[0],
          nextVaccine: pet.nextVaccineDate || '',
          status: determineHealthStatus(pet),
          notes: pet.notes || ''
        }));
        
        setPetHealthRecords(transformedData);
        setError(null);
      } catch (err) {
        console.error('Error fetching pet health records:', err);
        setError('Evcil hayvan kayıtları yüklenirken bir hata oluştu.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchPets();
  }, []);
  
  // Helper function to determine health status based on pet data
  const determineHealthStatus = (pet: any): 'healthy' | 'treatment' | 'critical' => {
    // This is a placeholder logic - adjust based on your actual API data structure
    if (pet.activeTreatments && pet.activeTreatments.length > 0) {
      return pet.criticalCondition ? 'critical' : 'treatment';
    }
    return 'healthy';
  };

  const handleSort = (field: keyof PetHealthRecord) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Bu evcil hayvan kaydını silmek istediğinizden emin misiniz?')) {
      try {
        await petHealthService.deletePet(id);
        setPetHealthRecords(prevRecords => prevRecords.filter(record => record.id !== id));
      } catch (err) {
        console.error('Error deleting pet:', err);
        alert('Evcil hayvan silinirken bir hata oluştu.');
      }
    }
  };

  const filteredRecords = petHealthRecords
    .filter(record => 
      record.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.ownerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.type.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      
      // Handle null or undefined values
      if (aValue == null && bValue == null) return 0;
      if (aValue == null) return sortDirection === 'asc' ? -1 : 1;
      if (bValue == null) return sortDirection === 'asc' ? 1 : -1;
      
      // Compare values
      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

  const getStatusBadge = (status: PetHealthRecord['status']) => {
    switch (status) {
      case 'healthy':
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">Sağlıklı</span>;
      case 'treatment':
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">Tedavi Altında</span>;
      case 'critical':
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">Kritik</span>;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader className="animate-spin h-8 w-8 text-indigo-600" />
        <span className="ml-2 text-gray-600">Yükleniyor...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
        <div className="flex">
          <div className="flex-shrink-0">
            <AlertCircle className="h-5 w-5 text-red-400" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Evcil Hayvan Sağlık Kayıtları</h1>
          <button 
            onClick={() => navigate('/admin/pet-health/new')}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Yeni Kayıt Ekle
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Hayvan adı, sahip adı veya tür ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="relative">
            <button className="px-4 py-2 border border-gray-300 rounded-lg flex items-center gap-2 hover:bg-gray-50">
              <Filter size={18} />
              <span>Filtrele</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('name')}
                >
                  <div className="flex items-center gap-1">
                    Hayvan Adı
                    {sortField === 'name' && (
                      sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                    )}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('type')}
                >
                  <div className="flex items-center gap-1">
                    Tür
                    {sortField === 'type' && (
                      sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                    )}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('ownerName')}
                >
                  <div className="flex items-center gap-1">
                    Sahip
                    {sortField === 'ownerName' && (
                      sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                    )}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('lastCheckup')}
                >
                  <div className="flex items-center gap-1">
                    Son Kontrol
                    {sortField === 'lastCheckup' && (
                      sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                    )}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('nextVaccine')}
                >
                  <div className="flex items-center gap-1">
                    Sonraki Aşı
                    {sortField === 'nextVaccine' && (
                      sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                    )}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('status')}
                >
                  <div className="flex items-center gap-1">
                    Durum
                    {sortField === 'status' && (
                      sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                    )}
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  İşlemler
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredRecords.map((record) => (
                <tr key={record.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{record.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{record.type}</div>
                    {record.breed && <div className="text-xs text-gray-400">{record.breed}</div>}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{record.ownerName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {record.lastCheckup ? new Date(record.lastCheckup).toLocaleDateString('tr-TR') : '-'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {record.nextVaccine ? new Date(record.nextVaccine).toLocaleDateString('tr-TR') : '-'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(record.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end gap-2">
                      <button className="p-1 text-indigo-600 hover:text-indigo-900" title="Görüntüle">
                        <Eye size={18} />
                      </button>
                      <Link to={`/admin/pet-health/edit/${record.id}`} className="p-1 text-blue-600 hover:text-blue-900" title="Düzenle">
                        <Edit size={18} />
                      </Link>
                      <Link to={`/admin/pet-health/vaccines?petId=${record.id}`} className="p-1 text-green-600 hover:text-green-900" title="Aşı Kayıtları">
                        <Syringe size={18} />
                      </Link>
                      <button 
                        className="p-1 text-red-600 hover:text-red-900" 
                        title="Sil"
                        onClick={() => handleDelete(record.id)}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredRecords.length === 0 && (
          <div className="text-center py-10">
            <AlertCircle className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">Kayıt bulunamadı</h3>
            <p className="mt-1 text-sm text-gray-500">Arama kriterlerinize uygun kayıt bulunamadı.</p>
          </div>
        )}

        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Toplam <span className="font-medium">{filteredRecords.length}</span> kayıt
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm">Önceki</button>
            <button className="px-3 py-1 bg-indigo-600 text-white rounded-md text-sm">1</button>
            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm">Sonraki</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetHealthList; 