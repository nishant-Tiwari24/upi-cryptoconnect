import React, { useState } from 'react';
import axios from 'axios';

const Chatbot = ({ transactions }) => {
  const [answer, setAnswer] = useState('');

  const generateAnswer = async () => {
    try {
      const transactionDetails = transactions.map(transaction => {
        return `Description: ${transaction.description}, Amount: ${transaction.amount}, Category: ${transaction.category}, Date: ${new Date(transaction.timestamp).toLocaleDateString()}`;
      }).join("\n");

      const response = await axios.post(
        'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyB5HJkYLT-A94YKlybi46UtRyPBl_Lry3o',
        {
          contents: [{
            parts: [{
              text: `Based on the following past transactions, suggest savings, investments, and lifestyle recommendations in diffrent section and in detail, Tell according to you where i have wasted money according to transactions: answer should in minimum 3000 words \n\n${transactionDetails}`
            }]
          }]
        }
      );

      if (response.data && response.data.candidates && response.data.candidates[0] && response.data.candidates[0].content && response.data.candidates[0].content.parts) {
        setAnswer(response.data.candidates[0].content.parts[0].text);
      } else {
        setAnswer('Error: Unable to generate answer. Please try again.');
      }
    } catch (error) {
      console.error('Error generating answer:', error);
      setAnswer('Error: Unable to generate answer. Please try again.');
    }
  };

  return (
    <div className="bg-zinc-800 p-4 w-[1500px] border-zinc-700 border-2 rounded-lg shadow-lg mb-8">
      <h2 className="text-2xl font-bold text-white mb-4">Financial Analysis and Recommendations Based on Historical Transactions </h2>
      <button onClick={generateAnswer} className="bg-amber-500 text-white px-4 py-2 rounded-lg">Get Recommendations</button>
      {answer && (
        <div className="mt-4 p-4 bg-zinc-700 text-white rounded-lg overflow-y-auto">
          <h3 className="text-xl font-bold mb-2">Recommendations:</h3>
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
