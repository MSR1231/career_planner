import React, {useEffect, useState} from 'react';

function Quiz() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch('/api/quiz')
      .then(res => res.json())
      .then(setQuestions)
      .catch(() => setQuestions([]));
  }, []);

  return (
    <div style={{padding:20}}>
      <h3>Quiz Questions</h3>
      {questions.length === 0 ? <p>Loading...</p> : (
        <ul>
          {questions.map(q => (<li key={q.id}>{q.question}</li>))}
        </ul>
      )}
    </div>
  );
}

export default Quiz;
