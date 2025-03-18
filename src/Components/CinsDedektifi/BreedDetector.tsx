import React, { useState, useRef } from 'react';
import './BreedDetector.css';
import { analyzeCatBreed } from '../../services/breedDetectionService';

const BreedDetector: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [result, setResult] = useState<{ type: string; breed: string; confidence?: number } | null>(null);
  const [selectedTab, setSelectedTab] = useState<'kedi' | 'köpek'>('kedi'); 
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result as string);
        setResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result as string);
        setResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  // Function to analyze dog breed using the API
  const analyzeDogBreed = async (imageData: string): Promise<{ type: string; breed: string; confidence: number }> => {
    try {
      // Convert base64 data URL to Blob
      const base64Response = await fetch(imageData);
      const blob = await base64Response.blob();
      
      // Create form data and append the image
      const formData = new FormData();
      formData.append('image', blob, 'dog-image.jpg');
      
      // Make API request
      const response = await fetch('http://localhost:8080/api/v1/dog-breed-analyzer/analyze-dog', {
        method: 'POST',
        body: formData,
        headers: {
          'Origin': window.location.origin
        },
      });
      
      if (!response.ok) {
        throw new Error('API yanıt vermedi');
      }
      
      const data = await response.json();
      
      // Get Turkish breed name from JSON file
      const breedNameResponse = await fetch('/breed_names_tr.json');
      const breedNames = await breedNameResponse.json();
      
      // Use Turkish breed name if available, otherwise format the English name
      const breedName = breedNames[data.primaryBreed] || 
        data.primaryBreed
          .split('_')
          .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
      
      return {
        type: 'Köpek',
        breed: breedName,
        confidence: data.confidence * 100
      };
    } catch (error) {
      console.error('Dog breed API error:', error);
      throw new Error('Köpek cinsi tespit edilemedi');
    }
  };

  const handleDetectBreed = async () => {
    if (!selectedImage || isLoading) return;
    
    try {
      setIsLoading(true);
      let detectionResult;
      
      if (selectedTab === 'kedi') {
        detectionResult = await analyzeCatBreed(selectedImage);
      } else {
        detectionResult = await analyzeDogBreed(selectedImage);
      }
      
      setResult(detectionResult);
    } catch (error) {
      console.error('Error detecting breed:', error);
      setResult({ 
        type: selectedTab === 'kedi' ? 'Kedi' : 'Köpek', 
        breed: error instanceof Error ? error.message : 'Tanımlanamadı', 
        confidence: 0 
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setSelectedImage(null);
    setResult(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="breed-detector-container">
      <div className="breed-detector-header">
        <div className="header-icons">
          <div className="header-icon cat-icon">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12,8L10.67,8.09C9.81,7.07 7.4,4.5 5,4.5C5,4.5 3.03,7.46 4.96,11.41C4.41,12.24 4.07,12.67 4,13.66L2.07,13.95L2.28,14.93L4.04,14.67L4.18,15.38L2.61,16.32L3.08,17.21L4.53,16.32C5.68,18.76 8.59,20 12,20C15.41,20 18.32,18.76 19.47,16.32L20.92,17.21L21.39,16.32L19.82,15.38L19.96,14.67L21.72,14.93L21.93,13.95L20,13.66C19.93,12.67 19.59,12.24 19.04,11.41C20.97,7.46 19,4.5 19,4.5C16.6,4.5 14.19,7.07 13.33,8.09L12,8M9,11A1,1 0 0,1 10,12A1,1 0 0,1 9,13A1,1 0 0,1 8,12A1,1 0 0,1 9,11M15,11A1,1 0 0,1 16,12A1,1 0 0,1 15,13A1,1 0 0,1 14,12A1,1 0 0,1 15,11M11,14H13L12.3,15.39C12.5,16.03 13.06,16.5 13.75,16.5A1.5,1.5 0 0,0 15.25,15H15.75A2,2 0 0,1 13.75,17C13,17 12.35,16.59 12,16V16H12C11.65,16.59 11,17 10.25,17A2,2 0 0,1 8.25,15H8.75A1.5,1.5 0 0,0 10.25,16.5C10.94,16.5 11.5,16.03 11.7,15.39L11,14Z" />
            </svg>
          </div>
          <h1>Cins Dedektifi</h1>
          <div className="header-icon dog-icon">
            <svg viewBox="0 0 512 512" fill="currentColor">
              <path d="M496,128c0-8.8-7.2-16-16-16h-48V96c0-8.8-7.2-16-16-16H384c-8.8,0-16,7.2-16,16v16H144V96c0-8.8-7.2-16-16-16H96
                c-8.8,0-16,7.2-16,16v16H32c-8.8,0-16,7.2-16,16v64c0,8.8,7.2,16,16,16h32c0,123.7,100.3,224,224,224s224-100.3,224-224h32
                c8.8,0,16-7.2,16-16V128z M192,368c-8.8,0-16-7.2-16-16s7.2-16,16-16s16,7.2,16,16S200.8,368,192,368z M192,320
                c-8.8,0-16-7.2-16-16s7.2-16,16-16s16,7.2,16,16S200.8,320,192,320z M288,368c-8.8,0-16-7.2-16-16s7.2-16,16-16s16,7.2,16,16
                S296.8,368,288,368z M288,320c-8.8,0-16-7.2-16-16s7.2-16,16-16s16,7.2,16,16S296.8,320,288,320z M400,256
                c-8.8,0-16-7.2-16-16s7.2-16,16-16s16,7.2,16,16S408.8,256,400,256z"/>
            </svg>
          </div>
        </div>
        <p>Evcil hayvanınızın fotoğrafını yükleyin ve cinsini öğrenin!</p>
      </div>

      {/* Animal type tabs */}
      <div className="animal-type-tabs">
        <button 
          className={`tab-button ${selectedTab === 'kedi' ? 'active' : ''}`}
          onClick={() => setSelectedTab('kedi')}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="tab-icon">
            <path d="M12,8L10.67,8.09C9.81,7.07 7.4,4.5 5,4.5C5,4.5 3.03,7.46 4.96,11.41C4.41,12.24 4.07,12.67 4,13.66L2.07,13.95L2.28,14.93L4.04,14.67L4.18,15.38L2.61,16.32L3.08,17.21L4.53,16.32C5.68,18.76 8.59,20 12,20C15.41,20 18.32,18.76 19.47,16.32L20.92,17.21L21.39,16.32L19.82,15.38L19.96,14.67L21.72,14.93L21.93,13.95L20,13.66C19.93,12.67 19.59,12.24 19.04,11.41C20.97,7.46 19,4.5 19,4.5C16.6,4.5 14.19,7.07 13.33,8.09L12,8M9,11A1,1 0 0,1 10,12A1,1 0 0,1 9,13A1,1 0 0,1 8,12A1,1 0 0,1 9,11M15,11A1,1 0 0,1 16,12A1,1 0 0,1 15,13A1,1 0 0,1 14,12A1,1 0 0,1 15,11M11,14H13L12.3,15.39C12.5,16.03 13.06,16.5 13.75,16.5A1.5,1.5 0 0,0 15.25,15H15.75A2,2 0 0,1 13.75,17C13,17 12.35,16.59 12,16V16H12C11.65,16.59 11,17 10.25,17A2,2 0 0,1 8.25,15H8.75A1.5,1.5 0 0,0 10.25,16.5C10.94,16.5 11.5,16.03 11.7,15.39L11,14Z" />
          </svg>
          <span>Kedi</span>
        </button>
        <button 
          className={`tab-button ${selectedTab === 'köpek' ? 'active' : ''}`}
          onClick={() => setSelectedTab('köpek')}
        >
         
         <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className='tab-icon'>
<path fill-rule="evenodd" clip-rule="evenodd" d="M16 4V7C16 9.20914 14.2091 11 12 11H10V15H0V13L0.931622 10.8706C1.25226 10.9549 1.59036 11 1.94124 11C3.74931 11 5.32536 9.76947 5.76388 8.01538L3.82359 7.53031C3.60766 8.39406 2.83158 9.00001 1.94124 9.00001C1.87789 9.00001 1.81539 8.99702 1.75385 8.99119C1.02587 8.92223 0.432187 8.45551 0.160283 7.83121C0.0791432 7.64491 0.0266588 7.44457 0.00781272 7.23658C-0.0112323 7.02639 0.00407892 6.80838 0.0588889 6.58914C0.0588882 6.58914 0.0588896 6.58913 0.0588889 6.58914L0.698705 4.02986C1.14387 2.24919 2.7438 1 4.57928 1H10L12 4H16ZM9 6C9.55229 6 10 5.55228 10 5C10 4.44772 9.55229 4 9 4C8.44771 4 8 4.44772 8 5C8 5.55228 8.44771 6 9 6Z" fill="currentColor"/>
</svg>
          <span>Köpek</span>
        </button>
      </div>

      <div className="breed-detector-content">
        <div className="upload-section">
          <div 
            className={`upload-area ${isDragging ? 'dragging' : ''} ${selectedImage ? 'has-image' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            {selectedImage ? (
              <div className="preview-container">
                <img 
                  src={selectedImage} 
                  alt="Preview" 
                  className="image-preview"
                  ref={imageRef}
                />
                <button className="remove-image" onClick={(e) => { e.stopPropagation(); handleReset(); }}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ) : (
              <>
                <div className="upload-icons">
                  {selectedTab === 'kedi' ? (
                    <div className="upload-icon cat-icon">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12,8L10.67,8.09C9.81,7.07 7.4,4.5 5,4.5C5,4.5 3.03,7.46 4.96,11.41C4.41,12.24 4.07,12.67 4,13.66L2.07,13.95L2.28,14.93L4.04,14.67L4.18,15.38L2.61,16.32L3.08,17.21L4.53,16.32C5.68,18.76 8.59,20 12,20C15.41,20 18.32,18.76 19.47,16.32L20.92,17.21L21.39,16.32L19.82,15.38L19.96,14.67L21.72,14.93L21.93,13.95L20,13.66C19.93,12.67 19.59,12.24 19.04,11.41C20.97,7.46 19,4.5 19,4.5C16.6,4.5 14.19,7.07 13.33,8.09L12,8M9,11A1,1 0 0,1 10,12A1,1 0 0,1 9,13A1,1 0 0,1 8,12A1,1 0 0,1 9,11M15,11A1,1 0 0,1 16,12A1,1 0 0,1 15,13A1,1 0 0,1 14,12A1,1 0 0,1 15,11M11,14H13L12.3,15.39C12.5,16.03 13.06,16.5 13.75,16.5A1.5,1.5 0 0,0 15.25,15H15.75A2,2 0 0,1 13.75,17C13,17 12.35,16.59 12,16V16H12C11.65,16.59 11,17 10.25,17A2,2 0 0,1 8.25,15H8.75A1.5,1.5 0 0,0 10.25,16.5C10.94,16.5 11.5,16.03 11.7,15.39L11,14Z" />
                      </svg>
                    </div>
                  ) : (
                    <div className="upload-icon dog-icon">
                    
                    <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M16 4V7C16 9.20914 14.2091 11 12 11H10V15H0V13L0.931622 10.8706C1.25226 10.9549 1.59036 11 1.94124 11C3.74931 11 5.32536 9.76947 5.76388 8.01538L3.82359 7.53031C3.60766 8.39406 2.83158 9.00001 1.94124 9.00001C1.87789 9.00001 1.81539 8.99702 1.75385 8.99119C1.02587 8.92223 0.432187 8.45551 0.160283 7.83121C0.0791432 7.64491 0.0266588 7.44457 0.00781272 7.23658C-0.0112323 7.02639 0.00407892 6.80838 0.0588889 6.58914C0.0588882 6.58914 0.0588896 6.58913 0.0588889 6.58914L0.698705 4.02986C1.14387 2.24919 2.7438 1 4.57928 1H10L12 4H16ZM9 6C9.55229 6 10 5.55228 10 5C10 4.44772 9.55229 4 9 4C8.44771 4 8 4.44772 8 5C8 5.55228 8.44771 6 9 6Z" fill="currentColor"/>
</svg>
                    </div>
                  )}
                </div>
                <div className="upload-arrow">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
                <p>
                  {selectedTab === 'kedi' 
                    ? 'Kedi fotoğrafı yüklemek için tıklayın veya sürükleyin' 
                    : 'Köpek fotoğrafı yüklemek için tıklayın veya sürükleyin'
                  }
                </p>
              </>
            )}
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleImageChange} 
              ref={fileInputRef}
              style={{ display: 'none' }}
            />
          </div>

          <div className="action-buttons">
            <button 
              className="detect-button" 
              onClick={handleDetectBreed} 
              disabled={!selectedImage || isLoading}
            >
              {isLoading ? (
                <div className="loading-spinner"></div>
              ) : (
                <>
                  <span className="button-icon">🔍</span>
                  <span>Cins Tespit Et</span>
                </>
              )}
            </button>
            <button 
              className="reset-button" 
              onClick={handleReset}
              disabled={!selectedImage || isLoading}
            >
              <span className="button-icon">↺</span>
              <span>Sıfırla</span>
            </button>
          </div>
        </div>

        {result && (
          <div className="result-section">
            <div className="result-card">
              <div className="result-header">
                <h2>Sonuç</h2>
                <div className="result-icon">
                  {result.type === 'Kedi' ? (
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12,8L10.67,8.09C9.81,7.07 7.4,4.5 5,4.5C5,4.5 3.03,7.46 4.96,11.41C4.41,12.24 4.07,12.67 4,13.66L2.07,13.95L2.28,14.93L4.04,14.67L4.18,15.38L2.61,16.32L3.08,17.21L4.53,16.32C5.68,18.76 8.59,20 12,20C15.41,20 18.32,18.76 19.47,16.32L20.92,17.21L21.39,16.32L19.82,15.38L19.96,14.67L21.72,14.93L21.93,13.95L20,13.66C19.93,12.67 19.59,12.24 19.04,11.41C20.97,7.46 19,4.5 19,4.5C16.6,4.5 14.19,7.07 13.33,8.09L12,8M9,11A1,1 0 0,1 10,12A1,1 0 0,1 9,13A1,1 0 0,1 8,12A1,1 0 0,1 9,11M15,11A1,1 0 0,1 16,12A1,1 0 0,1 15,13A1,1 0 0,1 14,12A1,1 0 0,1 15,11M11,14H13L12.3,15.39C12.5,16.03 13.06,16.5 13.75,16.5A1.5,1.5 0 0,0 15.25,15H15.75A2,2 0 0,1 13.75,17C13,17 12.35,16.59 12,16V16H12C11.65,16.59 11,17 10.25,17A2,2 0 0,1 8.25,15H8.75A1.5,1.5 0 0,0 10.25,16.5C10.94,16.5 11.5,16.03 11.7,15.39L11,14Z" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 512 512" fill="currentColor">
                      <path d="M496,128c0-8.8-7.2-16-16-16h-48V96c0-8.8-7.2-16-16-16H384c-8.8,0-16,7.2-16,16v16H144V96c0-8.8-7.2-16-16-16H96
                        c-8.8,0-16,7.2-16,16v16H32c-8.8,0-16,7.2-16,16v64c0,8.8,7.2,16,16,16h32c0,123.7,100.3,224,224,224s224-100.3,224-224h32
                        c8.8,0,16-7.2,16-16V128z M192,368c-8.8,0-16-7.2-16-16s7.2-16,16-16s16,7.2,16,16S200.8,368,192,368z M192,320
                        c-8.8,0-16-7.2-16-16s7.2-16,16-16s16,7.2,16,16S200.8,320,192,320z M288,368c-8.8,0-16-7.2-16-16s7.2-16,16-16s16,7.2,16,16
                        S296.8,368,288,368z M288,320c-8.8,0-16-7.2-16-16s7.2-16,16-16s16,7.2,16,16S296.8,320,288,320z M400,256
                        c-8.8,0-16-7.2-16-16s7.2-16,16-16s16,7.2,16,16S408.8,256,400,256z"/>
                    </svg>
                  )}
                </div>
              </div>
              <div className="result-content">
                <div className="result-item">
                  <span className="label">Cins:</span>
                  <span className="value">{result.breed}</span>
                </div>
                {result.confidence !== undefined && (
                  <div className="result-item">
                    <span className="label">Doğruluk Oranı:</span>
                    <div className="confidence-bar-container">
                      <div 
                        className="confidence-bar"
                        style={{ width: `${Math.round(result.confidence)}%` }}
                      />
                      <span className="confidence-text">%{Math.round(result.confidence)}</span>
                    </div>
                  </div>
                )}
                <div className="breed-image">
                  {result.type === 'Kedi' ? (
                    <div className="cat-silhouette"></div>
                  ) : (
                    <div className="dog-silhouette"></div>
                  )}
                </div>
              </div>
              <div className="result-footer">
                <p>Not: Bu sonuçlar Tensorflow Modeli tahminidir ve %100 doğru olmayabilir.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="breed-detector-info">
        <div className="info-card">
          <div className="info-card-header">
            <h3>Nasıl Çalışır?</h3>
            <div className="info-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,17H13V11H11V17Z" />
              </svg>
            </div>
          </div>
          <p>
            {selectedTab === 'kedi' 
              ? 'Cins Dedektifi, OpenAI Vision API kullanarak kedi fotoğraflarından cinsi tespit eder. En iyi sonuç için net ve kedinin tüm vücudunun göründüğü fotoğraflar kullanın.' 
              : 'Cins Dedektifi, API kullanarak köpek fotoğraflarından cinsi tespit eder. En iyi sonuç için net ve köpeğin tüm vücudunun göründüğü fotoğraflar kullanın.'
            }
          </p>
        </div>
        <div className="info-card">
          <div className="info-card-header">
            <h3>İpuçları</h3>
            <div className="info-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12,2A7,7 0 0,1 19,9C19,11.38 17.81,13.47 16,14.74V17A1,1 0 0,1 15,18H9A1,1 0 0,1 8,17V14.74C6.19,13.47 5,11.38 5,9A7,7 0 0,1 12,2M9,21V20H15V21A1,1 0 0,1 14,22H10A1,1 0 0,1 9,21M12,4A5,5 0 0,0 7,9C7,11.05 8.23,12.81 10,13.58V16H14V13.58C15.77,12.81 17,11.05 17,9A5,5 0 0,0 12,4Z" />
              </svg>
            </div>
          </div>
          <ul>
            <li><span className="tip-icon">📸</span> İyi aydınlatılmış ortamda çekilmiş fotoğraflar kullanın</li>
            <li><span className="tip-icon">👁️</span> Hayvanın yüzünün net göründüğü fotoğraflar seçin</li>
            <li><span className="tip-icon">🐾</span> Fotoğrafta sadece tespit etmek istediğiniz hayvan olsun</li>
          </ul>
        </div>
      </div>

      <div className="paw-prints">
        <div className="paw paw-1"></div>
        <div className="paw paw-2"></div>
        <div className="paw paw-3"></div>
        <div className="paw paw-4"></div>
        <div className="paw paw-5"></div>
      </div>
    </div>
  );
};

export default BreedDetector; 