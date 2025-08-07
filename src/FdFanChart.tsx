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

const FdFanChart: React.FC = () => {
  const FdFanChartData = [
    { time: '08:00', Outlate: 180 },
    { time: '09:00', Outlate: 170 },
    { time: '10:00', Outlate: 160 },
    { time: '11:00', Outlate: 170 },
    { time: '12:00', Outlate: 160 },
    { time: '13:00', Outlate: 170 },
    { time: '14:00', Outlate: 160 },
    { time: '15:00', Outlate: 165 },
    { time: '16:00', Outlate: 175 },
    { time: '17:00', Outlate: 165 },
    { time: '18:00', Outlate: 160 },
    { time: '19:00', Outlate: 170 },
    { time: '20:00', Outlate: 165 },
    { time: '21:00', Outlate: 155 },
    { time: '22:00', Outlate: 165 },
    { time: '23:00', Outlate: 170 },
    { time: '00:00', Outlate: 175 },
    { time: '01:00', Outlate: 165 },
    { time: '02:00', Outlate: 160 },
    { time: '03:00', Outlate: 170 },
    { time: '04:00', Outlate: 155 },
    { time: '05:00', Outlate: 165 },
    { time: '06:00', Outlate: 170 },
    { time: '07:00', Outlate: 175 },
  ];

  const data = {
    labels: FdFanChartData.map((item) => item.time),
    datasets: [
      {
        label: 'FD Fan',
        data: FdFanChartData.map((item) => item.Outlate),
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
          text: 'intel',
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

export default FdFanChart;
