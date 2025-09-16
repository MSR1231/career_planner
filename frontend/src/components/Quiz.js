import React, { useState } from 'react';
import intermediateQuestions from '../data/intermediate.json';

const Quiz = ({ setUserInterests, setUserLocation }) => {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  if (!intermediateQuestions || intermediateQuestions.length === 0) {
    return <p>Loading quiz questions...</p>;
  }

  const handleSelect = (questionId, option) => {
    setAnswers(prev => ({ ...prev, [questionId]: option }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!answers[1]) {
      alert('Please select your preferred stream.');
      return;
    }
    setUserInterests(answers);
    // For prototype, assign a static location or get from user profile/preferences
    setUserLocation('Jammu & Kashmir');
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="container py-5">
        <h3>Thank you! Your career preferences have been saved.</h3>
        <p>Go to <a href="/dashboard">Dashboard</a> to check personalized suggestions.</p>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h2>Personalized Career Quiz</h2>
      <form onSubmit={handleSubmit}>
        {intermediateQuestions.map(q => (
          <div className="mb-4" key={q.id}>
            <label className="form-label fw-bold">{q.question}</label>
            <div>
              {q.options.map((opt, idx) => (
                <div className="form-check" key={idx}>
                  <input
                    className="form-check-input"
                    type="radio"
                    name={`q_${q.id}`}
                    id={`q_${q.id}_opt_${idx}`}
                    value={opt.text}
                    checked={answers[q.id] === opt.text}
                    onChange={() => handleSelect(q.id, opt.text)}
                    required={q.id === 1}
                  />
                  <label className="form-check-label" htmlFor={`q_${q.id}_opt_${idx}`}>
                    {opt.text}
                  </label>
                </div>
              ))}
            </div>
          </div>
        ))}
        <button type="submit" className="btn btn-primary">Submit Quiz</button>
      </form>
    </div>
  );
};

export default Quiz;
