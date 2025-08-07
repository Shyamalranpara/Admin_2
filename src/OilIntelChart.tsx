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

const OilIntelChart: React.FC = () => {
  const OilIntelData = [
    { time: '08:00', Outlate: 300 },
    { time: '09:00', Outlate: 301 },
    { time: '10:00', Outlate: 300 },
    { time: '11:00', Outlate: 301 },
    { time: '12:00', Outlate: 300 },
    { time: '13:00', Outlate: 302 },
    { time: '14:00', Outlate: 302 },
    { time: '15:00', Outlate: 302 },
    { time: '16:00', Outlate: 302 },
    { time: '17:00', Outlate: 302 },
    { time: '18:00', Outlate: 302 },
    { time: '19:00', Outlate: 302 },
    { time: '20:00', Outlate: 320 },
    { time: '21:00', Outlate: 302 },
    { time: '22:00', Outlate: 302 },
    { time: '23:00', Outlate: 300 },
    { time: '00:00', Outlate: 302 },
    { time: '01:00', Outlate: 302 },
    { time: '02:00', Outlate: 299 },
    { time: '03:00', Outlate: 299 },
    { time: '04:00', Outlate: 299 },
    { time: '05:00', Outlate: 299 },
    { time: '06:00', Outlate: 301 },
    { time: '07:00', Outlate: 299 },
  ];

  const data = {
    labels: OilIntelData.map((item) => item.time),
    datasets: [
      {
        label: 'Oil Outlet',
        data: OilIntelData.map((item) => item.Outlate),
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
        max: 400,
        ticks: {
          stepSize: 100,
        },
        title: {
          display: true,
          text: 'Oil Outlet',
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

export default OilIntelChart;
