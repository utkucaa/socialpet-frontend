import React, { useState } from "react";
import "./AdoptionSteps.css";

const Step3 = ({ onNext, onAdDataChange }) => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile && selectedFile.type.startsWith("image/")) {
      setFile(selectedFile);
      setFileName(selectedFile.name);

      // Step2'den gelen veri ile birlikte Step3'te fotoğraf verisini güncelliyoruz
      onAdDataChange((prevData) => ({
        ...prevData,
        photo: selectedFile,
      }));
    } else {
      alert("Lütfen geçerli bir resim dosyası seçin.");
    }
  };

  const handleNextStep = async () => {
    if (!file) {
      alert("Lütfen bir dosya seçin");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      onNext(); // Step3'ten sonra bir sonraki adıma geçiş yapıyoruz
    }, 2000);
  };

  return (
    <div className="step step3">
      <h3>3. Adım: Fotoğraflar</h3>
      <input type="file" onChange={handleFileChange} />
      {fileName && <p>Seçilen dosya: {fileName}</p>}
      {loading ? (
        <p>Yükleniyor...</p>
      ) : (
        <button onClick={handleNextStep}>Devam Et</button>
      )}
    </div>
  );
};

export default Step3;
