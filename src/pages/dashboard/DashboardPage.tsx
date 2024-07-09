import { AreaChart } from '../../components/ui/chart/AreaChart';

function DashboardPage() {
  const optionsChart = [
    { value: 7, label: '7 ngày gần nhất' },
    { value: 30, label: '30 ngày gần nhất' },
    { value: 90, label: '90 ngày gần nhất' },
    { value: 365, label: '365 ngày gần nhất' },
  ];
  return (
    <div className='w-full'>
      <AreaChart optionsChart={optionsChart} />
    </div>
  );
}

export default DashboardPage;
