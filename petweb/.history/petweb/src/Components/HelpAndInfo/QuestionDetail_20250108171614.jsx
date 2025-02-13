import React from 'react';
import './QuestionDetail.css';

const QuestionDetail = ({ question }) => {
  return (
    <div className="question-detail">
      <div className="question-header">
        <h2>{question?.title || 'Kedi Tüyü Dökümüne İyi Gelen Her Şey'}</h2>
      </div>
      
      <div className="question-content">
        {/* Sol Taraf */}
        <div className="left-columnn">
          <div className="profile-image">
            <img 
              src={question?.profileImage || 'defaultProfileImage.jpg'} 
              alt="User profile" 
            />
          </div>
          <div className="question-details">
            <p>{question?.details || 'Soru detayları bulunmamaktadır.'}</p>
          </div>
          <div className="answers-header">
              <h4>{question?.answers || 0} Cevap</h4>
            </div>
          <div className="answer-message">
              <p>Soruya cevap yazabilmek için üye girişi yapmalısınız.</p>
              <button className="b">Üye Ol</button>
              <button className="b">Giriş Yap</button>
            </div>
        </div>

        {/* Sağ Taraf */}
        <div className="right-columnn">
          <div className="answers">  
          </div>

          <div className="question-actions">
            <div className="pati-section">
              <p>PATI</p>
              <p>SORUNUZ VAR MI?</p>
              <p>Uzmanlardan ve diğer üyelerden faydalı cevaplar almak için:</p>
              <button className="soru">Yeni soru sor</button>
              <div className="donation-section">
                <strong>SOCİALPET BARINAKLARA BAĞIŞ</strong>
                <div className="donation-details">
                  <ul>
                    <li>Şeffaftır, bağışçılar listelenir.</li>
                    <li>Güvenilirdir, ulaştırılan mamalar fotoğraflanır, yayınlanır.</li>
                    <li>Bağışlanan toplam mama miktarını herkes takip edebilir.</li>
                  </ul>
                </div>
                <button>Bağış Yap, Kahraman Ol!</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="similar-questions">
        <h4>Benzer Sorular</h4>
        <ul>
          <li>Köpek bakımı hakkında daha fazla bilgi</li>
          <li>Kediler için uygun mama önerileri</li>
        </ul>
      </div>
    </div>
  );
};

export default QuestionDetail;

