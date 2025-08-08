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
import annotationPlugin from 'chartjs-plugin-annotation';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend, annotationPlugin);

const LoadCart: React.FC = () => {
  const LoadData = [
    { time: '08:00', Outlate: 0.5 },
    { time: '09:00', Outlate: 0.5 },
    { time: '10:00', Outlate: 0.5 },
    { time: '11:00', Outlate: 0.5 },
    { time: '12:00', Outlate: 0.5 },
    { time: '13:00', Outlate: 0.5 },
    { time: '14:00', Outlate: 0.5 },
    { time: '15:00', Outlate: 0.5 },
    { time: '16:00', Outlate: 0.5 },
    { time: '17:00', Outlate: 0.5 },
    { time: '18:00', Outlate: 0.5 },
    { time: '19:00', Outlate: 0.5 },
    { time: '20:00', Outlate: 0.5 },
    { time: '21:00', Outlate: 0.5 },
    { time: '22:00', Outlate: 0.5 },
    { time: '23:00', Outlate: 0.5 },
    { time: '00:00', Outlate: 0.5 },
    { time: '01:00', Outlate: 0.5 },
    { time: '02:00', Outlate: 0.5 },
    { time: '03:00', Outlate: 0.5 },
    { time: '04:00', Outlate: 0.5 },
    { time: '05:00', Outlate: 0.5 },
    { time: '06:00', Outlate: 0.5 },
    { time: '07:00', Outlate: 0.5 },
  ];

  const maxValue = Math.max(...LoadData.map((item) => item.Outlate));
  const minValue = Math.min(...LoadData.map((item) => item.Outlate));
  const maxIndex = LoadData.findIndex(item => item.Outlate === maxValue);
  const minIndex = LoadData.findIndex(item => item.Outlate === minValue);

  const data = {
    labels: LoadData.map((item) => item.time),
    datasets: [
      {
        label: 'LOAD',
        data: LoadData.map((item) => item.Outlate),
        backgroundColor: '#F58143',
        borderColor: '#F58143',
        fill: false,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  // Plugin to draw max and min labels
  const maxMinValuePlugin = {
    id: 'maxMinValuePlugin',
    afterDatasetsDraw(chart: any) {
      const { ctx } = chart;
      const meta = chart.getDatasetMeta(0);

      // Max value label
      const maxPoint = meta.data[maxIndex];
      ctx.save();
      ctx.font = 'bold 14px Arial';
      ctx.fillStyle = 'green';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'bottom';
      ctx.fillText(maxValue.toString(), maxPoint.x, maxPoint.y - 10);
      ctx.restore();

      // Min value label
      const minPoint = meta.data[minIndex];
      ctx.save();
      ctx.font = 'bold 14px Arial';
      ctx.fillStyle = 'red';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      ctx.fillText(minValue.toString(), minPoint.x, minPoint.y + 15);
      ctx.restore();
    }
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
      annotation: {
        annotations: {
          baseline: {
            type: 'line',
            yMin: 0,
            yMax: 0,
            borderColor: '#A64D79',
            borderWidth: 2,
          },
        },
      },
    },
    scales: {
      y: {
        min: 0,
        max: 2.5E+7,
        ticks: {
          stepSize: 100,
        },
        title: {
          display: true,
          text: 'Load',
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
      <Line data={data} options={options} plugins={[maxMinValuePlugin]} />
    </div>
  );
};

export default LoadCart;
