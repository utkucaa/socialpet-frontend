import React from 'react';
import { Plus, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const AnnouncementList = () => {
  const announcements = [
    { id: 1, title: 'Sevimli Kedi Sahiplendirilecek', type: 'Sahiplendirme', status: 'Aktif', date: '2024-03-15', author: 'Ahmet Y.' },
    { id: 2, title: 'Golden Retriever Kayıp', type: 'Kayıp', status: 'Acil', date: '2024-03-14', author: 'Mehmet K.' },
    { id: 3, title: 'Muhabbet Kuşu Sahiplendirme', type: 'Sahiplendirme', status: 'Beklemede', date: '2024-03-13', author: 'Ayşe M.' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">İlan Listesi</h1>
        <Link
          to="/announcements/new"
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center gap-2"
        >
          <Plus size={20} />
          Yeni İlan
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b border-gray-200">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="İlan Ara..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200"
              />
            </div>
            <select className="px-4 py-2 rounded-lg border border-gray-200">
              <option value="">Tüm Tipler</option>
              <option value="sahiplendirme">Sahiplendirme</option>
              <option value="kayip">Kayıp</option>
            </select>
            <select className="px-4 py-2 rounded-lg border border-gray-200">
              <option value="">Tüm Durumlar</option>
              <option value="aktif">Aktif</option>
              <option value="beklemede">Beklemede</option>
              <option value="acil">Acil</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">İlan</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tip</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Durum</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tarih</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Yazar</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">İşlemler</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {announcements.map((announcement) => (
                <tr key={announcement.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{announcement.title}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                      {announcement.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      announcement.status === 'Aktif' ? 'bg-green-100 text-green-800' :
                      announcement.status === 'Acil' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {announcement.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{announcement.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{announcement.author}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-purple-600 hover:text-indigo-900 mr-3">Düzenle</button>
                    <button className="text-red-600 hover:text-red-900">Sil</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Toplam 3 ilan gösteriliyor
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

export default AnnouncementList;