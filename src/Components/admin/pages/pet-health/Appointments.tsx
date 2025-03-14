import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  ChevronDown, 
  ChevronUp, 
  Edit, 
  Trash2, 
  Eye, 
  Plus,
  AlertCircle,
  Calendar,
  CheckCircle,
  Clock,
  XCircle,
  Loader
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import * as petHealthService from '../../../../services/petHealthService';

interface AppointmentRecord {
  id: string;
  petId: string;
  petName: string;
  petType: string;
  ownerName: string;
  appointmentDate: string;
  appointmentTime: string;
  appointmentType: string;
  veterinarian: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'no-show';
  notes: string;
}

const Appointments: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const petIdFromQuery = queryParams.get('petId');
  
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<keyof AppointmentRecord>('appointmentDate');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [appointmentRecords, setAppointmentRecords] = useState<AppointmentRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPetId, setSelectedPetId] = useState<string | null>(petIdFromQuery);
  const [pets, setPets] = useState<any[]>([]);
  
  useEffect(() => {
    const fetchPets = async () => {
      try {
        const petsData = await petHealthService.getAllPets();
        setPets(petsData);
      } catch (err) {
        console.error('Error fetching pets:', err);
      }
    };
    
    fetchPets();
  }, []);
  
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setLoading(true);
        let allAppointments: AppointmentRecord[] = [];
        
        if (selectedPetId) {
          // Fetch appointments for a specific pet
          const petAppointments = await petHealthService.getPetAppointments(selectedPetId);
          const pet = pets.find(p => p.id === selectedPetId);
          
          if (pet && petAppointments) {
            allAppointments = petAppointments.map((appt: any) => ({
              id: appt.id,
              petId: selectedPetId,
              petName: pet.name,
              petType: pet.type,
              ownerName: pet.ownerName || 'Bilinmiyor',
              appointmentDate: appt.appointmentDate,
              appointmentTime: appt.appointmentTime,
              appointmentType: appt.appointmentType,
              veterinarian: appt.veterinarian,
              status: appt.status || 'scheduled',
              notes: appt.notes
            }));
          }
        } else {
          // Fetch appointments for all pets
          for (const pet of pets) {
            try {
              const petAppointments = await petHealthService.getPetAppointments(pet.id);
              
              if (petAppointments) {
                const petApptRecords = petAppointments.map((appt: any) => ({
                  id: appt.id,
                  petId: pet.id,
                  petName: pet.name,
                  petType: pet.type,
                  ownerName: pet.ownerName || 'Bilinmiyor',
                  appointmentDate: appt.appointmentDate,
                  appointmentTime: appt.appointmentTime,
                  appointmentType: appt.appointmentType,
                  veterinarian: appt.veterinarian,
                  status: appt.status || 'scheduled',
                  notes: appt.notes
                }));
                
                allAppointments = [...allAppointments, ...petApptRecords];
              }
            } catch (err) {
              console.error(`Error fetching appointments for pet ${pet.id}:`, err);
            }
          }
        }
        
        setAppointmentRecords(allAppointments);
        setError(null);
      } catch (err) {
        console.error('Error fetching appointment records:', err);
        setError('Randevu kayıtları yüklenirken bir hata oluştu.');
      } finally {
        setLoading(false);
      }
    };
    
    if (pets.length > 0) {
      fetchAppointments();
    }
  }, [selectedPetId, pets]);

  const handleSort = (field: keyof AppointmentRecord) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };
  
  const handleDelete = async (petId: string, appointmentId: string) => {
    if (window.confirm('Bu randevu kaydını silmek istediğinizden emin misiniz?')) {
      try {
        await petHealthService.deleteAppointment(petId, appointmentId);
        setAppointmentRecords(prevRecords => prevRecords.filter(record => record.id !== appointmentId));
      } catch (err) {
        console.error('Error deleting appointment:', err);
        alert('Randevu kaydı silinirken bir hata oluştu.');
      }
    }
  };
  
  const handlePetChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const petId = e.target.value || null;
    setSelectedPetId(petId);
    
    // Update URL query parameter
    if (petId) {
      navigate(`/admin/pet-health/appointments?petId=${petId}`);
    } else {
      navigate('/admin/pet-health/appointments');
    }
  };
  
  const handleDateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDate(e.target.value);
  };

  const filteredRecords = appointmentRecords
    .filter(record => 
      (searchTerm === '' || 
        record.petName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.ownerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.appointmentType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.veterinarian.toLowerCase().includes(searchTerm.toLowerCase())
      ) && 
      (selectedDate === '' || record.appointmentDate === selectedDate)
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

  const getStatusBadge = (status: AppointmentRecord['status']) => {
    switch (status) {
      case 'scheduled':
        return (
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800 flex items-center gap-1">
            <Calendar size={14} />
            <span>Planlandı</span>
          </span>
        );
      case 'completed':
        return (
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800 flex items-center gap-1">
            <CheckCircle size={14} />
            <span>Tamamlandı</span>
          </span>
        );
      case 'cancelled':
        return (
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800 flex items-center gap-1">
            <XCircle size={14} />
            <span>İptal Edildi</span>
          </span>
        );
      case 'no-show':
        return (
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800 flex items-center gap-1">
            <AlertCircle size={14} />
            <span>Gelmedi</span>
          </span>
        );
      default:
        return null;
    }
  };
  
  // Get unique dates from appointments for the date filter
  const uniqueDates = Array.from(new Set(appointmentRecords.map(record => record.appointmentDate)))
    .sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
  
  // Count upcoming appointments (scheduled appointments with future dates)
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const upcomingCount = appointmentRecords.filter(r => 
    r.status === 'scheduled' && new Date(r.appointmentDate) >= today
  ).length;

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
          <h1 className="text-2xl font-bold text-gray-800">Randevular</h1>
          <button 
            onClick={() => navigate(`/admin/pet-health/appointments/new${selectedPetId ? `?petId=${selectedPetId}` : ''}`)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
          >
            <Plus size={18} />
            <span>Yeni Randevu</span>
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
              placeholder="Hayvan adı, sahip adı veya randevu türü ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              value={selectedPetId || ''}
              onChange={handlePetChange}
            >
              <option value="">Tüm Hayvanlar</option>
              {pets.map(pet => (
                <option key={pet.id} value={pet.id}>
                  {pet.name} ({pet.type})
                </option>
              ))}
            </select>
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              value={selectedDate}
              onChange={handleDateChange}
            >
              <option value="">Tüm Tarihler</option>
              {uniqueDates.map(date => (
                <option key={date} value={date}>
                  {new Date(date).toLocaleDateString('tr-TR')}
                </option>
              ))}
            </select>
            <button className="px-4 py-2 border border-gray-300 rounded-lg flex items-center gap-2 hover:bg-gray-50">
              <Filter size={18} />
              <span>Filtrele</span>
            </button>
          </div>
        </div>

        {upcomingCount > 0 && (
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <Calendar className="h-5 w-5 text-blue-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-blue-700">
                  <strong>Bilgi:</strong> {upcomingCount} yaklaşan randevu bulunmaktadır.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('petName')}
                >
                  <div className="flex items-center gap-1">
                    Hayvan Adı
                    {sortField === 'petName' && (
                      sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                    )}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('petType')}
                >
                  <div className="flex items-center gap-1">
                    Tür
                    {sortField === 'petType' && (
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
                  onClick={() => handleSort('appointmentDate')}
                >
                  <div className="flex items-center gap-1">
                    Tarih
                    {sortField === 'appointmentDate' && (
                      sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                    )}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('appointmentTime')}
                >
                  <div className="flex items-center gap-1">
                    Saat
                    {sortField === 'appointmentTime' && (
                      sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                    )}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('appointmentType')}
                >
                  <div className="flex items-center gap-1">
                    Randevu Türü
                    {sortField === 'appointmentType' && (
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
                    <div className="text-sm font-medium text-gray-900">{record.petName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{record.petType}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{record.ownerName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {record.appointmentDate ? new Date(record.appointmentDate).toLocaleDateString('tr-TR') : '-'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{record.appointmentTime}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{record.appointmentType}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(record.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end gap-2">
                      <button className="p-1 text-indigo-600 hover:text-indigo-900" title="Görüntüle">
                        <Eye size={18} />
                      </button>
                      <button 
                        className="p-1 text-blue-600 hover:text-blue-900" 
                        title="Düzenle"
                        onClick={() => navigate(`/admin/pet-health/appointments/edit/${record.id}?petId=${record.petId}`)}
                      >
                        <Edit size={18} />
                      </button>
                      <button 
                        className="p-1 text-red-600 hover:text-red-900" 
                        title="Sil"
                        onClick={() => handleDelete(record.petId, record.id)}
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

export default Appointments; 