import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { createQuestion } from '../../../../services/qnaService';
import userService, { User } from '../../../../services/userService';

const QnaNew = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('saglik');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<string>('');
  const [loadingUsers, setLoadingUsers] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoadingUsers(true);
      const userList = await userService.getUsers();
      setUsers(userList);
      setLoadingUsers(false);
    } catch (err: any) {
      console.error('Error fetching users:', err);
      setError('Kullanıcılar yüklenirken bir hata oluştu: ' + err.message);
      setLoadingUsers(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim() || !selectedUserId) {
      setError('Lütfen tüm alanları doldurun ve bir kullanıcı seçin.');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      await createQuestion({
        title,
        content,
        user: { id: parseInt(selectedUserId) },
        status: 'Beklemede'
      });
      
      navigate('/admin/qna/list');
    } catch (err) {
      console.error('Error creating question:', err);
      setError('Soru oluşturulurken bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link to="/admin/qna/list" className="text-gray-500 hover:text-gray-700">
          <ArrowLeft size={24} />
        </Link>
        <h1 className="text-2xl font-semibold text-gray-900">Yeni Soru Ekle</h1>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <div className="bg-white rounded-lg shadow p-6">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Kullanıcı</label>
              <select
                value={selectedUserId}
                onChange={(e) => setSelectedUserId(e.target.value)}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                disabled={loadingUsers}
              >
                <option value="">Kullanıcı Seçin</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.firstName || user.lastName ? `${user.firstName || ''} ${user.lastName || ''}`.trim() : user.username} ({user.email})
                  </option>
                ))}
              </select>
              {loadingUsers && <p className="mt-1 text-sm text-gray-500">Kullanıcılar yükleniyor...</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Soru Başlığı</label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Kategori</label>
              <select 
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="saglik">Sağlık</option>
                <option value="beslenme">Beslenme</option>
                <option value="egitim">Eğitim</option>
                <option value="bakim">Bakım</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Soru Detayı</label>
              <textarea
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <Link
              to="/admin/qna/list"
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              İptal
            </Link>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-indigo-300"
              disabled={loading || loadingUsers}
            >
              {loading ? 'Kaydediliyor...' : 'Kaydet'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default QnaNew;