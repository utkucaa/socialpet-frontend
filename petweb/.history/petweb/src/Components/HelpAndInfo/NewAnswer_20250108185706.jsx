import React, { useState } from 'react';
import './NewAnswer.css';

const NewAnswer = () => {
  const [formData, setFormData] = useState({
    topic: '',
    question: '',
    details: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <div className="new-answer-container">
      <div className="breadcrumb">
        <span>Soru Cevap</span> » <span>Yeni Soru Sor</span>
      </div>

      <div className="answer-form">
        <h2>Yeni Soru Sor</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Konu</label>
            <select 
              value={formData.topic}
              onChange={(e) => setFormData({...formData, topic: e.target.value})}
            >
              <option value="">Sorunuz için en uygun konuyu seçiniz</option>
              <option value="kedi">Köpek Eğitimi ve Psikolojisi</option>
              <option value="kedi">Köpek Irkları</option>
              <option value="kedi">Köpek Bakımı ve Sağlığı</option>
              <option value="kedi">Köpek Beslenmesi</option>
              <option value="kedi">Kedi Irkları</option>
              <option value="kedi">Kedi Bakımı ve Sağlığı</option>
              <option value="kedi">Kemirgenler Genel Konular</option>
              <option value="kedi">Kedi Genel Konular</option>
              <option value="kedi">Sürüngenler Genel Konular</option>
              <option value="kedi">Kuşlar Genel Konular</option>
              <option value="kedi">Akvaryum ve Balık Genel Konular</option>
            </select>
          </div>

          <div className="form-group">
            <label>Soru</label>
            <input
              type="text"
              placeholder="Sorunuzun özetini anlaşılır bir şekilde buraya yazmalısınız. Soru cümlesi olmalıdır."
              value={formData.question}
              onChange={(e) => setFormData({...formData, question: e.target.value})}
            />
          </div>

          <div className="form-group">
            <label>Detay</label>
            <div className="editor-toolbar">
              <button type="button">B</button>
              <button type="button">I</button>
              <button type="button">A</button>
              <button type="button">🔗</button>
              <button type="button">☰</button>
              <button type="button">⋮</button>
              <button type="button">&lt;/&gt;</button>
              <button type="button">"</button>
              <button type="button" className="preview-btn">Önizleme</button>
            </div>
            <textarea
              placeholder="Sorunuzu detaylı anlatırsanız, diğer üyeler ve uzmanlardan daha doğru cevaplar alabilirsiniz."
              value={formData.details}
              onChange={(e) => setFormData({...formData, details: e.target.value})}
            />
          </div>

          <div className="form-actions">
            <button type="button" className="upload-btn">📷 Fotoğraf yüklemek istiyorum.</button>
            <button type="button" className="survey-btn">📊 Anket oluşturmak istiyorum.</button>
          </div>

          <button type="submit" className="submit-btn">Sor</button>
        </form>
      </div>
    </div>
  );
};

export default NewAnswer;