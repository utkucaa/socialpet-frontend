import React, { useState } from "react";
import "./AdoptionSteps.css";

const Step3 = ({ onNext, adData, onAdDataChange }) => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
      onAdDataChange({ photo: selectedFile }); // Fotoğraf verisini ana bileşene ilet
    }
  };

  const handleFileUpload = async () => {
    if (!file) {
      alert("Lütfen bir dosya seçin");
      return;
    }
    // Fotoğraf yükleme işlemi (API isteği) buraya eklenebilir.
  };

  const handleNextStep = async () => {
    await handleFileUpload();
    onNext();
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
