import React, { useState, FormEvent, ChangeEvent } from 'react';
import axios from 'axios';
import './NewAnswer.css';

interface FormData {
  topic: string;
  question: string;
  details: string;
}

interface QuestionData {
  title: string;
  content: string;
  user: {
    id: number;
  };
}

const NewAnswer: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    topic: '',
    question: '',
    details: ''
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    
    try {
      const questionData: QuestionData = {
        title: formData.question,
        content: formData.details,
        user: {
          id: 13 // Şimdilik sabit bir kullanıcı ID'si kullanıyoruz
        }
      };

      const response = await axios.post<QuestionData>('http://localhost:8080/api/questions', questionData);

      if (response.status === 200 || response.status === 201) {
        alert('Sorunuz başarıyla gönderildi!');
        setFormData({ topic: '', question: '', details: '' }); // Formu temizle
      }
    } catch (error: any) {
      console.error('Soru gönderilirken bir hata oluştu:', error);
      alert('Soru gönderilirken bir hata oluştu. Lütfen tekrar deneyin.');
    }
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    field: keyof FormData
  ): void => {
    setFormData({ ...formData, [field]: e.target.value });
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
              onChange={(e) => handleInputChange(e, 'topic')}
            >
              <option value="">Sorunuz için en uygun konuyu seçiniz</option>
              <option value="kopek-egitim">Köpek Eğitimi ve Psikolojisi</option>
              <option value="kopek-irk">Köpek Irkları</option>
              <option value="kopek-bakim">Köpek Bakımı ve Sağlığı</option>
              <option value="kopek-beslenme">Köpek Beslenmesi</option>
              <option value="kedi-irk">Kedi Irkları</option>
              <option value="kedi-bakim">Kedi Bakımı ve Sağlığı</option>
              <option value="kemirgen">Kemirgenler Genel Konular</option>
              <option value="kedi-genel">Kedi Genel Konular</option>
              <option value="surungen">Sürüngenler Genel Konular</option>
              <option value="kus">Kuşlar Genel Konular</option>
              <option value="akvaryum">Akvaryum ve Balık Genel Konular</option>
            </select>
          </div>

          <div className="form-group">
            <label>Soru</label>
            <input
              type="text"
              placeholder="Sorunuzun özetini anlaşılır bir şekilde buraya yazmalısınız. Soru cümlesi olmalıdır."
              value={formData.question}
              onChange={(e) => handleInputChange(e, 'question')}
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
              onChange={(e) => handleInputChange(e, 'details')}
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