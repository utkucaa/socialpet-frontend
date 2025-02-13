import React from "react";
import "./AdoptionSteps.css";

const Step2 = ({ onNext }) => {
  return (
    <div className=" step2">
      <h3>Pet Bilgileri</h3>
      <form>
        <div>
          <label>Pet Adı:</label>
          <input type="text" placeholder="Pet adı" />
        </div>
        <div>
          <label>Cins:</label>
          <input type="text" placeholder="Pet cinsi" />
        </div>
        <div>
          <label>Yaş:</label>
          <input type="number" placeholder="Yaş" />
        </div>
        <div>
          <label>Cinsiyet:</label>
          <input type="text" placeholder="Cinsiyet" />
        </div>
        <div>
          <label>Boyut:</label>
          <input type="text" placeholder="Boyut" />
        </div>
        <div>
          <label>İlan Başlığı:</label>
          <input type="text" placeholder="İlan başlığı" />
        </div>
        <div>
          <label>İlan Açıklaması:</label>
          <textarea placeholder="İlan açıklaması" />
        </div>
        <div>
          <label>Kimden:</label>
          <input type="text" placeholder="Kimden" />
        </div>
        <div>
          <label>Şehir:</label>
          <input type="text" placeholder="Şehir" />
        </div>
        <div>
          <label>İlçe:</label>
          <input type="text" placeholder="İlçe" />
        </div>
        <div>
          <label>Ad Soyad:</label>
          <input type="text" placeholder="Ad Soyad" />
        </div>
        <div>
          <label>Telefon:</label>
          <input type="text" placeholder="Telefon" />
        </div>
      </form>
      <button onClick={onNext}>Devam Et</button>
    </div>
  );
};

export default Step2;
