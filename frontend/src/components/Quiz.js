import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetch('http://localhost:5000/api/quiz')
      .then(res => res.json())
      .then(data => {
        setQuestions(data);
        setAnswers(new Array(data.length).fill(''));
        setLoading(false);
      })
      .catch(() => {
        setQuestions([]);
        setLoading(false);
      });
  }, []);

  const handleAnswerSelect = (answer) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answer;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const response = await fetch('http://localhost:5000/api/quiz/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ answers })
      });

      const data = await response.json();
      
      if (data.success) {
        setRecommendations(data.recommendations);
        setShowResults(true);
      }
    } catch (error) {
      console.error('Error submitting quiz:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setAnswers(new Array(questions.length).fill(''));
    setShowResults(false);
    setRecommendations([]);
  };

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Loading career assessment...</p>
        </div>
      </div>
    );
  }

  if (showResults) {
    return (
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card border-0 shadow-lg">
              <div className="card-header bg-success text-white text-center">
                <h2 className="mb-0">
                  <i className="fas fa-trophy me-2"></i>
                  Your Career Recommendations
                </h2>
              </div>
              <div className="card-body p-5">
                <div className="text-center mb-4">
                  <div className="bg-success bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center" style={{width: '80px', height: '80px'}}>
                    <i className="fas fa-check-circle text-success fa-3x"></i>
                  </div>
                  <h4 className="mt-3 text-success">Assessment Complete!</h4>
                  <p className="text-muted">Based on your responses, here are your top career matches:</p>
                </div>

                <div className="row">
                  {recommendations.map((career, index) => (
                    <div key={index} className="col-md-6 mb-3">
                      <div className="card h-100 border-0 bg-light">
                        <div className="card-body text-center">
                          <div className="text-primary mb-3">
                            <i className="fas fa-star fa-2x"></i>
                          </div>
                          <h5 className="card-title text-primary">{career}</h5>
                          <p className="card-text small text-muted">
                            Recommended based on your interests and aptitude
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-center mt-4">
                  <button onClick={restartQuiz} className="btn btn-outline-primary me-3">
                    <i className="fas fa-redo me-2"></i>Retake Quiz
                  </button>
                  <Link to="/career-paths" className="btn btn-primary">
                    <i className="fas fa-arrow-right me-2"></i>Explore Careers
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card border-0 shadow-lg">
            <div className="card-header bg-primary text-white">
              <div className="d-flex justify-content-between align-items-center">
                <h4 className="mb-0">
                  <i className="fas fa-brain me-2"></i>Career Assessment Quiz
                </h4>
                <span className="badge bg-light text-primary">
                  {currentQuestion + 1} of {questions.length}
                </span>
              </div>
            </div>

            <div className="card-body p-5">
              {/* Progress Bar */}
              <div className="progress mb-4" style={{height: '8px'}}>
                <div 
                  className="progress-bar bg-primary" 
                  role="progressbar" 
                  style={{width: `${((currentQuestion + 1) / questions.length) * 100}%`}}
                ></div>
              </div>

              {/* Question */}
              {questions[currentQuestion] && (
                <div className="mb-4">
                  <h5 className="mb-4 text-center">
                    {questions[currentQuestion].question}
                  </h5>

                  <div className="row">
                    {questions[currentQuestion].options.map((option, index) => (
                      <div key={index} className="col-md-6 mb-3">
                        <button
                          className={`btn btn-lg w-100 ${
                            answers[currentQuestion] === option 
                              ? 'btn-primary' 
                              : 'btn-outline-primary'
                          }`}
                          onClick={() => handleAnswerSelect(option)}
                        >
                          {option}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div className="d-flex justify-content-between mt-4">
                <button
                  className="btn btn-outline-secondary"
                  onClick={handlePrevious}
                  disabled={currentQuestion === 0}
                >
                  <i className="fas fa-arrow-left me-2"></i>Previous
                </button>

                <div className="text-center">
                  <small className="text-muted">
                    Select an answer to continue
                  </small>
                </div>

                {currentQuestion === questions.length - 1 ? (
                  <button
                    className="btn btn-success"
                    onClick={handleSubmit}
                    disabled={!answers[currentQuestion] || submitting}
                  >
                    {submitting ? (
                      <>
                        <i className="fas fa-spinner fa-spin me-2"></i>
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-check me-2"></i>
                        Finish Quiz
                      </>
                    )}
                  </button>
                ) : (
                  <button
                    className="btn btn-primary"
                    onClick={handleNext}
                    disabled={!answers[currentQuestion]}
                  >
                    Next<i className="fas fa-arrow-right ms-2"></i>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Tips Card */}
          <div className="card border-0 shadow-sm mt-4">
            <div className="card-body">
              <h6 className="text-primary mb-3">
                <i className="fas fa-lightbulb me-2"></i>Tips for Better Results
              </h6>
              <ul className="list-unstyled small text-muted mb-0">
                <li><i className="fas fa-check text-success me-2"></i>Answer honestly based on your true interests</li>
                <li><i className="fas fa-check text-success me-2"></i>Think about what genuinely excites you</li>
                <li><i className="fas fa-check text-success me-2"></i>Consider your strengths and natural abilities</li>
                <li><i className="fas fa-check text-success me-2"></i>Don't overthink - go with your first instinct</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Quiz;