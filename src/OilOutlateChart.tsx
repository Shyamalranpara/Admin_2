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

// ✅ Directly define the data inside the component
const OilOutlateChart: React.FC = () => {
  const oilOutlateData = [
    { time: '08:00', Outlate: 340 },
    { time: '09:00', Outlate: 340 },
    { time: '10:00', Outlate: 340 },
    { time: '11:00', Outlate: 340 },
    { time: '12:00', Outlate: 340 },
    { time: '13:00', Outlate: 340 },
    { time: '14:00', Outlate: 340 },
    { time: '15:00', Outlate: 340 },
    { time: '16:00', Outlate: 340 },
    { time: '17:00', Outlate: 340 },
    { time: '18:00', Outlate: 340 },
    { time: '19:00', Outlate: 340 },
    { time: '20:00', Outlate: 340 },
    { time: '21:00', Outlate: 340 },
    { time: '22:00', Outlate: 340 },
    { time: '23:00', Outlate: 340 },
    { time: '00:00', Outlate: 340 },
    { time: '01:00', Outlate: 340 },
    { time: '02:00', Outlate: 340 },
    { time: '03:00', Outlate: 340 },
    { time: '04:00', Outlate: 340 },
    { time: '05:00', Outlate: 340 },
    { time: '06:00', Outlate: 340 },
    { time: '07:00', Outlate: 340 },
  ];

  // ✅ Create chart data
  const data = {
    labels: oilOutlateData.map((item) => item.time),
    datasets: [
      {
        label: 'Outlate',
        data: oilOutlateData.map((item) => Number(item.Outlate)),
        backgroundColor: '#405189',
        borderColor: '#405189',
        fill: false,
        tension: 0.4,
      },
    ],
  };

  return (
    <div>
      <Line data={data} />
    </div>
  );
};

export default OilOutlateChart;
