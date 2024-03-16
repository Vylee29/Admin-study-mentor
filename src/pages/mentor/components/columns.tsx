import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Avatar, Image } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { Link } from 'react-router-dom';
import { MentorTable } from '../MentorPage';

export const columns: ColumnsType<MentorTable> = [
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
    title: 'Status',
    dataIndex: 'status',
    render: (value) =>
      value ? (
        <div className='text-[#0064FF]'>Free</div>
      ) : (
        <div className='text-green-700'>Paid</div>
      ),
  },
  {
    title: 'Qualification',
    render: () => (
      <Link to='/mentor/qualification' className='text-[#0064FF] underline'>
        Download File
      </Link>
    ),
  },
  {
    title: 'Major',
    dataIndex: 'major',
    render: (value) => <div className='text-[#0064FF]'>{value}</div>,
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

export const mockData: MentorTable[] = [
  {
    key: '1',
    image: 'https://via.placeholder.com/150',
    name: 'Mark Wilson',
    email: 'mark@simmmple.com',
    status: true,
    major: 'IT',
  },
  {
    key: '2',
    image: 'https://via.placeholder.com/150',
    name: 'Mark Wilson',
    email: 'mark@simmmple.com',
    status: false,
    major: 'IT',
  },
  {
    key: '3',
    image: 'https://via.placeholder.com/150',
    name: 'Mark Wilson',
    email: 'mark@simmmple.com',
    status: true,
    major: 'IT',
  },
];
