import React, { useState, useEffect, MouseEvent } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useNavigate,
} from "react-router-dom";
import "./HelpAndInfo.css"; // CSS dosyamızı import ediyoruz.
import QuestionDetail from "./QuestionDetail";

interface User {
  id: number;
  firstName: string;
  lastName: string;
}

interface Answer {
  id: number;
  content: string;
  datePosted: string;
  user: User;
}

interface Question {
  id: number;
  title: string;
  content: string;
  datePosted: string;
  user: User;
  answers?: Answer[];
}

const HelpAndInfo: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>(""); // Arama terimini tutmak için useState
  const [activeCategory, setActiveCategory] = useState<string>("En Son Sorulan Sorular"); // Kategori seçimi için state
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]); // New state for questions
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  const navigate = useNavigate(); // Sayfa yönlendirme için React Router'ın useNavigate hook'u

  // Kategoriler
  const categories: string[] = [
    "Hayvan Hakları ve Hukuki",
    "Köpek Irkları",
    "Köpek Bakımı",
    "Kedi Beslemesi",
    "Kedi Genel Konular",
  ];

  // Kategoriye tıklanıldığında aktif hale getirmek
  const handleCategoryClick = (category: string): void => {
    if (activeCategory === category) {
      setActiveCategory("");
    } else {
      setActiveCategory(category);
    }
  };

  const handleNewQuestionClick = (): void => {
    navigate("/new-answer"); // Yeni sayfaya yönlendiriyor
  };

  // Fetch questions from API
  useEffect(() => {
    const fetchQuestions = async (): Promise<void> => {
      try {
        const response = await fetch("http://localhost:8080/api/questions");
        if (!response.ok) {
          throw new Error("Failed to fetch questions");
        }
        const data: Question[] = await response.json();
        setQuestions(data);
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const handleQuestionClick = (questionId: number): void => {
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
              {questions.map((question) => (
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

        {selectedQuestion && <QuestionDetail />}
      </div>
    </div>
  );
};

export default HelpAndInfo;
