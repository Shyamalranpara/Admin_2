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
import axios from 'axios'

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend, annotationPlugin);

const FdFanChart: React.FC = () => {
  const [fdChartData, setFdChartData] = useState<{ time: string; value: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5000/breakdown');

        if (response.data && response.data.length > 0) {
          const breakdownData = response.data[0].data || [];
          const formattedData = breakdownData.map((item: any) => ({
            time: item.time,
            value: parseFloat(item.fdFanTemp) || 0
          }));
          setFdChartData(formattedData);
        } else {
         console.log("err",Error)
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [])

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading chart...</div>;
  }

  if (!fdChartData.length) {
    return <div className="flex items-center justify-center h-64">No data available</div>;
  }

  const maxValue = Math.max(...fdChartData.map((item) => item.value));
  const minValue = Math.min(...fdChartData.map((item) => item.value));
  const maxIndex = fdChartData.findIndex(item => item.value === maxValue);
  const minIndex = fdChartData.findIndex(item => item.value === minValue);

  const data = {
    labels: fdChartData.map((item) => item.time),
    datasets: [
      {
        label: 'FD Fan',
        data: fdChartData.map((item) => item.value),
        backgroundColor: '#18C292',
        borderColor: '#18C292',
        fill: false,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

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
        if (!point) return;
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

      if (maxIndex >= 0 && maxIndex < meta.data.length) {
        const maxPoint = meta.data[maxIndex];
        drawLabel(maxValue.toString(), maxPoint, 'green', -14);
      }

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
          text: 'FD Fan',
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

export default FdFanChart;
