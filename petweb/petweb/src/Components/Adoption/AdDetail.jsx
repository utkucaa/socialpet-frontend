import React, { useState, useEffect } from 'react';
import './AdDetail.css';

import { FaWhatsapp, FaFacebook, FaTwitter, FaPinterest } from 'react-icons/fa';
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';

const AdDetail = () => {
  const [currentImage, setCurrentImage] = useState(0);

  const adDetails = {
    title: "Asaletli Ragdoll",
    location: {
      city: "İstanbul",
      district: "Maltepe",
      neighborhood: "Küçükyalı Merkez Mah."
    },
    specifications: {
      type: "Kedi Cinsleri",
      breed: "Ragdoll Kedisi",
      adNumber: "54934",
      adDate: "1 Ocak 2025",
      age: "2 Aylık",
      gender: "Erkek/Dişi",
      status: "Görüşülür",
      vaccine: "Var",
      internalParasite: "Var",
      externalParasite: "Var",
      creditCardPayment: "Var",
      shipping: "Var"
    },
    stats: {
      whatsappRequests: 16,
      calls: 0,
      views: 333
    },
    contact: {
      name: "Eylül Kaya",
      memberSince: "4 Kasım 2024",
      phone: "0530 457 52 32"
    }
  };

  return (
    <div className="ad-detail-container">
      <div className="breadcrumb">
        <a href="/">Anasayfa</a> {'>'}
        <a href="/kedi-ilanlari">Kedi İlanları</a> {'>'}
        <a href="/ragdoll-kedisi">Ragdoll Kedisi</a>
      </div>
      <div className="ad-header">
        <h1>{adDetails.title}</h1>
        <div className="header-actions">
          <button className="favorite-btn">Favorilere Ekle</button>
          <button className="print-btn">Yazdır</button>
          <div className="social-share">
            <FaFacebook className="social-icon facebook" />
            <FaTwitter className="social-icon twitter" />
            <FaPinterest className="social-icon pinterest" />
          </div>
        </div>
      </div>

      <div className="ad-content">
        {/* Image Gallery */}
        <div className="ad-gallery">
          <div className="main-image">
            <img src="pet-image.jpg" alt={adDetails.title} />
            <button className="nav-btn prev">
              <MdNavigateBefore />
            </button>
            <button className="nav-btn next">
              <MdNavigateNext />
            </button>
          </div>
          <div className="image-actions">
            <button className="enlarge-btn">Fotoğrafı Büyüt</button>
            <button className="video-btn">Video</button>
          </div>
          <div className="thumbnails">
          </div>
        </div>



        <div className="specifications">
          <div className="location-info">
            {adDetails.location.city} / {adDetails.location.district} / {adDetails.location.neighborhood}
          </div>

          <table className="specs-table">
            <tbody>
              <tr>
                <td>Türü</td>
                <td>{adDetails.specifications.type}</td>
              </tr>
              <tr>
                <td>Cinsi</td>
                <td>{adDetails.specifications.breed}</td>
              </tr>
              <tr>
                <td>İlan No</td>
                <td>{adDetails.specifications.adNumber}</td>
              </tr>
              <tr>
                <td>İlan Tarihi</td>
                <td>{adDetails.specifications.adDate}</td>
              </tr>
              <tr>
                <td>Yaş</td>
                <td>{adDetails.specifications.age}</td>
              </tr>
              <tr>
                <td>Cinsiyet</td>
                <td>{adDetails.specifications.gender}</td>
              </tr>
              <tr>
                <td>Durum</td>
                <td>{adDetails.specifications.status}</td>
              </tr>
              <tr>
                <td>Aşı</td>
                <td>{adDetails.specifications.vaccine}</td>
              </tr>
              <tr>
                <td>İç Parazit</td>
                <td>{adDetails.specifications.internalParasite}</td>
              </tr>
              <tr>
                <td>Dış Parazit</td>
                <td>{adDetails.specifications.externalParasite}</td>
              </tr>
              <tr>
                <td>Şehir Dışına Gönderim</td>
                <td>{adDetails.specifications.shipping}</td>
              </tr>
            </tbody>
          </table>

          <div className="ad-stats">
            <div>İlan WhatsApp'tan {adDetails.stats.whatsappRequests} istek aldı</div>
            <div>İncelenen İlan {adDetails.stats.calls} Arama aldı</div>
            <div>Görüntülenme {adDetails.stats.views} kez görüntülendi.</div>
          </div>
        </div>
        <div className="contact-box">
          <div className="user-info">
            <h3>{adDetails.contact.name}</h3>
            <p>Üyelik tarihi: {adDetails.contact.memberSince}</p>
            <a href="/user-ads">Üyenin Tüm İlanlarını Görüntüle</a>
          </div>

          <div className="contact-buttons">
            <button className="phone-btn">{adDetails.contact.phone}</button>
            <button className="phone-btn">{adDetails.contact.phone}</button>
            <button className="whatsapp-btn">
              <FaWhatsapp /> WhatsApp
            </button>
            <button className="message-btn">İlan Sahibine Mesaj Gönder</button>
          </div>

          <div className="warning-box">
            <h4>Tanımadığınız Kişilere Dikkat!</h4>
            <p>Socialpet.com, pet arayanlar ve sahiplendirme yapanları buluşturan bir platform olup, satış yapmamaktadır. Bunun için hayvan alacak kişilerin, hayvan satan kişilerle mutlaka yüz yüze görüşmesi gerektiğini söylemektedir. Yüz yüze görüşülmeyen kişilere hiçbir şekilde kaparo ya da bir ödeme yapılmamalıdır.</p>
          </div>

          <button className="report-btn">İlan İle İlgili Şikayetim Var</button>
        </div>
      </div>
      </div>
  );
};

export default AdDetail;