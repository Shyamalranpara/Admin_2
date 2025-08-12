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

const FuelGasChart: React.FC = () => {
  const fuelGasData = [
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

  const maxValue = Math.max(...fuelGasData.map((item) => item.Outlate));
  const minValue = Math.min(...fuelGasData.map((item) => item.Outlate));
  const maxIndex = fuelGasData.findIndex(item => item.Outlate === maxValue);
  const minIndex = fuelGasData.findIndex(item => item.Outlate === minValue);

  const data = {
    labels: fuelGasData.map((item) => item.time),
    datasets: [
      {
        label: 'Fuel Gas',
        data: fuelGasData.map((item) => item.Outlate),
        backgroundColor: '#683AF3',
        borderColor: '#683AF3',
        fill: false,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  // Same custom plugin style as BedTemperatureChart
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
      
      // Max value label
      const maxPoint = meta.data[maxIndex];
      drawLabel(maxValue.toString(), maxPoint, 'green', -14);

      // Min value label
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
            yMin: 0.5,
            yMax: 0.5,
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
          font: {
            size: 15
          },
          stepSize: 0.5,
        },
        title: {
          font: {
            size: 15
          },
          display: true,
          text: 'Fuel Gas',
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
      <Line data={data} options={options} plugins={[maxMinValuePlugin]} />
    </div>
  );
};

export default FuelGasChart;
