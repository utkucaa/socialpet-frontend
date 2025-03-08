import React from 'react';
import { Plus, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const QnaList = () => {
  const questions = [
    { id: 1, title: 'Kedim çok az su içiyor, ne yapmalıyım?', status: 'Yanıtlandı', date: '2024-03-15', author: 'Zeynep K.' },
    { id: 2, title: 'Köpeğim için en iyi mama önerisi', status: 'Beklemede', date: '2024-03-14', author: 'Ali M.' },
    { id: 3, title: 'Kuşumun tüyleri dökülüyor', status: 'Yanıtlandı', date: '2024-03-13', author: 'Ayşe T.' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Soru-Cevap Listesi</h1>
        <Link
          to="/qna/new"
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center gap-2"
        >
          <Plus size={20} />
          Yeni Soru
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b border-gray-200">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Soru Ara..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200"
              />
            </div>
            <select className="px-4 py-2 rounded-lg border border-gray-200">
              <option value="">Tüm Durumlar</option>
              <option value="yanitlandi">Yanıtlandı</option>
              <option value="beklemede">Beklemede</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Soru</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Durum</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tarih</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Soran</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">İşlemler</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {questions.map((question) => (
                <tr key={question.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{question.title}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      question.status === 'Yanıtlandı' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {question.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{question.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{question.author}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-indigo-600 hover:text-indigo-900 mr-3">Yanıtla</button>
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
              Toplam 3 soru gösteriliyor
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

export default QnaList;