import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Quiz({ user, userInterests, setUserInterests }) {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState(userInterests);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [quizResults, setQuizResults] = useState(null);
  const navigate = useNavigate();

  // Fetch questions from backend API
  useEffect(() => {
    fetchQuizQuestions();
  }, [user]);

  const fetchQuizQuestions = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/quiz?user_class=${user?.currentClass || '10'}`);
      const data = await response.json();
      
      // If API fails, use fallback questions
      if (!data || data.length === 0) {
        setQuestions(getFallbackQuestions());
      } else {
        setQuestions(data);
      }
    } catch (error) {
      console.error('Error fetching quiz questions:', error);
      setQuestions(getFallbackQuestions());
    } finally {
      setLoading(false);
    }
  };

  // Fallback questions if API fails
  const getFallbackQuestions = () => [
    {
      id: 1,
      question: "Which subject area interests you the most?",
      options: [
        { text: "Science", value: "Science" },
        { text: "Commerce", value: "Commerce" },
        { text: "Arts/Humanities", value: "Arts" },
        { text: "Vocational Skills", value: "Vocational" }
      ],
      suitable_for_class_10: true,
      suitable_for_class_12: true
    },
    {
      id: 2,
      question: "Do you enjoy working with data and numbers?",
      options: [
        { text: "Yes, I love analyzing data", value: "Yes" },
        { text: "No, I prefer creative tasks", value: "No" }
      ],
      suitable_for_class_10: true,
      suitable_for_class_12: true
    },
    {
      id: 3,
      question: "What type of learning do you prefer?",
      options: [
        { text: "Practical, hands-on projects", value: "Practical" },
        { text: "Theoretical study and research", value: "Theoretical" }
      ],
      suitable_for_class_10: true,
      suitable_for_class_12: true
    },
    {
      id: 4,
      question: "Are you interested in technology and computers?",
      options: [
        { text: "Yes, very much", value: "Yes" },
        { text: "No, not really", value: "No" }
      ],
      suitable_for_class_10: true,
      suitable_for_class_12: true
    },
    {
      id: 5,
      question: "Do you like helping and working with people?",
      options: [
        { text: "Yes, I enjoy social interaction", value: "Yes" },
        { text: "No, I prefer working alone", value: "No" }
      ],
      suitable_for_class_10: true,
      suitable_for_class_12: true
    }
  ];

  const handleAnswer = (questionId, selectedOption) => {
    setAnswers(prevAnswers => ({
      ...prevAnswers,
      [questionId]: selectedOption
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prevIndex => prevIndex - 1);
    }
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    
    try {
      // Submit to backend for analysis
      const response = await fetch('/api/quiz/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          answers: Object.values(answers),
          userProfile: user
        })
      });

      const result = await response.json();
      
      if (result.success) {
        setQuizResults(result);
        setUserInterests(answers); // Update parent state
        
        // Show results for a few seconds, then navigate
        setTimeout(() => {
          navigate('/dashboard');
        }, 5000);
      } else {
        // Fallback: just save answers and navigate
        setUserInterests(answers);
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Error submitting quiz:', error);
      // Fallback: just save answers and navigate
      setUserInterests(answers);
      navigate('/dashboard');
    } finally {
      setSubmitting(false);
    }
  };

  const renderQuestion = () => {
    if (!questions[currentQuestionIndex]) {
      return <div>Loading question...</div>;
    }

    const question = questions[currentQuestionIndex];
    
    return (
      <div className="question-container">
        <div className="progress-bar mb-4">
          <div 
            className="progress-fill" 
            style={{ 
              width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`,
              background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
              height: '8px',
              borderRadius: '4px',
              transition: 'width 0.3s ease'
            }}
          ></div>
          <small className="text-muted mt-2 d-block">
            Question {currentQuestionIndex + 1} of {questions.length}
          </small>
        </div>

        <h5 className="mb-4">{question.question}</h5>

        <div className="options-container">
          {question.options.map((option, index) => (
            <div key={index} className="option-item mb-3">
              <label className="option-label">
                <input
                  type="radio"
                  name={`question-${question.id}`}
                  value={option.text || option.value}
                  checked={answers[question.id] === (option.text || option.value)}
                  onChange={() => handleAnswer(question.id, option.text || option.value)}
                  className="me-3"
                />
                <span className="option-text">{option.text || option.value}</span>
              </label>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderResults = () => (
    <div className="text-center py-5">
      <div className="mb-4">
        <div className="success-icon mb-3">🎉</div>
        <h3 className="text-success">Quiz Completed Successfully!</h3>
        <p className="lead">{quizResults.personalizedMessage}</p>
      </div>

      <div className="recommendations-container">
        <h5>Your Personalized Recommendations:</h5>
        <div className="recommendations-list mt-3">
          {quizResults.recommendations.map((rec, index) => (
            <span key={index} className="badge bg-primary me-2 mb-2 p-2">
              {rec}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <p className="text-muted">Redirecting to dashboard in a few seconds...</p>
        <div className="spinner-border spinner-border-sm" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="container mt-5 pt-5">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Loading your personalized quiz...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5 pt-3">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="text-center mb-4">
            <h2>🧠 Career Aptitude Quiz</h2>
            <p className="lead text-muted">
              {user?.currentClass === '10' 
                ? "Discover the best stream for your 11th-12th studies"
                : "Find your ideal career path and college options"
              }
            </p>
          </div>

          <div className="card shadow-lg border-0 p-4">
            {quizResults ? (
              renderResults()
            ) : (
              <>
                <div className="card-body">
                  {renderQuestion()}
                </div>

                <div className="card-footer bg-transparent">
                  <div className="d-flex justify-content-between">
                    <button 
                      className="btn btn-outline-secondary"
                      onClick={handlePrevious}
                      disabled={currentQuestionIndex === 0}
                    >
                      ← Previous
                    </button>

                    {currentQuestionIndex < questions.length - 1 ? (
                      <button 
                        className="btn btn-primary"
                        onClick={handleNext}
                        disabled={!answers[questions[currentQuestionIndex]?.id]}
                      >
                        Next →
                      </button>
                    ) : (
                      <button 
                        className="btn btn-success"
                        onClick={handleSubmit}
                        disabled={submitting || !answers[questions[currentQuestionIndex]?.id]}
                      >
                        {submitting ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                            Analyzing...
                          </>
                        ) : (
                          'Complete Quiz'
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="text-center mt-4">
            <small className="text-muted">
              Your responses help us provide personalized career recommendations
            </small>
          </div>
        </div>
      </div>

      <style jsx>{`
        .progress-bar {
          background-color: #e9ecef;
          height: 8px;
          border-radius: 4px;
          overflow: hidden;
        }

        .option-label {
          display: flex;
          align-items: center;
          padding: 15px;
          border: 2px solid #e9ecef;
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.3s ease;
          width: 100%;
        }

        .option-label:hover {
          border-color: #667eea;
          background-color: rgba(102, 126, 234, 0.05);
        }

        .option-label input:checked + .option-text {
          color: #667eea;
          font-weight: 600;
        }

        .option-label:has(input:checked) {
          border-color: #667eea;
          background-color: rgba(102, 126, 234, 0.1);
        }

        .success-icon {
          font-size: 3rem;
        }

        .recommendations-list .badge {
          font-size: 0.9rem;
        }
      `}</style>
    </div>
  );
}

export default Quiz;