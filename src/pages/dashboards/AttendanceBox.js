import React from 'react';
import { CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Tooltip } from 'chart.js';
import { Line } from 'react-chartjs-2';


const data = {
  labels: ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور'],
  datasets: [
    {
      label: 'Sales',
      data: [8.30, 8.45, 9, 9.15, 9, 9, 10],
      borderColor: 'rgba(75, 192, 192, 1)',
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderWidth: 2,
      tension: 0.4, // Smooth curve (set to 0 for straight lines)
      pointBackgroundColor: 'rgba(75, 192, 192, 1)',
      pointBorderColor: '#fff',
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    y: {
      beginAtZero: false, // Prevent starting from zero
      // min: 8, // Minimum value for y-axis
    },

  },
};


const AttendanceBox = () => {
  ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);
  return (
    <div className="defBox h-100 d-flex flex-column ">
      <div className="d-flex align-items-center justify-content-between gap-3">
        <h5 className="mb-0 fw-bold text-black"> جمع تاخیر ها و تعجیل ها</h5>
        <h4 className="fw-bold text-black">8:30</h4>
      </div>
      <div className="flex-1 d-flex justify-content-center align-items-center  ">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default AttendanceBox;