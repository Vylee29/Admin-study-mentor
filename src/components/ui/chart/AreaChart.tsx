import { useQuery } from '@tanstack/react-query';
import { Select } from 'antd';
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
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { SHORT_DATE_FORMAT } from '../../../+core/constants/commons.constant';
import { getChartRevenueApi, getChartRevenueKeys } from '../../../+core/services/user.service';

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

export function AreaChart({ optionsChart }: { optionsChart: { value: number; label: string }[] }) {
  const [option, setOption] = useState(optionsChart[0].value);
  const [labels, setLabels] = useState<string[]>([]);
  const [revenues, setRevenues] = useState<number[]>([]);
  const [sum, setSum] = useState<number>(0);

  const getChartRevenueQuery = useQuery({
    queryKey: getChartRevenueKeys.list({ option }),
    queryFn: () => getChartRevenueApi(option),
  });

  const handleChangeFilterChart = (value: any) => {
    setOption(value);
  };

  useEffect(() => {
    if (getChartRevenueQuery?.data?.data?.data) {
      const data = getChartRevenueQuery.data.data.data.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
      );

      setLabels(data.map((item) => format(new Date(item.date), SHORT_DATE_FORMAT)));
      setRevenues(data.map((item) => item.totalCost));
      setSum(data.reduce((acc, item) => acc + item.totalCost, 0));
    }
  }, [getChartRevenueQuery?.data?.data?.data]);

  const data = {
    labels,
    datasets: [
      {
        label: 'Chart Revenue',
        data: revenues,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 0, 0)',
        fill: {
          target: 'origin', // Set the fill options
          above: 'rgba(255, 0, 0, 0.3)',
        },
      },
    ],
  };
  return (
    <div className='w-full bg-white-900 rounded-sm p-9 pt-0 shadow-lg mb-4'>
      <div className='flex flex-col px-4 pt-0 pb-2'>
        <span className='text-lg font-bold text-black-500'>
          Tổng doanh thu = <span className='font-bold text-2xl'>{sum}</span> đồng
        </span>
        <span className='italic text-gray-300 font-semibold'>
          (Doanh thu = Tổng của 10% * số tiền mỗi câu hỏi có trạng thái là &quot;Đã hoàn thành
          &quot;)
        </span>
        <div className='w-full flex justify-end'>
          <Select
            options={optionsChart}
            className='w-[200px]'
            value={option}
            onChange={handleChangeFilterChart}
          />
        </div>
      </div>
      <Line options={options} data={data} className='!w-full' />
    </div>
  );
}
