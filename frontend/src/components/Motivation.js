import React from 'react';

const quotes = [
  "Your future is created by what you do today.",
  "Dream big, work hard, stay focused.",
  "Success is no accident.",
  "Believe you can and you're halfway there.",
  "Hard work beats talent when talent doesn't work hard."
];

function Motivation() {
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  return (
    <div className="container text-center my-4">
      <blockquote className="blockquote fs-4 fst-italic">{randomQuote}</blockquote>
    </div>
  );
}

export default Motivation;
