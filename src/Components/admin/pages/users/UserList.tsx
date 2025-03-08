import React from 'react';
import { Plus, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const UserList = () => {
  const users = [
    { id: 1, name: 'Ahmet Yılmaz', email: 'ahmet@example.com', role: 'Kullanıcı', status: 'Aktif', joinDate: '2024-02-15' },
    { id: 2, name: 'Mehmet Kaya', email: 'mehmet@example.com', role: 'Premium', status: 'Aktif', joinDate: '2024-01-20' },
    { id: 3, name: 'Ayşe Demir', email: 'ayse@example.com', role: 'Kullanıcı', status: 'Askıda', joinDate: '2024-03-10' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Kullanıcı Listesi</h1>
        <Link
          to="/users/new"
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center gap-2"
        >
          <Plus size={20} />
          Yeni Kullanıcı
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b border-gray-200">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Kullanıcı Ara..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200"
              />
            </div>
            <select className="px-4 py-2 rounded-lg border border-gray-200">
              <option value="">Tüm Roller</option>
              <option value="user">Kullanıcı</option>
              <option value="premium">Premium</option>
            </select>
            <select className="px-4 py-2 rounded-lg border border-gray-200">
              <option value="">Tüm Durumlar</option>
              <option value="aktif">Aktif</option>
              <option value="askida">Askıda</option>
              <option value="banned">Yasaklı</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kullanıcı</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">E-posta</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rol</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Durum</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kayıt Tarihi</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">İşlemler</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{user.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      user.role === 'Premium' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      user.status === 'Aktif' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.joinDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-indigo-600 hover:text-indigo-900 mr-3">Düzenle</button>
                    <button className="text-red-600 hover:text-red-900">Askıya Al</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Toplam 3 kullanıcı gösteriliyor
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

export default UserList;