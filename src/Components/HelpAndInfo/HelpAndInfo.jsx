import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useNavigate,
} from "react-router-dom";
import "./HelpAndInfo.css"; // CSS dosyamızı import ediyoruz.
import QuestionDetail from "./QuestionDetail";

const HelpAndInfo = () => {
  const [searchTerm, setSearchTerm] = useState(""); // Arama terimini tutmak için useState
  const [activeCategory, setActiveCategory] = useState("En Son Sorulan Sorular"); // Kategori seçimi için state
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [questions, setQuestions] = useState([]); // New state for questions
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  const navigate = useNavigate(); // Sayfa yönlendirme için React Router'ın useNavigate hook'u

  // Kategoriler
  const categories = [
    "Hayvan Hakları ve Hukuki",
    "Köpek Irkları",
    "Köpek Bakımı",
    "Kedi Beslemesi",
    "Kedi Genel Konular",
  ];

  // Kategoriye tıklanıldığında aktif hale getirmek
  const handleCategoryClick = (category) => {
    if (activeCategory === category) {
      setActiveCategory(null);
    } else {
      setActiveCategory(category);
    }
  };

  const handleNewQuestionClick = () => {
    navigate("/new-answer"); // Yeni sayfaya yönlendiriyor
  };

  // Fetch questions from API
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/questions");
        if (!response.ok) {
          throw new Error("Failed to fetch questions");
        }
        const data = await response.json();
        setQuestions(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const handleQuestionClick = (questionId) => {
    navigate(`/question/${questionId}`); // Sorunun detay sayfasına yönlendirme
  };

  return (
    <div className="help-info-wrapper">
      <div className="sidebar-left">
        <button
          className="ask-new-question-btn"
          onClick={handleNewQuestionClick}
        >
          Yeni Soru Sor
        </button>
        <input
          type="text"
          className="search-inpt"
          placeholder="Soru başlıkları içerisinde ara..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="search-buton">Ara</button>

        <div className="categories-list">
          <h3>Genel Soru Başlıkları</h3>
          {categories.map((category, index) => (
            <div
              key={index}
              className="category-item"
              onClick={() => handleCategoryClick(category)} // Kategorilere tıklanabilirlik ekledik
            >
              {category}
            </div>
          ))}
        </div>
      </div>

      <div className="content-right">
        <div className="questions-header">
          <h3>En Son Sorulan Sorular</h3>
        </div>

        <div className="questions-container">
          {loading ? (
            <div>Loading questions...</div>
          ) : error ? (
            <div>Error: {error}</div>
          ) : (
            <>
              {questions.map((question, index) => (
                <div
                  key={question.id}
                  className="question-box"
                  onClick={() => handleQuestionClick(question.id)}
                >
                  <h4>{question.title}</h4>
                  <p>
                    {question.user.firstName} {question.user.lastName} sordu -{" "}
                    {new Date(question.datePosted).toLocaleString("tr-TR")}
                  </p>
                  <div className="question-meta-data">
                    <span>0 Görüntüleme</span>
                    <span>{question.answers?.length || 0} Cevap</span>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>

        {selectedQuestion && <QuestionDetail question={selectedQuestion} />}
      </div>
    </div>
  );
};

export default HelpAndInfo;
