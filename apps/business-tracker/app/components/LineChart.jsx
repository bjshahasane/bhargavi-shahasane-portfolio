'use client';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title, CategoryScale, Tooltip } from 'chart.js';

ChartJS.register(LineElement, PointElement, LinearScale, Title, CategoryScale, Tooltip);

const LineChart = ({ orders, filter }) => {
  const dateMap = {};


  orders.forEach(order => {
  if (!order.date || order.date.trim() === '') return;

  const originalDate = new Date(order.date);

  if (isNaN(originalDate.getTime())) return;

  let key = '';

  if (filter === 'weekly') {
    const date = new Date(originalDate);
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);

    const weekStart = new Date(date.setDate(diff));

    if (isNaN(weekStart.getTime())) return;

    key = weekStart.toISOString().slice(0, 10);
  } 
  else if (filter === 'monthly') {
    key = `${originalDate.getFullYear()}-${String(originalDate.getMonth() + 1).padStart(2, '0')}`;
  } 
  else {
    key = `${originalDate.getFullYear()}`;
  }

  dateMap[key] = (dateMap[key] || 0) + 1;
});

  const labels = Object.keys(dateMap).sort();
  const values = labels.map(label => dateMap[label]);

  const data = {
    labels,
    datasets: [
      {
        label: 'Orders',
        data: values,
        fill: false,
        borderColor: 'blue',
        tension: 0.3,
      },
    ],
  };

  return <Line data={data} />;
};

export default LineChart;
