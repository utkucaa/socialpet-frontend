import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { getQuestionById, createAnswer, getAnswersByQuestionId, Answer, updateQuestion } from '../../../../services/qnaService';
import userService, { User } from '../../../../services/userService';

const QnaAnswer = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [question, setQuestion] = useState<any>(null);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<string>('');
  const [loadingUsers, setLoadingUsers] = useState(true);

  useEffect(() => {
    if (id) {
      Promise.all([
        fetchQuestionAndAnswers(parseInt(id)),
        fetchUsers()
      ]);
    }
  }, [id]);

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

  const fetchQuestionAndAnswers = async (questionId: number) => {
    try {
      setLoading(true);
      const questionData = await getQuestionById(questionId);
      setQuestion(questionData);
      
      try {
        const answersData = await getAnswersByQuestionId(questionId);
        setAnswers(answersData);
      } catch (err) {
        console.error('Error fetching answers:', err);
        // Continue even if answers can't be fetched
        setAnswers([]);
      }
      
      setError(null);
    } catch (err) {
      console.error('Error fetching question:', err);
      setError('Soru yüklenirken bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!content.trim() || !selectedUserId) {
      setError('Lütfen cevap içeriğini girin ve bir kullanıcı seçin.');
      return;
    }

    try {
      setSubmitting(true);
      setError(null);
      
      await createAnswer({
        content,
        question: { id: parseInt(id!) },
        user: { id: parseInt(selectedUserId) }
      });
      
      // Update the question status to "Yanıtlandı"
      if (question && question.id) {
        await updateQuestion(question.id, {
          ...question,
          status: 'Yanıtlandı'
        });
      }
      
      // Refresh the answers list
      const answersData = await getAnswersByQuestionId(parseInt(id!));
      setAnswers(answersData);
      
      // Refresh the question to get updated status
      const updatedQuestion = await getQuestionById(parseInt(id!));
      setQuestion(updatedQuestion);
      
      // Clear the form
      setContent('');
      setSelectedUserId('');
    } catch (err) {
      console.error('Error creating answer:', err);
      setError('Cevap gönderilirken bir hata oluştu.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p>Yükleniyor...</p>
      </div>
    );
  }

  if (error && !question) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
        {error}
        <div className="mt-4">
          <Link to="/admin/qna/list" className="text-red-700 underline">
            Soru listesine dön
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link to="/admin/qna/list" className="text-gray-500 hover:text-gray-700">
          <ArrowLeft size={24} />
        </Link>
        <h1 className="text-2xl font-semibold text-gray-900">Soruyu Yanıtla</h1>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {question && (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-medium text-gray-900">{question.title}</h2>
            <div className="mt-2 flex items-center gap-4">
              <span className="text-sm text-gray-500">
                {question.user?.name || `Kullanıcı #${question.user?.id}`}
              </span>
              <span className="text-sm text-gray-500">
                {question.createdAt ? new Date(question.createdAt).toLocaleDateString('tr-TR') : '-'}
              </span>
              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                question.status?.toLowerCase() === 'yanıtlandı' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
              }`}>
                {question.status || 'Beklemede'}
              </span>
            </div>
            <div className="mt-4 text-gray-700 whitespace-pre-wrap">
              {question.content}
            </div>
          </div>

          {answers.length > 0 && (
            <div className="p-6 border-b border-gray-200 bg-gray-50">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Cevaplar</h3>
              <div className="space-y-4">
                {answers.map((answer) => (
                  <div key={answer.id} className="bg-white p-4 rounded-lg border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-900">
                        {answer.user?.name || `Kullanıcı #${answer.user?.id}`}
                      </span>
                      <span className="text-sm text-gray-500">
                        {answer.createdAt ? new Date(answer.createdAt).toLocaleDateString('tr-TR') : '-'}
                      </span>
                    </div>
                    <div className="text-gray-700 whitespace-pre-wrap">
                      {answer.content}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Cevap Yaz</h3>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Yanıtlayan Kullanıcı</label>
                  <select
                    value={selectedUserId}
                    onChange={(e) => setSelectedUserId(e.target.value)}
                    required
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    disabled={loadingUsers || submitting}
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cevap İçeriği</label>
                  <textarea
                    rows={4}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="Cevabınızı buraya yazın..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                    disabled={submitting}
                  />
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-indigo-300"
                  disabled={submitting || loadingUsers}
                >
                  {submitting ? 'Gönderiliyor...' : 'Cevabı Gönder'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default QnaAnswer; 