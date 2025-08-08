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

  const maxValue = Math.max(...bedTempData.map((item) => item.Outlate));
  const maxIndex = bedTempData.findIndex(item => item.Outlate === maxValue);
  const minValue = Math.min(...bedTempData.map((item) => item.Outlate));
  const minIndex = bedTempData.findIndex(item => item.Outlate === minValue);

  const data = {
    labels: bedTempData.map((item) => item.time),
    datasets: [
      {
        label: 'Bed Temperature',
        data: bedTempData.map((item) => item.Outlate),
        backgroundColor: '#2B6CEF',
        borderColor: '#2B6CEF',
        fill: false,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  // Custom plugin to draw max value
  const maxValuePlugin = {
    id: 'maxValuePlugin',
    afterDatasetsDraw(chart: any) {
      const { ctx } = chart;
      const meta = chart.getDatasetMeta(0);
      const point = meta.data[maxIndex];

      ctx.save();
      ctx.font = 'bold 14px Arial';
      ctx.fillStyle = 'green';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'bottom';
      ctx.fillText(maxValue.toString(), point.x, point.y - 10);
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
            yMin: 600,
            yMax: 600,
            borderColor: '#A64D79',
            borderWidth: 2,
          },
        },
      },
    },
    scales: {
      y: {
        min: 0,
        max: 800,
        ticks: {
          font: {
          size: 15
        },
          stepSize: 200,
        },
        title: {
          font: {
          size: 15
        },
          display: true,
          text: 'Bed Temperature',
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
      <Line data={data} options={options} plugins={[maxValuePlugin]} />
    </div>
  );
};

export default BedTemperatureChart;
