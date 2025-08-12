import React, { useState, useEffect } from 'react';
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
import { dataService } from '../services/dataService';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend, annotationPlugin);

const BedTemperatureChart: React.FC = () => {
  const [chartData, setChartData] = useState<{ time: string; value: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await dataService.getChartData('bedTemp');
        setChartData(data);
      } catch (error) {
        console.error('Error fetching bed temperature data:', error);
        // Fallback to static data if API fails
        setChartData([
          { time: '08:00', value: 770 },
          { time: '09:00', value: 730 },
          { time: '10:00', value: 750 },
          { time: '11:00', value: 780 },
          { time: '12:00', value: 650 },
          { time: '13:00', value: 580 },
          { time: '14:00', value: 420 },
          { time: '15:00', value: 590 },
          { time: '16:00', value: 620 },
          { time: '17:00', value: 580 },
          { time: '18:00', value: 590 },
          { time: '19:00', value: 508 },
          { time: '20:00', value: 550 },
          { time: '21:00', value: 580 },
          { time: '22:00', value: 550 },
          { time: '23:00', value: 590 },
          { time: '00:00', value: 620 },
          { time: '01:00', value: 630 },
          { time: '02:00', value: 640 },
          { time: '03:00', value: 650 },
          { time: '04:00', value: 630 },
          { time: '05:00', value: 650 },
          { time: '06:00', value: 630 },
          { time: '07:00', value: 650 },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading...</div>;
  }

  const maxValue = Math.max(...chartData.map((item) => item.value));
  const maxIndex = chartData.findIndex(item => item.value === maxValue);
  const minValue = Math.min(...chartData.map((item) => item.value));
  const minIndex = chartData.findIndex(item => item.value === minValue);

  const data = {
    labels: chartData.map((item) => item.time),
    datasets: [
      {
        label: 'Bed Temperature',
        data: chartData.map((item) => item.value),
        backgroundColor: '#2B6CEF',
        borderColor: '#2B6CEF',
        fill: false,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  // Custom plugin to draw max/min with rounded rectangle background
  const maxValuePlugin = {
    id: 'maxValuePlugin',
    afterDatasetsDraw(chart: any) {
      const { ctx } = chart;
      const meta = chart.getDatasetMeta(0);

      // Draw rounded rectangle
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
            yMin: 600,
            yMax: 600,
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
