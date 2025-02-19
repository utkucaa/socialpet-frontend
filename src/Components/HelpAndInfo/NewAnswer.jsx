import React, { useState } from 'react';
import axios from 'axios';
import './NewAnswer.css';

const NewAnswer = () => {
  const [formData, setFormData] = useState({
    topic: '',
    question: '',
    details: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:8080/api/questions', {
        title: formData.question,
        content: formData.details,
        user: {
          id: 13 // Şimdilik sabit bir kullanıcı ID'si kullanıyoruz
        }
      });

      if (response.status === 200 || response.status === 201) {
        alert('Sorunuz başarıyla gönderildi!');
        setFormData({ topic: '', question: '', details: '' }); // Formu temizle
      }
    } catch (error) {
      console.error('Soru gönderilirken bir hata oluştu:', error);
      alert('Soru gönderilirken bir hata oluştu. Lütfen tekrar deneyin.');
    }
  };

  return (
    <div className="new-answer-container">
      <div className="breadcrumb">
        <span>Yardım ve Bilgi</span> » <span>Yeni Soru Sor</span>
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