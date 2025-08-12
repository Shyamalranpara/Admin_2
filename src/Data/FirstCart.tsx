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
  const [chartData, setChartData] = useState<{ time: string; value: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5000/breakdown');
        
        if (response.data && response.data.length > 0) {
          // Extract data from the nested structure
          const breakdownData = response.data[0].data || [];
          const formattedData = breakdownData.map((item: any) => ({
            time: item.time,
            value: parseFloat(item.delta) || 0
          }));
          setChartData(formattedData);
        } else {
          // Fallback to static data if no API data
          setChartData([
            { time: '08:00', value: 26 },
            { time: '09:00', value: 20 },
            { time: '10:00', value: 22 },
            { time: '11:00', value: 23 },
            { time: '12:00', value: 24 },
            { time: '13:00', value: 15 },
            { time: '14:00', value: 13 },
            { time: '15:00', value: 13 },
            { time: '16:00', value: 19 },
            { time: '17:00', value: 19 },
            { time: '18:00', value: 17 },
            { time: '19:00', value: 16 },
            { time: '20:00', value: 9 },
            { time: '21:00', value: 8 },
            { time: '22:00', value: 15 },
            { time: '23:00', value: 27 },
            { time: '00:00', value: 23 },
            { time: '01:00', value: 24 },
            { time: '02:00', value: 25 },
            { time: '03:00', value: 27 },
            { time: '04:00', value: 25 },
            { time: '05:00', value: 26 },
            { time: '06:00', value: 19 },
            { time: '07:00', value: 22 },
          ]);
        }
      } catch (error) {
        console.error('Error', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading chart...</div>;
  }

  if (!chartData.length) {
    return <div className="flex items-center justify-center h-64">No data available</div>;
  }

  const maxValue = Math.max(...chartData.map((item) => item.value));
  const minValue = Math.min(...chartData.map((item) => item.value));
  const maxIndex = chartData.findIndex((item) => item.value === maxValue);
  const minIndex = chartData.findIndex((item) => item.value === minValue);

  const data = {
    labels: chartData.map((item) => item.time),
    datasets: [
      {
        label: 'Delta',
        data: chartData.map((item) => item.value), 
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
            weight: 'bold' as const,
          },
          textAlign: 'left' as const,
        },
      },
      tooltip: {
        enabled: true,
      },
              annotation: {
          annotations: {
            line1: {
              type: 'line' as const,
              yMin: 19,
              yMax: 19,
             
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
    <div className="w-full h-full">
      {/* <h3 className="text-lg font-semibold mb-4 text-center">Delta</h3> */}
      <div className="w-full h-full">
        <Line data={data} options={options} plugins={[maxMinValuePlugin]} />
      </div>
    </div>
  );
};

export default FirstCart;
