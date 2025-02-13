import React, { useState } from 'react';
import './Answer.css'; // CSS dosyamızı import ediyoruz.

const HelpAndInfo = () => {
  const [searchTerm, setSearchTerm] = useState("");

// Kategoriler
const categories = [
  "Hayvan Hakları ve Hukuki",
  "Köpek Irkları",
  "Köpek Bakımı",
  "Kedi Beslemesi",
  "Kedi Genel Konular"
];

// Sorular
const questions = [
  { title: "Köpek bakımı hakkında genel bilgi", username: "user1", time: "2 saat önce", views: 50, answers: 5 },
  { title: "Kedi bakımı nasıl yapılır?", username: "user2", time: "1 gün önce", views: 120, answers: 10 },
  { title: "Köpek ırkları hakkında detaylı bilgi", username: "user3", time: "3 saat önce", views: 80, answers: 3 },
  { title: "Kedi bakımı için gerekli malzemeler", username: "user4", time: "1 hafta önce", views: 200, answers: 8 }
];

return (
  <div className="help-info-container">
    <div className="left-section">
      <button className="new-question-btn">Yeni Soru Sor</button>
      
      <input 
        type="text" 
        className="search-bar" 
        placeholder="Soru başlıkları içerisinde ara..." 
        value={searchTerm} 
        onChange={(e) => setSearchTerm(e.target.value)} 
      />

      <div className="categories">
        <h3>Genel Soru Başlıkları</h3>
        {categories.map((category, index) => (
          <div key={index} className="category-item">
            {category}
          </div>
        ))}
      </div>
    </div>

    <div className="right-section">
      <div className="question-list">
        <div className="question-header">
          <h3>Son Cevaplananlar</h3>
          <h3>Henüz Cevaplanmamışlar</h3>
          <h3>Çok Görüntülenenler</h3>
          <h3>Çok Cevaplananlar</h3>
        </div>

        {questions.map((question, index) => (
          <div key={index} className="question-item">
            <h4>{question.title}</h4>
            <p>{question.username} sordu - {question.time}</p>
            <div className="question-meta">
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