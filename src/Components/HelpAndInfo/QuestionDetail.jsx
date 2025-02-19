import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './QuestionDetail.css';

const QuestionDetail = () => {
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/questions/${id}`);
        if (!response.ok) {
          throw new Error('Soru yüklenirken bir hata oluştu');
        }
        const data = await response.json();
        setQuestion(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchQuestion();
  }, [id]);

  if (loading) return <div>Yükleniyor...</div>;
  if (error) return <div>Hata: {error}</div>;
  if (!question) return <div>Soru bulunamadı</div>;

  return (
    <div className="question-detail">
      <div className="question-header">
        <h2>{question.title}</h2>
        <div className="question-stats">
          <span><i className="fas fa-eye"></i> 82 Görüntülenme</span>
          <span><i className="fas fa-comment"></i> {question.answers?.length || 0} Cevap</span>
          <span><i className="fas fa-paw"></i> 0 Pati</span>
        </div>
      </div>

      <div className="main-content">
        <div className="question-box">
          <div className="user-info">
            <div className="profile-image">
              <img src="/paw-placeholder.png" alt="User" />
            </div>
            <div className="username">{question.user.firstName} {question.user.lastName}</div>
            <div className="user-points">963 Puan</div>
          </div>

          <div className="question-content">
            <p className="question-text">{question.content}</p>
            <div className="question-actions">
              <button className="patile-btn">Patile</button>
              <span className="pati-count">0</span>
              <button className="complaint-btn">Şikayet Et</button>
            </div>
            <div className="post-date">
              {new Date(question.datePosted).toLocaleString('tr-TR')}
            </div>
          </div>
        </div>

        <div className="answers-section">
          <div className="answers-header">
            <h3>
              <span>{question.answers?.length || 0}</span>
              <span>CEVAP</span>
            </h3>
            <select className="sort-answers">
              <option>En Çok Patilenene Göre</option>
            </select>
          </div>
          
          {question.answers?.map((answer) => (
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
                  {new Date(answer.datePosted).toLocaleString('tr-TR')}
                </div>
              </div>
            </div>
          ))}
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


