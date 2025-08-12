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

  // Styled Max/Min plugin
  const maxMinValuePlugin = {
    id: 'maxMinValuePlugin',
    afterDatasetsDraw(chart: any) {
      const { ctx } = chart;
      const meta = chart.getDatasetMeta(0);

     const drawRoundedRect = (
        ctx: CanvasRenderingContext2D,
        x: number,
        y: number,
        width: number,
        height: number,
        radius: number
      ) => {
        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.lineTo(x + width - radius, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
        ctx.lineTo(x + width, y + height - radius);
        ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        ctx.lineTo(x + radius, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
        ctx.lineTo(x, y + radius);
        ctx.quadraticCurveTo(x, y, x + radius, y);
        ctx.closePath();
      };

      // Draw label with rounded background
      const drawLabel = (text: string, point: any, bgColor: string, offsetY: number) => {
        ctx.save();
        ctx.font = '16px Arial';
        const textWidth = ctx.measureText(text).width;
        const padding = 6;
        const textHeight = 20;
        const borderRadius = 10;

        const rectX = point.x - textWidth / 2 - padding;
        const rectY = point.y + offsetY - textHeight + 3;
        const rectWidth = textWidth + padding * 2;
        const rectHeight = textHeight;

        // Background with border radius
        ctx.fillStyle = bgColor;
        drawRoundedRect(ctx, rectX, rectY, rectWidth, rectHeight, borderRadius);
        ctx.fill();

        // Optional border

        ctx.stroke();

        // Text
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(text, point.x, point.y + offsetY - textHeight / 2 + 4);

        ctx.restore();
      };


      // Max label
      const maxPoint = meta.data[maxIndex];
      drawLabel(maxValue.toString(), maxPoint, 'green', -14);

      // Min label
      const minPoint = meta.data[minIndex];
      drawLabel(minValue.toString(), minPoint, 'red', 20);
    },
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        labels: {
          font: {
            size: 20,
            weight: 'bold',
          },
          textAlign: 'start',
        },
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
            size: 15,
          },
          stepSize: 100,
        },
        title: {
          font: {
            size: 15,
          },
          display: true,
          text: 'Outlate',
        },
      },
      x: {
        ticks: {
          font: {
            size: 15,
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
      <Line data={data} options={options} plugins={[maxMinValuePlugin]} />
    </div>
  );
};

export default OilOutlateChart;
