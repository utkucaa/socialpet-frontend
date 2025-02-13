import React, { useState } from 'react';
import './HelpAndInfo.css'; // CSS dosyamızı import ediyoruz.
import QuestionDetail from './QuestionDetail'; // İçe aktarma doğru mu kontrol edin
 
const HelpAndInfo = () => {
  const [searchTerm, setSearchTerm] = useState(""); // Arama terimini tutmak için useState
  const [activeCategory, setActiveCategory, selectedQuestion,
    setSelectedQuestion] = useState('Son Cevaplananlar'); // Kategori seçimi için state

  // Kategoriler
  const categories = [
    "Hayvan Hakları ve Hukuki",
    "Köpek Irkları",
    "Köpek Bakımı",
    "Kedi Beslemesi",
    "Kedi Genel Konular"
  ];

  // Kategoriye tıklanıldığında aktif hale getirmek
  const handleCategoryClick = (category) => {
    if (activeCategory === category) {
      setActiveCategory(null); 
    } else {
      setActiveCategory(category);
    }
  };

  // Sorular
  const questions = [
    { title: "Köpek bakımı hakkında genel bilgi", username: "user1", time: "2 saat önce", views: 50, answers: 5, category: "Son Cevaplananlar" },
    { title: "Kedi bakımı nasıl yapılır?", username: "user2", time: "1 gün önce", views: 120, answers: 10, category: "Son Cevaplananlar" },
    { title: "Köpek ırkları hakkında detaylı bilgi", username: "user3", time: "3 saat önce", views: 80, answers: 3, category: "Henüz Cevaplanmamışlar" },
    { title: "Kedi bakımı için gerekli malzemeler", username: "user4", time: "1 hafta önce", views: 200, answers: 8, category: "Çok Görüntülenenler" },
    { title: "Köpeklerin eğitimi nasıl yapılır?", username: "user5", time: "3 gün önce", views: 150, answers: 2, category: "Son Cevaplananlar" },
    { title: "Kedilerde aşılama programı", username: "user6", time: "5 saat önce", views: 75, answers: 1, category: "Çok Cevaplananlar" },
    { title: "Köpekler için egzersiz önerileri", username: "user7", time: "1 saat önce", views: 65, answers: 6, category: "Son Cevaplananlar" },
    { title: "Kedi dostu ev dekorasyonu", username: "user8", time: "2 gün önce", views: 90, answers: 7, category: "Son Cevaplananlar" },
    { title: "Köpeklerin yaşlılık dönemi bakımı", username: "user9", time: "4 saat önce", views: 120, answers: 4, category: "Henüz Cevaplanmamışlar" }
  ];

  return (
    <div className="help-info-wrapper">
      <div className="sidebar-left">
        <button className="ask-new-question-btn">Yeni Soru Sor</button>

        <input
          type="text"
          className="search-inpt"
          placeholder="Soru başlıkları içerisinde ara..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="search-buton">Ara</button>

        <div className="categories-list">
          <h3>Genel Soru Başlıkları</h3>
          {categories.map((category, index) => (
            <div
              key={index}
              className="category-item"
              onClick={() => handleCategoryClick(category)} // Kategorilere tıklanabilirlik ekledik
            >
              {category}
            </div>
          ))}
        </div>
      </div>

      <div className="content-right">
        <div className="questions-header">
          <h3 onClick={() => handleCategoryClick('Son Cevaplananlar')}>Son Cevaplananlar</h3>
          <h3 onClick={() => handleCategoryClick('Henüz Cevaplanmamışlar')}>Henüz Cevaplanmamışlar</h3>
          <h3 onClick={() => handleCategoryClick('Çok Görüntülenenler')}>Çok Görüntülenenler</h3>
          <h3 onClick={() => handleCategoryClick('Çok Cevaplananlar')}>Çok Cevaplananlar</h3>
        </div>

        <div className="questions-container">
          {/* "Son Cevaplananlar" başlığı altında 2 soru gösterilecek */}
          {activeCategory === 'Son Cevaplananlar' && questions.slice(0, 2).map((question, index) => (
            <div key={index} className="question-box">
              <h4>{question.title}</h4>
              <p>{question.username} sordu - {question.time}</p>
              <div className="question-meta-data">
                <span>{question.views} Görüntüleme</span>
                <span>{question.answers} Cevap</span>
              </div>
            </div>
          ))}
          {/* "Henüz Cevaplanmamışlar" başlığı altında 3. soruyu gösterecek */}
          {activeCategory === 'Henüz Cevaplanmamışlar' && questions.filter(q => q.category === 'Henüz Cevaplanmamışlar').map((question, index) => (
            <div key={index} className="question-box">
              <h4>{question.title}</h4>
              <p>{question.username} sordu - {question.time}</p>
              <div className="question-meta-data">
                <span>{question.views} Görüntüleme</span>
                <span>{question.answers} Cevap</span>
              </div>
            </div>
          ))}
          {/* "Çok Görüntülenenler" başlığı altında 4. soruyu gösterecek */}
          {activeCategory === 'Çok Görüntülenenler' && questions.filter(q => q.category === 'Çok Görüntülenenler').map((question, index) => (
            <div key={index} className="question-box">
              <h4>{question.title}</h4>
              <p>{question.username} sordu - {question.time}</p>
              <div className="question-meta-data">
                <span>{question.views} Görüntüleme</span>
                <span>{question.answers} Cevap</span>
              </div>
            </div>
          ))}
          {/* "Çok Cevaplananlar" başlığı altında 1. soruyu gösterecek */}
          {activeCategory === 'Çok Cevaplananlar' && questions.filter(q => q.category === 'Çok Cevaplananlar').map((question, index) => (
            <div key={index} className="question-box">
              <h4>{question.title}</h4>
              <p>{question.username} sordu - {question.time}</p>
              <div className="question-meta-data">
                <span>{question.views} Görüntüleme</span>
                <span>{question.answers} Cevap</span>
              </div>
            </div>
          ))}
        </div>

        {selectedQuestion && (
          <QuestionDetail question={selectedQuestion} />
        )}
      </div>
    </div>
  );
};

export default HelpAndInfo;
