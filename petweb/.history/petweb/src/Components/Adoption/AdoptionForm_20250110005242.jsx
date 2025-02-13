import React from 'react';
import './AdoptionForm.css';
import Sidebar from '../Sidebar/Sidebar';
import StepIndicator from '../StepIndicator/StepIndicator';

const AdoptionForm = () => {
  const steps = [
    { number: 1, text: "BİLGİLENDİRME", active: true },
    { number: 2, text: "İLAN DETAYI", active: false },
    { number: 3, text: "FOTOĞRAFLAR", active: false },
    { number: 3, text: "İLANI YAYINLA", active: true }
  ];

  return (
    <div className="container">
      <nav className="breadcrumb">
        <a href="/"><i className="fas fa-home"></i></a>
        <span>Üyelik Paneli</span>
        <span>Sahiplendirme İlanlarım</span>
        <span>Sahiplendirme İlanı Ver</span>
      </nav>

      <div className="content-wrapper">
        <Sidebar />
        
        <div className="main-content">
          <h1>Sahiplendirme İlanı Ver</h1>
          
          <StepIndicator steps={steps} />

          <div className="form-section">
            <select className="form-control">
              <option value="">Seçiniz</option>
            </select>
            
            <button className="btn-primary">Devam Et</button>
          </div>

          <div className="info-section">
            <p><strong>»</strong> Sadece ücretsiz sahiplendirmeler için ilan verilebilir.</p>
            <p>
              <strong>»</strong> Evcil hayvan arıyorsanız "arıyorum" içerikli ilanlar açmak yerine sahiplendirme 
              ilanlarına bakabilirsiniz. Böylelikle yuva arayan dostlarımıza da daha kolay ulaşmış olursunuz.
              <a href="/sahiplendirme-ilanlari"> Sahiplendirme ilanları için tıklayınız.</a>
            </p>
            <p>
              <strong>»</strong> Sahiplendirmek istediğiniz her evsiz hayvan için ayrı ayrı ilan vermelisiniz. 
              Bu sayede daha da hızlı yuva bulabilirsiniz.
            </p>
          </div>

          <div className="alert alert-warning">
            <p>Sahiplendirme ilanlarının doğruluğu, dostlarımıza en hızlı şekilde yuva bulabilmek adına bizim için çok değerli.</p>
            <p>Bu nedenle kurallara uygun olmayan ilanlar veren üyelerin üyelikleri yeniden açılmamak üzere iptal edilir.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdoptionForm;