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

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend,annotationPlugin);

const FuleGasChart: React.FC = () => {
  const FuleGasData = [
    { time: '08:00', Outlate: 0 },
    { time: '09:00', Outlate: 0 },
    { time: '10:00', Outlate: 0 },
    { time: '11:00', Outlate: 0 },
    { time: '12:00', Outlate: 0 },
    { time: '13:00', Outlate: 0 },
    { time: '14:00', Outlate: 0 },
    { time: '15:00', Outlate: 0 },
    { time: '16:00', Outlate: 0 },
    { time: '17:00', Outlate: 0 },
    { time: '18:00', Outlate: 0 },
    { time: '19:00', Outlate: 0 },
    { time: '20:00', Outlate: 0 },
    { time: '21:00', Outlate: 0 },
    { time: '22:00', Outlate: 0 },
    { time: '23:00', Outlate: 0 },
    { time: '00:00', Outlate: 0 },
    { time: '01:00', Outlate: 0 },
    { time: '02:00', Outlate: 0 },
    { time: '03:00', Outlate: 0 },
    { time: '04:00', Outlate: 0 },
    { time: '05:00', Outlate: 0 },
    { time: '06:00', Outlate: 0 },
    { time: '07:00', Outlate: 0 },
  ];

  const maxValue = Math.max(...FuleGasData.map((item) => item.Outlate));
  const minValue = Math.min(...FuleGasData.map((item) => item.Outlate));
  const maxIndex = FuleGasData.findIndex(item => item.Outlate === maxValue);
  const minIndex = FuleGasData.findIndex(item => item.Outlate === minValue);

  const data = {
    labels: FuleGasData .map((item) => item.time),
    datasets: [
      {
        label: 'Fule Gas',
        data: FuleGasData .map((item) => item.Outlate),
        backgroundColor: '#683AF3',
        borderColor: '#683AF3',
        fill: false,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

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
            yMin: 300,
            yMax: 300,
            borderColor: '#A64D79',
            borderWidth: 2,
          },
        },
      },
    },
    scales: {
      y: {
        min: -1.0,
        max: 1.0,
        ticks: {
          stepSize: 0.5,
        },
        title: {
          display: true,
          text: 'Fule Gas',
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

export default FuleGasChart;
