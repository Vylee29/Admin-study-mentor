import { AreaChart } from '../../components/ui/chart/AreaChart';
import LineChart from '../../components/ui/chart/LineChart';

function DashboardPage() {
  return (
    <div className='w-full'>
      <AreaChart />
      <div className='flex justify-between'>
        <LineChart />
        <LineChart />
        <LineChart />
        <LineChart />
      </div>
    </div>
  );
}

export default DashboardPage;
