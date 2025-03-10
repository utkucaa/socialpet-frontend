import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './QuestionDetail.css';

interface User {
  firstName: string;
  lastName: string;
}

interface Answer {
  id: number;
  content: string;
  datePosted: string;
  user: User;
}

interface Question {
  id: number;
  title: string;
  content: string;
  datePosted: string;
  user: User;
  answers?: Answer[];
}

const QuestionDetail: React.FC = () => {
  const [question, setQuestion] = useState<Question | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [newAnswer, setNewAnswer] = useState<string>('');
  const [submitting, setSubmitting] = useState<boolean>(false);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchQuestion = async (): Promise<void> => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:8080/api/questions/${id}`);
        if (!response.ok) {
          throw new Error('Soru yüklenirken bir hata oluştu');
        }
        const data = await response.json();
        setQuestion(data);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        setLoading(false);
      }
    };

    fetchQuestion();
  }, [id]);

  const handleSubmitAnswer = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newAnswer.trim()) {
      alert('Lütfen bir cevap yazın');
      return;
    }
    
    try {
      setSubmitting(true);
      
      // Burada gerçek API çağrısı yapılacak
      // Şimdilik mock bir cevap ekliyoruz
      const mockUser = {
        firstName: 'Kullanıcı',
        lastName: 'Adı'
      };
      
      const mockAnswer = {
        id: Date.now(),
        content: newAnswer,
        datePosted: new Date().toISOString(),
        user: mockUser
      };
      
      // Soruya cevabı ekle
      if (question) {
        const updatedQuestion = {
          ...question,
          answers: [...(question.answers || []), mockAnswer]
        };
        
        setQuestion(updatedQuestion);
        setNewAnswer('');
      }
      
      setSubmitting(false);
    } catch (err) {
      console.error('Cevap gönderilirken hata oluştu:', err);
      setSubmitting(false);
    }
  };

  if (loading) return (
    <div className="loading-container">
      <div className="loading">Yükleniyor...</div>
    </div>
  );
  
  if (error) return (
    <div className="error-container">
      <div className="error">Hata: {error}</div>
    </div>
  );
  
  if (!question) return (
    <div className="not-found-container">
      <div className="not-found">Soru bulunamadı</div>
    </div>
  );

  return (
    <div className="question-detail">
      <div className="question-header">
        <h2>{question.title}</h2>
        <div className="question-stats">
          <span><i className="fas fa-eye"></i> 82 Görüntülenme</span>
          <span><i className="fas fa-comment"></i> {question.answers?.length || 0} Cevap</span>
        </div>
      </div>

      <div className="main-content">
        <div className="question-box">
          <div className="user-info">
            <div className="profile-image">
              <img src="/paw-placeholder.png" alt="User" />
            </div>
            <div className="username">{question.user.firstName} {question.user.lastName}</div>
          </div>

          <div className="question-content">
            <p className="question-text">{question.content}</p>
            <div className="question-actions">
              <button className="complaint-btn">Şikayet Et</button>
            </div>
            <div className="post-date">
              {new Date(question.datePosted).toLocaleDateString('tr-TR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </div>
          </div>
        </div>

        <div className="answers-section">
          <div className="answers-header">
            <h3>
              <span>{question.answers?.length || 0}</span>
              <span>CEVAP</span>
            </h3>
          </div>
          
          {question.answers && question.answers.length > 0 ? (
            question.answers.map((answer) => (
              <div key={answer.id} className="answer-box">
                <div className="user-info">
                  <div className="profile-image">
                    <img src="/paw-placeholder.png" alt={answer.user.firstName} />
                  </div>
                  <div className="username">{answer.user.firstName} {answer.user.lastName}</div>
                </div>
                <div className="answer-content">
                  <p>{answer.content}</p>
                  <div className="post-date">
                    {new Date(answer.datePosted).toLocaleDateString('tr-TR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-answers">
              <p>Bu soruya henüz cevap verilmemiş. İlk cevabı siz verin!</p>
            </div>
          )}
          
          <div className="add-answer-section">
            <h3>Cevabınızı Yazın</h3>
            <form className="answer-form" onSubmit={handleSubmitAnswer}>
              <textarea
                placeholder="Cevabınızı buraya yazın..."
                value={newAnswer}
                onChange={(e) => setNewAnswer(e.target.value)}
                required
              />
              <button 
                type="submit" 
                className="submit-answer-btn"
                disabled={submitting}
              >
                {submitting ? 'Gönderiliyor...' : 'Cevabı Gönder'}
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="right-sidebar">
        <div className="ask-question-section">
          <h4>SORUNUZ MU VAR?</h4>
          <p>Uzmanlardan ve diğer üyelerden faydalı cevaplar almak için:</p>
          <button className="ask-question-btn">Yeni Soru Sor</button>
        </div>

        <div className="donation-section">
          <h4>SOCIALPET</h4>
          <h5>BARINAKLARA BAĞIŞ</h5>
          <div className="donation-stats">
            <h6>BUGÜNE KADAR</h6>
            <div className="donation-amount">95,806 KG</div>
            <p>MAMA BAĞIŞLANDI</p>
          </div>
          <div className="donation-features">
            <p>✓ Şeffaftır, bağışçılar listelenir.</p>
            <p>✓ Güvenilirdir, ulaştırılan mamalar fotoğraflanır, yayınlanır.</p>
            <p>✓ Bağışlanan toplam mama miktarını herkes takip edebilir.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionDetail;


