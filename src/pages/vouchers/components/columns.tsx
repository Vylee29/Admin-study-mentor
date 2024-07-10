import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useNavigate } from 'react-router-dom';
import { VoucherTable } from '../../../+core/models/voucher.model';
export default function Columns({
  handleDeleteVoucher,
}: {
  handleDeleteVoucher: (voucher: VoucherTable) => void;
}): ColumnsType<VoucherTable> {
  const navigate = useNavigate();
  return [
    {
      title: 'ID',
      dataIndex: 'voucherId',
      render: (_, __, index) => {
        return (
          <div className='flex items-center gap-4'>
            <span className='text-sm text-black-800'>{index + 1}</span>
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
    {
      title: 'Tùy chọn',
      dataIndex: 'key',
      render: (_, record) => (
        <div className='w-full h-full flex items-center gap-4'>
          <Tooltip placement='top' title='Chỉnh sửa'>
            <Button
              type='primary'
              icon={<EditOutlined />}
              onClick={() => navigate(`/vouchers/${record.key}`)}
            />
          </Tooltip>
          <Tooltip placement='top' title='Xóa'>
            <Button
              type='primary'
              className='bg-red-600 hover:!bg-red-500'
              icon={<DeleteOutlined />}
              onClick={() => {
                handleDeleteVoucher(record);
              }}
            />
          </Tooltip>
        </div>
      ),
    },
  ];
}
