import React, { useState } from 'react';
import './HelpAndInfo.css'; // CSS dosyamızı import ediyoruz.

const HelpAndInfo = () => {
  const [searchTerm, setSearchTerm] = useState(""); // Arama terimini tutmak için useState
  const [activeCategory, setActiveCategory] = useState(null); // Kategori seçimi için state

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
      setActiveCategory(null); // Aynı kategoriye tekrar tıklanırsa, açma/kapama işlemi
    } else {
      setActiveCategory(category);
    }
  };

  // Sorular
  const questions = [
    { title: "Köpek bakımı hakkında genel bilgi", username: "user1", time: "2 saat önce", views: 50, answers: 5 },
    { title: "Kedi bakımı nasıl yapılır?", username: "user2", time: "1 gün önce", views: 120, answers: 10 },
    { title: "Köpek ırkları hakkında detaylı bilgi", username: "user3", time: "3 saat önce", views: 80, answers: 3 },
    { title: "Kedi bakımı için gerekli malzemeler", username: "user4", time: "1 hafta önce", views: 200, answers: 8 }
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
        <button className="search-btn">Ara</button>

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
          <h3 onClick={() => handleCategoryClick('all')}>Son Cevaplananlar</h3>
          <h3 onClick={() => handleCategoryClick('all')}>Henüz Cevaplanmamışlar</h3>
          <h3 onClick={() => handleCategoryClick('all')}>Çok Görüntülenenler</h3>
          <h3 onClick={() => handleCategoryClick('all')}>Çok Cevaplananlar</h3>
        </div>

        {/* Tüm soruları göstermek için, activeCategory'ye göre filtreleme yapıyoruz. */}
        <div className="questions-container">
          {questions.map((question, index) => (
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
      </div>
    </div>
  );
};

export default HelpAndInfo;
