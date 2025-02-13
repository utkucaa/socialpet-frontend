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
              Öncelikle herkese merhaba , 3 yaşında kısır british cinsi bir kedim var ve yavruluğundan beri n&d
               mama kullanıyorum bugüne dek sağlık açısından hiçbir sıkıntı yaşamadım ve kedim baya
                severek tüketti fakat bu hafta şöyle bir sorun yaşadım , güncel olarak n&d kısır somon 
                portakal kullanıyorum 5 gün önce yıllardır mama aldığım satıcıdan yine 1 kiloluk aldım 
                fakat hiçbir şekilde yemedi 1 gün boyunca koklayıp geri döndü ve tek parça bile yemedi 
                sonrasında başka bir pet shoptan denemek amaçlı yine aynı ürünü aldım onu ise anında
                 yedi bu denemelik aldığım mama bittiğinde ndnin yetkili satıcısı olan başka bir 
                 petshoptan gidip bugün tekrar nd kısır somon aldım satıcı gözümün önünde yeni açılmış 
                 paketten 1 kilo verdi fakat kedim yine yemedi bunun sebebi ne olabilir nd herhangi bir
                içerik değişimine mi gitti aynı sorunu yaşayan başkaları var mı ? Mamayı değiştirmek
                 istemiyorum çünkü gerçekten severek yiyor ve başka mama asla yemiyor , 2.aldığım satıcıya geçmeme sebebim ise diğerlerine göre gerçekten pahalı ama çözüm bulamazsam mecburen geçicem cevaplarınız için şimdiden teşekkür ederim
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
              <h3>1 CEVAP</h3>
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


