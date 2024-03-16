import { Line } from 'react-chartjs-2';
import ArrowIcon from '../../../assets/icons/arrow';

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'Dataset 1',
      data: [65, 59, 80, 81, 56, 55, 40],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
    },
  ],
};

const options = {
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

function LineChart() {
  return (
    <div className='rounded-md shadow-lg max-w-[332px] p-8'>
      <h4 className='text-base text-gray-300'>Thống kê</h4>
      <div className='font-bold text-base'>Tổng doanh thu hiện tại</div>
      <div className='flex items-center mt-2 gap-1'>
        <div>
          <div className='font-bold text-[44px]'>325k</div>
          <div className='flex items-center'>
            <div className='text-green-500 mr-[2px]'>+ 18.34 %</div>
            <ArrowIcon color='#04CE00' />
          </div>
        </div>
        <Line data={data} options={options} className='!h-[120px] !w-[145px]' />
      </div>
    </div>
  );
}

export default LineChart;
