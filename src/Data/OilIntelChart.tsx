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

const OilIntelChart: React.FC = () => {
  const OilIntelData = [
    { time: '08:00', Outlate: 300 },
    { time: '09:00', Outlate: 301 },
    { time: '10:00', Outlate: 300 },
    { time: '11:00', Outlate: 301 },
    { time: '12:00', Outlate: 300 },
    { time: '13:00', Outlate: 302 },
    { time: '14:00', Outlate: 302 },
    { time: '15:00', Outlate: 302 },
    { time: '16:00', Outlate: 302 },
    { time: '17:00', Outlate: 302 },
    { time: '18:00', Outlate: 302 },
    { time: '19:00', Outlate: 302 },
    { time: '20:00', Outlate: 320 },
    { time: '21:00', Outlate: 302 },
    { time: '22:00', Outlate: 302 },
    { time: '23:00', Outlate: 300 },
    { time: '00:00', Outlate: 302 },
    { time: '01:00', Outlate: 302 },
    { time: '02:00', Outlate: 299 },
    { time: '03:00', Outlate: 299 },
    { time: '04:00', Outlate: 299 },
    { time: '05:00', Outlate: 299 },
    { time: '06:00', Outlate: 301 },
    { time: '07:00', Outlate: 299 },
  ];

  const maxValue = Math.max(...OilIntelData.map((item) => item.Outlate));
  const minValue = Math.min(...OilIntelData.map((item) => item.Outlate));
  const maxIndex = OilIntelData.findIndex(item => item.Outlate === maxValue);
  const minIndex = OilIntelData.findIndex(item => item.Outlate === minValue);

  const data = {
    labels: OilIntelData.map((item) => item.time),
    datasets: [
      {
        label: 'Oil Outlet',
        data: OilIntelData.map((item) => item.Outlate),
        backgroundColor: '#F58143',
        borderColor: '#F58143',
        fill: false,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  // Styled Max/Min plugin like in OilOutlateChart
  const maxMinValuePlugin = {
    id: 'maxMinValuePlugin',
    afterDatasetsDraw(chart: any) {
      const { ctx } = chart;
      const meta = chart.getDatasetMeta(0);

      const drawLabel = (text: string, point: any, bgColor: string, offsetY: number) => {
        ctx.save();
        ctx.font = 'bold 14px Arial';
        const textWidth = ctx.measureText(text).width;
        const padding = 4;
        const textHeight = 16;

        // Background box
        ctx.fillStyle = bgColor;
        ctx.fillRect(
          point.x - textWidth / 2 - padding,
          point.y + offsetY - textHeight + 4,
          textWidth + padding * 2,
          textHeight
        );

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
            weight: 'bold'
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
            yMin: 300,
            yMax: 300,
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
          text: 'Intel',
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

export default OilIntelChart;
