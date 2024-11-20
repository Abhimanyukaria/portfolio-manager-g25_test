// components/TSLAChart.js
'use client';

import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

const TSLAChart = () => {
  const [data, setData] = useState([]); // State to store the fetched data
  const [chartData, setChartData] = useState(null); // State for chart-ready data
  const [interval, setInterval] = useState('weekly'); // State to track selected interval

  // Fetch stock data and store it in the `data` state
  const fetchData = async () => {
    try {
      const response = await fetch('/api/tsla-data');
      const data2 = await response.json();

      console.log('Fetched data:', data2.quotes);
      setData(data2.quotes); // Store the fetched data in the state
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Filter data based on the selected interval
  const filterDataByInterval = (interval) => {
    if (interval === 'weekly') {
      return data.filter((_, index) => index % 7 === 0); // Filter weekly data
    } else if (interval === 'monthly') {
      return data.filter((_, index) => index % 30 === 0); // Filter monthly data
    } else {
      return data; // Return all data for daily
    }
  };

  // Update chart data when the interval changes or data is updated
  useEffect(() => {
    if (data.length > 0) {
      const filteredData = filterDataByInterval(interval);

      const labels = filteredData.map((item) => new Date(item.date).toLocaleDateString());
      const openPrices = filteredData.map((item) => item.open);

      setChartData({
        labels,
        datasets: [
          {
            data: openPrices,
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            tension: 0.2,
          },
        ],
      });
    }
  }, [interval, data]);

  // Fetch data only once on component mount
  useEffect(() => {
    fetchData();
  }, []);

  // Render loading message if data isn't available yet
  if (!chartData) return <p>Loading...</p>;

  return (
    <div>
      <h2>TSLA Stock Prices ({interval.toUpperCase()})</h2>

      {/* Radio Buttons for interval selection */}
      

      <Line
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: {
              display: false, // Hide the legend as there's only one dataset
            },
            title: {
              display: true,
              text: `TSLA Stock Open Prices (${interval.toUpperCase()})`,
            },
          },
          elements: {
            point: {
              radius: 1,
            },
          },
        }}
      />

<div className="mydict" style={{ marginBottom: '20px' }}>
        <div>
          <label>
            <input
              type="radio"
              name="interval"
              value="daily"
              checked={interval === 'daily'}
              onChange={(e) => setInterval(e.target.value)} // Update state on change
            />
            <span>Daily</span>
          </label>
          <label>
            <input
              type="radio"
              name="interval"
              value="weekly"
              checked={interval === 'weekly'}
              onChange={(e) => setInterval(e.target.value)} // Update state on change
            />
            <span>Weekly</span>
          </label>
          <label>
            <input
              type="radio"
              name="interval"
              value="monthly"
              checked={interval === 'monthly'}
              onChange={(e) => setInterval(e.target.value)} // Update state on change
            />
            <span>Monthly</span>
          </label>
        </div>
      </div>


    </div>
  );
};

export default TSLAChart;
