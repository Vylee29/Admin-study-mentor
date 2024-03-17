import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/es/table';
import { VoucherTable } from '../VoucherPage';

export const columns: ColumnsType<VoucherTable> = [
  {
    title: 'ID',
    dataIndex: 'id',
    render: (value) => {
      return (
        <div className='flex items-center gap-4'>
          <span className='text-sm text-black-800'>#{value}</span>
        </div>
      );
    },
  },
  {
    title: 'Code',
    dataIndex: 'code',
    render: (value) => <div className='flex flex-col text-sm font-bold'>{value}</div>,
  },
  {
    title: 'Percentage',
    dataIndex: 'percent',
    render: (value) => <div className='text-[#0064FF] font-semibold'>{value}%</div>,
  },
  {
    title: 'Start Date',
    dataIndex: 'startDate',
    render: (value) => (
      <div className='text-[#0064FF] underline'>{value.toLocaleDateString('en-GB')}</div>
    ),
  },
  {
    title: 'End Date',
    dataIndex: 'endDate',
    render: (value) => (
      <div className='text-[#0064FF] underline'>{value.toLocaleDateString('en-GB')}</div>
    ),
  },
  {
    title: 'Quantity',
    dataIndex: 'quantity',
    render: (value) => <div className='text-sm font-normal'>{value}</div>,
  },
  {
    render: () => (
      <div className='flex gap-[15px]'>
        <EditOutlined />
        <DeleteOutlined />
      </div>
    ),
  },
];

export const mockData: VoucherTable[] = [
  {
    key: '1',
    id: 'VC001',
    code: 'CHAOHE05',
    percent: 5,
    startDate: new Date('2021-09-01'),
    endDate: new Date('2021-09-30'),
    quantity: 100,
  },
  {
    key: '2',
    id: 'VC002',
    code: 'CHAOHE10',
    percent: 10,
    startDate: new Date('2021-09-01'),
    endDate: new Date('2021-09-30'),
    quantity: 100,
  },
  {
    key: '3',
    id: 'VC003',
    code: 'CHAOHE15',
    percent: 15,
    startDate: new Date('2021-09-01'),
    endDate: new Date('2021-09-30'),
    quantity: 100,
  },
];
