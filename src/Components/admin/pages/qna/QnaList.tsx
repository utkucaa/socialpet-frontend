import React, { useState, useEffect } from 'react';
import { Plus, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getAllQuestions, deleteQuestion, Question } from '../../../../services/qnaService';

const QnaList = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('');

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      setLoading(true);
      const data = await getAllQuestions();
      setQuestions(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching questions:', err);
      setError('Sorular yüklenirken bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Bu soruyu silmek istediğinizden emin misiniz?')) {
      try {
        await deleteQuestion(id);
        setQuestions(questions.filter(question => question.id !== id));
      } catch (err) {
        console.error('Error deleting question:', err);
        alert('Soru silinirken bir hata oluştu.');
      }
    }
  };

  const filteredQuestions = questions.filter(question => {
    const matchesSearch = question.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === '' || question.status?.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Soru-Cevap Listesi</h1>
        <Link
          to="/admin/qna/new"
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
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select 
              className="px-4 py-2 rounded-lg border border-gray-200"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">Tüm Durumlar</option>
              <option value="yanıtlandı">Yanıtlandı</option>
              <option value="beklemede">Beklemede</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="p-6 text-center">
            <p>Yükleniyor...</p>
          </div>
        ) : error ? (
          <div className="p-6 text-center text-red-500">
            <p>{error}</p>
          </div>
        ) : (
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
                {filteredQuestions.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                      Gösterilecek soru bulunamadı.
                    </td>
                  </tr>
                ) : (
                  filteredQuestions.map((question) => (
                    <tr key={question.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{question.title}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          question.status?.toLowerCase() === 'yanıtlandı' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {question.status || 'Beklemede'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {question.createdAt ? new Date(question.createdAt).toLocaleDateString('tr-TR') : '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {question.user?.name || `Kullanıcı #${question.user?.id}`}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link to={`/admin/qna/answer/${question.id}`} className="text-indigo-600 hover:text-indigo-900 mr-3">
                          Yanıtla
                        </Link>
                        <button 
                          className="text-red-600 hover:text-red-900"
                          onClick={() => question.id && handleDelete(question.id)}
                        >
                          Sil
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        <div className="px-6 py-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Toplam {filteredQuestions.length} soru gösteriliyor
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