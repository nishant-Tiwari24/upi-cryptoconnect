import React from 'react';
import { Bar } from 'react-chartjs-2';

const BarGraph = ({ title, transactions, type }) => {
  const data = {
    labels: transactions.map((_, index) => index + 1),
    datasets: [
      {
        label: title,
        data: transactions.filter(t => type === 'sent' ? t.amount < 0 : t.amount > 0).map(t => Math.abs(t.amount)),
        backgroundColor: type === 'sent' ? 'lime' : 'orange',
      },
    ],
  };

  return (
    <div className="bg-zinc-800 font-mono p-6 rounded-lg flex-1 border-zinc-700 border-2">
      <h2 className="text-xl mb-4">{title}</h2>
      <Bar data={data} />
    </div>
  );
}

export default BarGraph;