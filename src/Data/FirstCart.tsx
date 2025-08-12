import React, { useEffect, useState } from 'react';
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
import axios from 'axios';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend, annotationPlugin);

const FirstCart: React.FC = () => {
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    axios
      .get('http://localhost:5000/breakdown')
      .then((res) => {
        console.log('api data', res.data);
        setChartData(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  if (!chartData.length) {
    return <div>Loading chart...</div>;
  }

  const maxValue = Math.max(...chartData.map((item) => item.delta));
  const minValue = Math.min(...chartData.map((item) => item.delta));
  const maxIndex = chartData.findIndex((item) => item.delta === maxValue);
  const minIndex = chartData.findIndex((item) => item.delta === minValue);

  const data = {
  labels: chartData.map((item) => item.time),
  datasets: [
    {
      label: 'Delta',
      data: chartData.map((item) => Number(item.delta)), 
      backgroundColor: '#405189',
      borderColor: '#405189',
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

      const drawLabel = (text: string, point: any, bgColor: string, offsetY: number) => {
        if (!point) return; // safety check

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

        ctx.fillStyle = bgColor;
        drawRoundedRect(ctx, rectX, rectY, rectWidth, rectHeight, borderRadius);
        ctx.fill();

        ctx.stroke();
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(text, point.x, point.y + offsetY - textHeight / 2 + 4);
        ctx.restore();
      };

      // Draw max label if valid
      if (maxIndex >= 0 && maxIndex < meta.data.length) {
        const maxPoint = meta.data[maxIndex];
        drawLabel(maxValue.toString(), maxPoint, 'green', -14);
      }

      // Draw min label if valid
      if (minIndex >= 0 && minIndex < meta.data.length) {
        const minPoint = meta.data[minIndex];
        drawLabel(minValue.toString(), minPoint, 'red', 20);
      }
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
          font: {
            size: 15,
          },
         
        },
        title: {
          font: {
            size: 15,
          },
          display: true,
          text: 'Delta',
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

export default FirstCart;
