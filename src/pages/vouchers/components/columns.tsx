import { DeleteOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/es/table';
import { VoucherTable } from '../../../+core/models/voucher.model';

export const columns: ColumnsType<VoucherTable> = [
  {
    title: 'ID',
    dataIndex: 'voucherId',
    render: (value) => {
      return (
        <div className='flex items-center gap-4'>
          <span className='text-sm text-black-800'>{value}</span>
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
    dataIndex: 'percentage',
    render: (value) => <div className='text-[#0064FF] font-semibold'>{value}%</div>,
  },
  // {
  //   title: 'Start Date',
  //   dataIndex: 'startDate',
  //   render: (value) => (
  //     <div className='text-[#0064FF] underline'>{value.toLocaleDateString('en-GB')}</div>
  //   ),
  // },
  // {
  //   title: 'End Date',
  //   dataIndex: 'endDate',
  //   render: (value) => (
  //     <div className='text-[#0064FF] underline'>{value.toLocaleDateString('en-GB')}</div>
  //   ),
  // },
  {
    title: 'Quantity',
    dataIndex: 'quantity',
    render: (value) => <div className='text-sm font-normal'>{value}</div>,
  },
  {
    title: 'Status',
    dataIndex: 'status',
    render: (value) =>
      value == 1 ? (
        <div className='text-[#28A745]'>Active</div>
      ) : (
        <div className='text-[#F63F3F]'>Inactive</div>
      ),
  },
];
