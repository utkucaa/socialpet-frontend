import React from 'react';
import './QuestionDetail.css';

const QuestionDetail = ({ question }) => {
    return (
      <div className="question-detail">
        <div className="question-header">
          <h2>{question?.title || 'Popoyu Temizlememe'}</h2>
          <div className="question-stats">
            <span><i className="fas fa-eye"></i> 82 Görüntülenme</span>
            <span><i className="fas fa-comment"></i> 7 Cevap</span>
            <span><i className="fas fa-paw"></i> 0 Pati</span>
          </div>
        </div>
  
        <div className="main-content">
          <div className="question-box">
            <div className="user-info">
              <div className="profile-image">
                <img src="paw-placeholder.png" alt="User" />
              </div>
              <div className="username">alonexj</div>
              <div className="user-points">963 Puan</div>
            </div>
  
            <div className="question-content">
              <p className="question-text">
                merhaba kedim neredeyse 7 aylık ama hala kakasını temizlemiyor...
                {/* Rest of the question text */}
              </p>
              <div className="question-actions">
                <button className="patile-btn">Patile</button>
                <span className="pati-count">0</span>
                <button className="complaint-btn">Şikayet Et</button>
              </div>
              <div className="post-date">04.01.2025 23:27</div>
            </div>
          </div>
  
          <div className="answers-section">
            <div className="answers-header">
              <h3>7 CEVAP</h3>
              <select className="sort-answers">
                <option>En Çok Patilenene Göre</option>
              </select>
            </div>
            
            {/* Sample Answer */}
            <div className="answer-box">
              <div className="user-info">
                <div className="profile-image">
                  <img src="paw-placeholder.png" alt="USER2" />
                </div>

                <div className="profile-image">
                  <img src="paw-placeholder.png" alt="USER3" />
                </div>

              </div>
              <div className="answer-content">
                <p>sizin ki yine iyi su fıskırtınca temizliyormuş...</p>
              </div>

              <div className="answer-content">
                <p>sizin ki yine iyi su fıskırtınca temizliyormuş...</p>
              </div>
              
              
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


