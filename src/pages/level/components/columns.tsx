import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useNavigate } from 'react-router-dom';
import { MY_ROUTE } from '../../../routes/route.constant';

export type LevelTable = {
  key: string;
  name: string;
  description: string;
};

export default function Columns({
  handleDeleteLevel,
}: {
  handleDeleteLevel: (level: LevelTable) => void;
}): ColumnsType<LevelTable> {
  const navigate = useNavigate();
  return [
    {
      title: 'ID',
      dataIndex: 'key',
      render: (_, __, index) => {
        return (
          <div className='flex items-center gap-4'>
            <span className='text-sm text-black-800'>{index + 1}</span>
          </div>
        );
      },
    },
    {
      title: 'Tên',
      dataIndex: 'name',
      render: (value) => <div className='flex flex-col text-sm font-bold'>{value}</div>,
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      render: (value) => <div className='text-[#0064FF] font-semibold'>{value}</div>,
    },
    {
      title: 'Tùy chọn',
      dataIndex: 'key',
      render: (_, record) => (
        <div className='flex items-center w-full h-full gap-4'>
          <Tooltip placement='top' title='Chỉnh sửa'>
            <Button
              type='primary'
              icon={<EditOutlined />}
              onClick={() => navigate(MY_ROUTE.LEVEL.DETAIL(record.key))}
            />
          </Tooltip>
          <Tooltip placement='top' title='Xóa'>
            <Button
              type='primary'
              className='bg-red-600 hover:!bg-red-500'
              icon={<DeleteOutlined />}
              onClick={() => {
                handleDeleteLevel(record);
              }}
            />
          </Tooltip>
        </div>
      ),
    },
  ];
}
