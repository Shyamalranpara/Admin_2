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

const EspOutChart: React.FC = () => {
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
            value: parseFloat(item.EspOutlet) || 0
          }));
          setChartData(formattedData);
        } else {
          // Fallback to static data if no API data
          setChartData([
            { time: '08:00', value: 170 },
            { time: '09:00', value: 165 },
            { time: '10:00', value: 175 },
            { time: '11:00', value: 155 },
            { time: '12:00', value: 185 },
            { time: '13:00', value: 150 },
            { time: '14:00', value: 155 },
            { time: '15:00', value: 175 },
            { time: '16:00', value: 185 },
            { time: '17:00', value: 165 },
            { time: '18:00', value: 178 },
            { time: '19:00', value: 165 },
            { time: '20:00', value: 185 },
            { time: '21:00', value: 185 },
            { time: '22:00', value: 155 },
            { time: '23:00', value: 165 },
            { time: '00:00', value: 175 },
            { time: '01:00', value: 155 },
            { time: '02:00', value: 165 },
            { time: '03:00', value: 155 },
            { time: '04:00', value: 165 },
            { time: '05:00', value: 155 },
            { time: '06:00', value: 165 },
            { time: '07:00', value: 155 },
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
  const maxIndex = chartData.findIndex(item => item.value === maxValue);
  const minIndex = chartData.findIndex(item => item.value === minValue);

  const data = {
    labels: chartData.map((item) => item.time),
    datasets: [
      {
        label: 'ESP OUT',
        data: chartData.map((item) => item.value),
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

       if (maxIndex >= 0 && maxIndex < meta.data.length) {
        const maxPoint = meta.data[maxIndex];
        drawLabel(maxValue.toString(), maxPoint, 'green', -14);
      }

      // Draw min label if valid
      if (minIndex >= 0 && minIndex < meta.data.length) {
        const minPoint = meta.data[minIndex];
        drawLabel(minValue.toString(), minPoint, 'red', 20);
      }
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
