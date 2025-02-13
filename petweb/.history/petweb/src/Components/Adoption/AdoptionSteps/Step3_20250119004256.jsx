import React, { useState } from "react";
import "./AdoptionSteps.css";

const Step3 = ({ onNext, adData, onAdDataChange }) => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");

  // Fotoğraf seçildiğinde bu fonksiyon tetiklenir
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);

      // Önceki verileri koruyarak fotoğraf verisini ekliyoruz
      onAdDataChange((prevData) => ({
        ...prevData,    // Önceki verileri koruyoruz
        photo: selectedFile,  // Yeni fotoğraf verisini ekliyoruz
      }));
    }
  };

  // Fotoğraf yükleme işlemi (API isteği eklenebilir)
  const handleFileUpload = async () => {
    if (!file) {
      alert("Lütfen bir dosya seçin");
      return;
    }
    // Fotoğraf yükleme işlemi burada yapılabilir
  };

  const handleNextStep = async () => {
    await handleFileUpload();
    onNext(); // Bir sonraki adımı başlatıyoruz
  };

  return (
    <div className="step step3">
      <h3>3. Adım: Fotoğraflar</h3>
      <input type="file" onChange={handleFileChange} />
      {fileName && <p>Seçilen dosya: {fileName}</p>}
      <button onClick={handleNextStep}>Devam Et</button>
    </div>
  );
};

export default Step3;
