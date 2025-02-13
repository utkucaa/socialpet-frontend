import React from 'react';
import './QuestionDetail.css';

cconst QuestionDetail = ({ question }) => {
  return (
    <div className="question-detail">
      <div className="question-header">
        <h2>{question?.title || 'Kedi Tüyü Dökümüne İyi Gelen Her Şey'}</h2>
      </div>
      
      <div className="question-content-box">
        <div className="user-profile">
          <div className="profile-image">
            <img 
              src={question?.profileImage || 'defaultProfileImage.jpg'} 
              alt="User profile" 
            />
          </div>
          <div className="user-info">
            <h4>{question?.username || 'Kullanıcı Adı'}</h4>
            <p>Üye: {question?.memberSince || '2023'}</p>
          </div>
        </div>
        
        <div className="question-main">
          <div className="question-details">
            <p>{question?.details || '3 aylık british long hair, tüy dökümünü en aza indirmek için ne kullanabilirim, neler yapabilirim? her gün tarakla tarıyorum bakımını yapıyorum.'}</p>
          </div>
          <div className="complaint-section">
            <button className="complaint-btn">Şikayet Et</button>
          </div>
        </div>
      </div>

      <div className="answers-section">
        <h3>{question?.answers || 3} Cevap</h3>
        
        {/* Sample answers */}
        <div className="answer-box">
          <div className="answerer-profile">
            <img src="defaultProfileImage.jpg" alt="Answerer" />
            <h4>Veteriner Ahmet</h4>
          </div>
          <div className="answer-content">
            <p>Düzenli tarama çok önemli, doğru yapıyorsunuz. Ek olarak omega 3 takviyesi kullanabilirsiniz.</p>
          </div>
        </div>

        <div className="answer-box">
          <div className="answerer-profile">
            <img src="defaultProfileImage.jpg" alt="Answerer" />
            <h4>Kedi Uzmanı Ayşe</h4>
          </div>
          <div className="answer-content">
            <p>British kedilerde tüy dökülmesi normaldir. Özel fırçalar kullanmanızı öneririm.</p>
          </div>
        </div>

        <div className="answer-box">
          <div className="answerer-profile">
            <img src="defaultProfileImage.jpg" alt="Answerer" />
            <h4>Tecrübeli Sahip Mehmet</h4>
          </div>
          <div className="answer-content">
            <p>Kaliteli mama kullanımı tüy kalitesini artırır. Premium mamalar deneyebilirsiniz.</p>
          </div>
        </div>
      </div>

      <div className="login-prompt">
        <p>Soruya cevap yazabilmek için üye girişi yapmalısınız.</p>
        <button className="b">Üye Ol</button>
        <button className="b">Giriş Yap</button>
      </div>
    </div>
  );
};

export default QuestionDetail;