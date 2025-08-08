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

const FirstCart: React.FC = () => {
  const FirstChartData = [
    { time: '08:00', delta: 26},
    { time: '09:00', delta: 24},
    { time: '10:00', delta: 24},
    { time: '11:00', delta: 24},
    { time: '12:00', delta: 24},
    { time: '13:00', delta: 18},
    { time: '14:00', delta: 15},
    { time: '15:00', delta: 16},
    { time: '16:00', delta: 19},
    { time: '17:00', delta: 13},
    { time: '18:00', delta: 25},
    { time: '19:00', delta: 25},
    { time: '20:00', delta: 22},
    { time: '21:00', delta: 8 },
    { time: '22:00', delta: 20},
    { time: '23:00', delta: 27},
    { time: '00:00', delta: 26},
    { time: '01:00', delta: 25},
    { time: '02:00', delta: 26},
    { time: '03:00', delta: 25},
    { time: '04:00', delta: 24},
    { time: '05:00', delta: 23},
    { time: '06:00', delta: 26},
    { time: '07:00', delta: 22},
  ];

  const maxValue = Math.max(...FirstChartData.map((item) => item.delta));
  const minValue = Math.min(...FirstChartData.map((item) => item.delta));
  const maxIndex = FirstChartData.findIndex(item => item.delta === maxValue);
  const minIndex = FirstChartData.findIndex(item => item.delta === minValue);

  const data = {
    labels: FirstChartData.map((item) => item.time),
    datasets: [
      {
        label: 'Delta',
        data: FirstChartData.map((item) => item.delta),
        backgroundColor: '#405189',
        borderColor: '#405189',
        fill: false,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  // Custom plugin to draw max and min values
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
          line1: {
            type: 'line',
            yMin: 19,
            yMax: 19,
            borderColor: '#A64D79',
            borderWidth: 2,
          },
        },
      },
    },
    scales: {
      y: {
        min: 0,
        max: 40,
        ticks: {
          stepSize: 10,
        },
        title: {
          display: true,
          text: 'Delta',
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

export default FirstCart;
