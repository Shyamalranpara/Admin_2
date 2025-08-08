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

  const maxValue = Math.max(...oilOutlateData.map((item) => item.Outlate));
  const minValue = Math.min(...oilOutlateData.map((item) => item.Outlate));
  const maxIndex = oilOutlateData.findIndex(item => item.Outlate === maxValue);
  const minIndex = oilOutlateData.findIndex(item => item.Outlate === minValue);

  const data = {
    labels: oilOutlateData.map((item) => item.time),
    datasets: [
      {
        label: 'Outlate',
        data: oilOutlateData.map((item) => Number(item.Outlate)),
        backgroundColor: '#00928B',
        borderColor: '#00928B',
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
         Legend:{
                     display:false
                   },
                   labels: {
                     font: {
                       size: 20, 
                       weight: 'bold' 
                     },
                      textAlign: 'start', 
                   }
                 },
      tooltip: {
        enabled: true,
      },
      annotation: {
        annotations: {
          line1: {
            type: 'line',
            yMin: 340,
            yMax: 340,
            borderColor: '#A64D79',
            borderWidth: 2,
          },
        },
      },
    },
    scales: {
      y: {
        min: 0,
        max: 400,
        ticks: {
           font: {
          size: 15
        },
          stepSize: 100,
        },
        title: {
          font: {
          size: 15
        },
          display: true,
          text: 'Outlate',
        },
      },
      x: {
        ticks: {
           font: {
          size: 15
        },
          autoSkip: false,
          maxRotation: 45,
          minRotation: 45,
        },
      },
    },
  };

  return (
    <div>
      <Line data={data} options={options} plugins={[maxMinValuePlugin]}/>
    </div>
  );
};

export default OilOutlateChart;
