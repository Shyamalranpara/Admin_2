import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const BedTemperatureChart: React.FC = () => {
  const bedTempData = [
    { time: '08:00', Outlate: 770 },
    { time: '09:00', Outlate: 730 },
    { time: '10:00', Outlate: 750 },
    { time: '11:00', Outlate: 780 },
    { time: '12:00', Outlate: 650 },
    { time: '13:00', Outlate: 580 },
    { time: '14:00', Outlate: 420 },
    { time: '15:00', Outlate: 590 },
    { time: '16:00', Outlate: 620 },
    { time: '17:00', Outlate: 580 },
    { time: '18:00', Outlate: 590 },
    { time: '19:00', Outlate: 508 },
    { time: '20:00', Outlate: 550 },
    { time: '21:00', Outlate: 580 },
    { time: '22:00', Outlate: 550 },
    { time: '23:00', Outlate: 590 },
    { time: '00:00', Outlate: 620 },
    { time: '01:00', Outlate: 630 },
    { time: '02:00', Outlate: 640 },
    { time: '03:00', Outlate: 650 },
    { time: '04:00', Outlate: 630 },
    { time: '05:00', Outlate: 650 },
    { time: '06:00', Outlate: 630 },
    { time: '07:00', Outlate: 650 },
  ];

  const data = {
    labels: bedTempData.map((item) => item.time),
    datasets: [
      {
        label: 'Oil Outlet',
        data: bedTempData.map((item) => item.Outlate),
        backgroundColor: '#405189',
        borderColor: '#405189',
        fill: false,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      y: {
        min: 0,
        max: 800,
        ticks: {
          stepSize: 200,
        },
        title: {
          display: true,
          text: 'Bed Temperature',
        },
      },
      x: {
        ticks: {
          autoSkip: false,
          maxRotation: 45,
          minRotation: 45,
        },
      },
    },
  };

  return (
    <div>
      <Line data={data} options={options} />
    </div>
  );
};

export default BedTemperatureChart;
