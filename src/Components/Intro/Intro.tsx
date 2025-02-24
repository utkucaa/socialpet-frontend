import React from 'react'
import './Intro.css'

const Intro: React.FC = () => {
  return (
    <div className='intro'>
        <div className="i-left">
            <div className="i-name">
                <span>En İyi Dostunu</span>
                <span>Keşfet ve Sevgini Paylaş!</span>
                <span>Hayvan dostlarınızı bulmak için doğru yerdesiniz! 
                    Sevimli dostlarınızı sahiplenerek hayatınıza sevgi 
                    ve mutluluk katın.</span>
            </div>

            <button className="n-button i-button">Daha Fazla Keşfet</button>
        </div>
        <div className="i-right">
            <img src="/kediköpek.png" alt="Pet" className="i-catdog-img" />
            <img src="/sarı.png" alt="Yellow" className="i-yellow-img" />
            <img src="/yesil.png" alt="Green" className="i-green-img" />
        </div>
    </div>
  )
}

export default Intro