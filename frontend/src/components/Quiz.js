import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Quiz({ questions, setUserInterests, userInterests }) {
    const [answers, setAnswers] = useState(userInterests);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const navigate = useNavigate();

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

    const handleSubmit = () => {
        setUserInterests(answers);
        navigate('/dashboard');
    };

    const renderQuestion = () => {
        const question = questions[currentQuestionIndex];
        if (!question || !question.options) {
            return <p>Loading quiz...</p>;
        }

        return (
            <div className="card shadow-sm p-4">
                <h5 className="mb-4">{question.question}</h5>
                {question.options.map((option, index) => (
                    <div key={index} className="form-check mb-2">
                        <input
                            className="form-check-input"
                            type="radio"
                            name={`question-${question.id}`}
                            id={`option-${question.id}-${index}`}
                            value={option.text}
                            checked={answers[question.id] === option.text}
                            onChange={() => handleAnswer(question.id, option.text)}
                        />
                        <label className="form-check-label" htmlFor={`option-${question.id}-${index}`}>
                            {option.text}
                        </label>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className="container mt-5 pt-5 pb-5">
            <div className="row justify-content-center">
                <div className="col-lg-8">
                    <div className="text-center mb-4">
                        <h2>Career Aptitude Quiz</h2>
                        <p className="text-muted">Answer these questions to get personalized recommendations.</p>
                        <hr />
                    </div>

                    {renderQuestion()}

                    <div className="mt-4 d-flex justify-content-between">
                        <button
                            className="btn btn-outline-secondary"
                            onClick={handlePrevious}
                            disabled={currentQuestionIndex === 0}
                        >
                            Previous
                        </button>
                        {currentQuestionIndex < questions.length - 1 ? (
                            <button
                                className="btn btn-primary"
                                onClick={handleNext}
                                disabled={!answers[questions[currentQuestionIndex].id]}
                            >
                                Next
                            </button>
                        ) : (
                            <button
                                className="btn btn-success"
                                onClick={handleSubmit}
                                disabled={!answers[questions[currentQuestionIndex].id]}
                            >
                                Submit & See Recommendations
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Quiz;