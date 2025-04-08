import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Intro.css';

const HomePage: React.FC = () => {
  // Add smooth scrolling effect
  useEffect(() => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(this: HTMLAnchorElement, e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href') || '');
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth'
          });
        }
      });
    });
  }, []);

  return (
    <div className="homepage overflow-x-hidden">
      {/* Hero Section */}
      <section className="hero-section relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/30 to-dark/80"></div>
          <img 
            src="/intro.jpg" 
            alt="Cute pets background" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="container mx-auto px-4 z-10 text-center">
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Evcil Hayvanların İçin En İyi Platform
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
              Kayıp ilanları oluştur, yeni bir dost sahiplen, sağlık takibini yap ve daha fazlası!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register" className="btn-primary">
                Hemen Katıl
              </Link>
              <a href="#features" className="btn-secondary">
                Daha Fazla Bilgi
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-dark mb-16">
            <span className="text-primary">SocialPet</span> ile Neler Yapabilirsin?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Lost Pets Feature */}
            <div className="feature-card">
              <div className="feature-icon bg-primary/10">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-dark mb-3">Kayıp Evcil Hayvanlar</h3>
              <p className="text-gray mb-4">
                Kaybolan dostunu bulman için hızlı ve etkili bir platform. İlanını oluştur, topluluk yardımıyla dostunu bul.
              </p>
              
              <div className="mt-auto">
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div className="bg-white rounded-lg p-2 shadow-sm">
                    <img src="/sample-lost-pet-1.jpg" alt="Sample lost pet" className="w-full h-24 object-cover rounded" />
                    <p className="text-xs text-gray mt-1">Boncuk, 3 gün önce kayboldu</p>
                  </div>
                  <div className="bg-white rounded-lg p-2 shadow-sm">
                    <img src="/sample-lost-pet-2.jpg" alt="Sample lost pet" className="w-full h-24 object-cover rounded" />
                    <p className="text-xs text-gray mt-1">Paşa, dün kayboldu</p>
                  </div>
                </div>
                <Link to="/lost" className="text-primary font-medium hover:underline">
                  İlanları Görüntüle →
                </Link>
              </div>
            </div>
            
            {/* Adoption Feature */}
            <div className="feature-card">
              <div className="feature-icon bg-primary/10">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-dark mb-3">Sahiplendirme</h3>
              <p className="text-gray mb-4">
                Yeni bir dost edinmek veya dostunu sahiplendirmek için güvenilir bir ortam. Binlerce hayvan yeni yuvasını bekliyor.
              </p>
              
              <div className="mt-auto">
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div className="bg-white rounded-lg p-2 shadow-sm">
                    <img src="/sample-adoption-1.jpg" alt="Sample adoption" className="w-full h-24 object-cover rounded" />
                    <p className="text-xs text-gray mt-1">Minnoş, 2 aylık</p>
                  </div>
                  <div className="bg-white rounded-lg p-2 shadow-sm">
                    <img src="/sample-adoption-2.jpg" alt="Sample adoption" className="w-full h-24 object-cover rounded" />
                    <p className="text-xs text-gray mt-1">Çomar, 1 yaşında</p>
                  </div>
                </div>
                <Link to="/adopt" className="text-primary font-medium hover:underline">
                  Sahiplendirme İlanları →
                </Link>
              </div>
            </div>
            
            {/* Breed Detector Feature */}
            <div className="feature-card">
              <div className="feature-icon bg-primary/10">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-dark mb-3">Cins Dedektifi (AI)</h3>
              <p className="text-gray mb-4">
                Evcil hayvanının cinsini öğrenmek mi istiyorsun? Yapay zeka destekli cins dedektifi ile hemen öğren.
              </p>
              
              <div className="mt-auto">
                <div className="bg-white rounded-lg p-4 shadow-sm mb-4">
                  <div className="flex items-center justify-center">
                    <div className="relative w-full max-w-xs">
                      <img src="/breed-detector.jpg" alt="Breed detector" className="w-full h-40 object-cover rounded" />
                      <div className="absolute inset-0 flex items-center justify-center bg-primary/30 rounded">
                        <span className="text-white font-medium">Fotoğraf Yükle</span>
                      </div>
                    </div>
                  </div>
                </div>
                <Link to="/breed-detector" className="text-primary font-medium hover:underline">
                  Cins Dedektifini Dene →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section id="community" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold text-dark mb-6">
                <span className="text-primary">Topluluk</span> ile Sorularına Yanıt Bul
              </h2>
              <p className="text-gray mb-6">
                Evcil hayvanlarla ilgili her türlü sorunun yanıtını bulabileceğin, deneyimli hayvan sahiplerinden oluşan topluluğumuza katıl. Sorularını sor, bilgilerini paylaş.
              </p>
              
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-primary font-bold">A</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-dark">Ayşe Y.</h4>
                    <p className="text-gray">Kedim sürekli tüy döküyor, ne yapabilirim?</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 pl-14">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                    <span className="text-gray font-bold">M</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-dark">Mehmet K.</h4>
                    <p className="text-gray">Düzenli tarama ve özel mama ile bu sorunu çözebilirsin...</p>
                  </div>
                </div>
              </div>
              
              <Link to="/help-info" className="btn-primary inline-block">
                Sen de Bir Soru Sor
              </Link>
            </div>
            
            <div className="md:w-1/2">
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/10 rounded-full"></div>
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-primary/10 rounded-full"></div>
                <img 
                  src="/community.jpg" 
                  alt="Pet community" 
                  className="w-full rounded-lg shadow-lg relative z-10"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Donation Section */}
      <section id="donate" className="py-20 bg-primary/5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-dark mb-6">
            <span className="text-primary">Bağış Yap</span>, Hayat Kurtar
          </h2>
          <p className="text-gray mb-10 max-w-2xl mx-auto">
            Barınaklardaki dostlarımıza yardım etmek için bağışta bulun. Senin küçük desteğin, onların hayatında büyük fark yaratabilir.
          </p>
          
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-3xl mx-auto">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="md:w-1/2">
                <img 
                  src="/donation.jpg" 
                  alt="Donation" 
                  className="w-full rounded-lg"
                />
              </div>
              
              <div className="md:w-1/2 text-left">
                <h3 className="text-xl font-semibold text-dark mb-4">Bağışınla Neler Sağlanıyor?</h3>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray">Barınak hayvanları için mama</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray">Veteriner tedavi masrafları</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray">Barınak iyileştirme çalışmaları</span>
                  </li>
                </ul>
                
                <Link to="/donate" className="btn-primary w-full text-center">
                  Bağış Yap
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div className="mb-6 md:mb-0">
              <h2 className="text-2xl font-bold mb-2">SocialPet</h2>
              <p className="text-gray-light">Evcil hayvan sahipleri için en iyi platform</p>
            </div>
            
            <div className="flex gap-6">
              <a href="#" className="text-white hover:text-primary transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.059 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a href="#" className="text-white hover:text-primary transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </a>
              <a href="#" className="text-white hover:text-primary transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                </svg>
              </a>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between">
              <div className="mb-6 md:mb-0">
                <h3 className="text-lg font-semibold mb-4">Hızlı Erişim</h3>
                <ul className="space-y-2">
                  <li><Link to="/" className="text-gray-light hover:text-white transition-colors">Ana Sayfa</Link></li>
                  <li><Link to="/adopt" className="text-gray-light hover:text-white transition-colors">Sahiplendirme</Link></li>
                  <li><Link to="/lost" className="text-gray-light hover:text-white transition-colors">Kayıp İlanları</Link></li>
                  <li><Link to="/help-info" className="text-gray-light hover:text-white transition-colors">Yardım ve Bilgi</Link></li>
                </ul>
              </div>
              
              <div className="mb-6 md:mb-0">
                <h3 className="text-lg font-semibold mb-4">Özellikler</h3>
                <ul className="space-y-2">
                  <li><Link to="/breed-detector" className="text-gray-light hover:text-white transition-colors">Cins Dedektifi</Link></li>
                  <li><Link to="/health-tracking" className="text-gray-light hover:text-white transition-colors">Sağlık Takibi</Link></li>
                  <li><Link to="/vet-pet-shop" className="text-gray-light hover:text-white transition-colors">Veteriner ve Pet Shop</Link></li>
                  <li><Link to="/donate" className="text-gray-light hover:text-white transition-colors">Bağış Yap</Link></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4">İletişim</h3>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="text-gray-light">info@socialpet.com</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span className="text-gray-light">+90 212 345 67 89</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <p className="text-gray-light">© 2025 SocialPet. Tüm hakları saklıdır.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;