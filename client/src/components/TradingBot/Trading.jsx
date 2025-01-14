import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'tailwindcss/tailwind.css';
import { FaChartLine, FaTable } from 'react-icons/fa';
import Chart from 'chart.js/auto';

const RealTimeStockData = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(
          `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=demo`
        );

        console.log('API Response:', result.data);

        const timeSeries = result.data['Time Series (5min)'];
        if (!timeSeries) {
          console.error('Time Series data is undefined or null');
          return;
        }

        const chartData = Object.keys(timeSeries).map(time => ({
          time,
          open: parseFloat(timeSeries[time]['1. open']),
          high: parseFloat(timeSeries[time]['2. high']),
          low: parseFloat(timeSeries[time]['3. low']),
          close: parseFloat(timeSeries[time]['4. close']),
          volume: parseFloat(timeSeries[time]['5. volume'])
        }));

        setData(chartData.reverse());
        updateCharts(chartData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

    const intervalId = setInterval(fetchData, 60000); // Fetch new data every minute

    return () => clearInterval(intervalId);
  }, []);

  const updateCharts = (chartData) => {
    if (!chartData.length) return;

    // Destroy existing charts if they exist to avoid duplicate charts
    if (Chart.getChart('priceChart')) Chart.getChart('priceChart').destroy();
    if (Chart.getChart('volumeChart')) Chart.getChart('volumeChart').destroy();
    if (Chart.getChart('highLowChart')) Chart.getChart('highLowChart').destroy();
    if (Chart.getChart('openCloseChart')) Chart.getChart('openCloseChart').destroy();

    // Price over Time
    new Chart(document.getElementById('priceChart'), {
      type: 'line',
      data: {
        labels: chartData.map(entry => entry.time),
        datasets: [
          {
            label: 'Close Price',
            data: chartData.map(entry => entry.close),
            borderColor: '#28a745', // Green
            backgroundColor: 'rgba(40, 167, 69, 0.1)',
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            labels: {
              color: '#fff',
            },
          },
          tooltip: {
            backgroundColor: '#1f2937', // Zinc color
            titleColor: '#fff',
            bodyColor: '#fff',
            borderColor: '#28a745', // Green color
            borderWidth: 1,
          },
        },
        scales: {
          x: {
            ticks: {
              color: '#fff',
            },
            grid: {
              color: '#555',
            },
          },
          y: {
            ticks: {
              color: '#fff',
            },
            grid: {
              color: '#555',
            },
          },
        },
      },
    });

    // Volume over Time
    new Chart(document.getElementById('volumeChart'), {
      type: 'bar',
      data: {
        labels: chartData.map(entry => entry.time),
        datasets: [
          {
            label: 'Volume',
            data: chartData.map(entry => entry.volume),
            borderColor: '#dc3545', // Blue
            backgroundColor: '#dc3545'
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            labels: {
              color: '#fff',
            },
          },
          tooltip: {
            backgroundColor: '#dc3545', // Zinc color
            titleColor: '#fff',
            bodyColor: '#fff',
            borderColor: '#dc3545', // Blue color
            borderWidth: 1,
          },
        },
        scales: {
          x: {
            ticks: {
              color: '#fff',
            },
            grid: {
              color: '#555',
            },
          },
          y: {
            ticks: {
              color: '#fff',
            },
            grid: {
              color: '#555',
            },
          },
        },
      },
    });

    // High and Low Prices
    new Chart(document.getElementById('highLowChart'), {
      type: 'line',
      data: {
        labels: chartData.map(entry => entry.time),
        datasets: [
          {
            label: 'High Price',
            data: chartData.map(entry => entry.high),
            borderColor: '#28a745', // Green
            backgroundColor: 'rgba(40, 167, 69, 0.1)',
          },
          {
            label: 'Low Price',
            data: chartData.map(entry => entry.low),
            borderColor: '#dc3545', // Red
            backgroundColor: 'rgba(220, 53, 69, 0.1)',
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            labels: {
              color: '#fff',
            },
          },
          tooltip: {
            backgroundColor: '#1f2937', // Zinc color
            titleColor: '#fff',
            bodyColor: '#fff',
            borderColor: '#dc3545', // Red color
            borderWidth: 1,
          },
        },
        scales: {
          x: {
            ticks: {
              color: '#fff',
            },
            grid: {
              color: '#555',
            },
          },
          y: {
            ticks: {
              color: '#fff',
            },
            grid: {
              color: '#555',
            },
          },
        },
      },
    });

    // Open and Close Prices
    new Chart(document.getElementById('openCloseChart'), {
      type: 'line',
      data: {
        labels: chartData.map(entry => entry.time),
        datasets: [
          {
            label: 'Open Price',
            data: chartData.map(entry => entry.open),
            borderColor: '#ffc107', // Yellow
            backgroundColor: 'rgba(255, 193, 7, 0.1)',
          },
          {
            label: 'Close Price',
            data: chartData.map(entry => entry.close),
            borderColor: '#007bff', // Blue
            backgroundColor: 'rgba(0, 123, 255, 0.1)',
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            labels: {
              color: '#fff',
            },
          },
          tooltip: {
            backgroundColor: '#1f2937', // Zinc color
            titleColor: '#fff',
            bodyColor: '#fff',
            borderColor: '#007bff', // Blue color
            borderWidth: 1,
          },
        },
        scales: {
          x: {
            ticks: {
              color: '#fff',
            },
            grid: {
              color: '#555',
            },
          },
          y: {
            ticks: {
              color: '#fff',
            },
            grid: {
              color: '#555',
            },
          },
        },
      },
    });
  };

  return (
    <div className="p-4 bg-black text-white min-h-screen">
     <div className=" bg-black text-white w-[1500px]">
  <h1 className="text-3xl font-bold text-center p-8 mb-4">Real-Time Stock Data <FaChartLine className="inline-block ml-2" /></h1>
  <div className="container mx-auto grid grid-cols-1 gap-[20px] lg:grid-cols-2" style={{ width: '1500px' }}>
    <div className="bg-zinc-800 w-[700px] rounded shadow">
      <h2 className="text-xl font-bold mb-2">Price Over Time</h2>
      <canvas id="priceChart"></canvas>
    </div>
    <div className="bg-zinc-800 w-[700px] rounded shadow">
      <h2 className="text-xl font-bold mb-2">Volume Over Time</h2>
      <canvas id="volumeChart"></canvas>
    </div>
    <div className="bg-zinc-800 w-[700px] rounded shadow">
      <h2 className="text-xl font-bold mb-2">High and Low Prices</h2>
      <canvas id="highLowChart"></canvas>
    </div>
    <div className="bg-zinc-800 w-[700px] rounded shadow">
      <h2 className="text-xl font-bold mb-2">Open and Close Prices</h2>
      <canvas id="openCloseChart"></canvas>
    </div>
  </div>
</div>

      <div className="bg-zinc-800 p-4 rounded shadow mt-4">
        <h2 className="text-2xl font-bold mb-2">Detailed Stock Data <FaTable className="inline-block ml-2" /></h2>
        <table className="min-w-full bg-zinc-800 text-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-gray-700">Time</th>
              <th className="py-2 px-4 border-b border-gray-700">Open</th>
              <th className="py-2 px-4 border-b border-gray-700">High</th>
              <th className="py-2 px-4 border-b border-gray-700">Low</th>
              <th className="py-2 px-4 border-b border-gray-700">Close</th>
              <th className="py-2 px-4 border-b border-gray-700">Volume</th>
              <th className="py-2 px-4 border-b border-gray-700">Change</th>
              <th className="py-2 px-4 border-b border-gray-700">Trades</th>
            </tr>
          </thead>
          <tbody>
            {data.map((entry, index) => (
              <tr key={index} className="border-b border-gray-700">
                <td className="py-2 px-4">{entry.time}</td>
                <td className="py-2 px-4">{entry.open.toFixed(2)}</td>
                <td className="py-2 px-4 text-green-500">{entry.high.toFixed(2)}</td>
                <td className="py-2 px-4 text-red-500">{entry.low.toFixed(2)}</td>
                <td className="py-2 px-4">{entry.close.toFixed(2)}</td>
                <td className="py-2 px-4">{entry.volume}</td>
                <td className={`py-2 px-4 ${entry.close >= entry.open ? 'text-green-500' : 'text-red-500'}`}>
                  {(entry.close - entry.open).toFixed(2)}
                </td>
                <td className="py-2 px-4">{Math.floor(Math.random() * 100)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RealTimeStockData;
