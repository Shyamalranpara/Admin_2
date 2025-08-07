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

const EspOutChart: React.FC = () => {
  const EspOutData = [
    { time: '08:00', Outlate: 170 },
    { time: '09:00', Outlate: 165 },
    { time: '10:00', Outlate: 175 },
    { time: '11:00', Outlate: 155 },
    { time: '12:00', Outlate: 185 },
    { time: '13:00', Outlate: 150 },
    { time: '14:00', Outlate: 155 },
    { time: '15:00', Outlate: 175 },
    { time: '16:00', Outlate: 185 },
    { time: '17:00', Outlate: 165 },
    { time: '18:00', Outlate: 178 },
    { time: '19:00', Outlate: 165 },
    { time: '20:00', Outlate: 185 },
    { time: '21:00', Outlate: 185 },
    { time: '22:00', Outlate: 155 },
    { time: '23:00', Outlate: 165 },
    { time: '00:00', Outlate: 175 },
    { time: '01:00', Outlate: 155 },
    { time: '02:00', Outlate: 165 },
    { time: '03:00', Outlate: 155 },
    { time: '04:00', Outlate: 165 },
    { time: '05:00', Outlate: 155 },
    { time: '06:00', Outlate: 165 },
    { time: '07:00', Outlate: 155 },
  ];

  const data = {
    labels: EspOutData.map((item) => item.time),
    datasets: [
      {
        label: 'ESP OUT',
        data: EspOutData.map((item) => item.Outlate),
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
        max: 200,
        ticks: {
          stepSize: 50,
        },
        title: {
          display: true,
          text: 'ESP OUT',
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

export default EspOutChart;
