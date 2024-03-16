import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Avatar, Image } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { StudentTable } from '../StudentPage';

export const columns: ColumnsType<StudentTable> = [
  {
    title: 'Name',
    dataIndex: 'name',
    render: (value, record) => {
      return (
        <div className='flex items-center gap-4'>
          <div className='w-[44px] h-[44px]'>
            <Avatar
              size={44}
              icon={<Image alt={'image of question'} loading='lazy' src={record.image} />}
            />
          </div>
          <span className='text-sm font-bold text-black-800'>{value}</span>
        </div>
      );
    },
  },
  {
    title: 'Email',
    dataIndex: 'email',
    render: (value) => <div className='flex flex-col text-sm font-normal'>{value}</div>,
  },
  {
    title: 'Used Service',
    dataIndex: 'used',
    render: (value) =>
      value ? (
        <div className='text-[#0064FF]'>Yes</div>
      ) : (
        <div className='text-[#F63F3F]'>Not yet</div>
      ),
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

export const mockData: StudentTable[] = [
  {
    key: '1',
    image: 'https://via.placeholder.com/150',
    name: 'Mark Wilson',
    email: 'mark@simmmple.com',
    used: true,
  },
  {
    key: '2',
    image: 'https://via.placeholder.com/150',
    name: 'Mark Wilson',
    email: 'mark@simmmple.com',
    used: false,
  },
  {
    key: '3',
    image: 'https://via.placeholder.com/150',
    name: 'Mark Wilson',
    email: 'mark@simmmple.com',
    used: true,
  },
];
