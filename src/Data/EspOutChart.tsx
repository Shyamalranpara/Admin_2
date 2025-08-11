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

  const maxValue = Math.max(...EspOutData.map((item) => item.Outlate));
  const minValue = Math.min(...EspOutData.map((item) => item.Outlate));
  const maxIndex = EspOutData.findIndex(item => item.Outlate === maxValue);
  const minIndex = EspOutData.findIndex(item => item.Outlate === minValue);

  const data = {
    labels: EspOutData.map((item) => item.time),
    datasets: [
      {
        label: 'ESP OUT',
        data: EspOutData.map((item) => item.Outlate),
        backgroundColor: '#4784FE',
        borderColor: '#4784FE',
        fill: false,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  // Custom plugin for max/min values
  const maxValuePlugin = {
    id: 'maxValuePlugin',
    afterDatasetsDraw(chart: any) {
      const { ctx } = chart;
      const meta = chart.getDatasetMeta(0);

      const drawLabel = (text: string, point: any, bgColor: string, offsetY: number) => {
        ctx.save();
        ctx.font = 'bold 14px Arial';
        const textWidth = ctx.measureText(text).width;
        const padding = 4;
        const textHeight = 16;

        ctx.fillStyle = bgColor;
        ctx.fillRect(
          point.x - textWidth / 2 - padding,
          point.y + offsetY - textHeight + 4,
          textWidth + padding * 2,
          textHeight
        );

        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(text, point.x, point.y + offsetY - textHeight / 2 + 4);
        ctx.restore();
      };

      const maxPoint = meta.data[maxIndex];
      drawLabel(maxValue.toString(), maxPoint, 'green', -14);

      const minPoint = meta.data[minIndex];
      drawLabel(minValue.toString(), minPoint, 'red', 20);
    }
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
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
            yMin: 170,
            yMax: 170,
            borderColor: '#A64D79',
            borderWidth: 2,
          },
        },
      },
    },
    scales: {
      y: {
        min: 0,
        max: 200,
        ticks: {
          font: {
            size: 15
          },
          stepSize: 50,
        },
        title: {
          font: {
            size: 15
          },
          display: true,
          text: 'ESP Out',
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

export default EspOutChart;
