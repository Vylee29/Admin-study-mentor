import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler, // 1. Register Filler plugin
);

const labels = ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'];

const generateRandomData = () => {
  return labels.map(() => Math.floor(Math.random() * 500));
};

export const options = {
  plugins: {
    legend: {
      display: false, // Set to false to hide the legend
    },
  },
  responsive: true,
  tension: 0.3, // 2. Set the tension (curvature) of the line to your liking.  (You may want to lower this a smidge.)
  scales: {
    y: {
      border: {
        dash: [2, 4],
      },
    },
  },
};

export const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: generateRandomData(),
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 0, 0)',
      fill: {
        target: 'origin', // Set the fill options
        above: 'rgba(255, 0, 0, 0.3)',
      },
    },
    {
      label: 'Dataset 2',
      data: generateRandomData(),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.3)',
      fill: 'origin', // Set the fill options
    },
  ],
};

export function AreaChart() {
  return (
    <div className='w-full bg-white-900 rounded-sm p-9 shadow-lg mb-9'>
      <div className='flex flex-col mb-14'>
        <span className='text-xl font-normal text-gray-300'>Doanh thu</span>
        <div className='text-sm font-bold text-green-900 flex items-baseline'>
          <div className='font-bold text-3xl text-black-800 mr-1'>$12.7k</div>
          (+1.3 %) &nbsp;
          <span className='uppercase text-gray-300 font-normal'>so với tháng trước</span>
        </div>
      </div>
      <Line options={options} data={data} className='!h-[521px] !w-full' />
    </div>
  );
}
