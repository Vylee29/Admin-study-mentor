import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Avatar, Image } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { ReportTable } from '../ReportsPage';

export const columns: ColumnsType<ReportTable> = [
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
    title: 'Title of Report',
    dataIndex: 'title',
    render: (value) => <div className='flex flex-col text-sm font-normal'>{value}</div>,
  },
  {
    title: 'Status',
    dataIndex: 'status',
    render: (value) => {
      if (value === 0) {
        return <div className='text-[#FF0000]'>Chưa xử lý</div>;
      } else if (value === 1) {
        return <div className='text-[#FF8A00]'>Đang xử lý</div>;
      } else {
        return <div className='text-[#0064FF]'>Đã xử lý</div>;
      }
    },
  },
  {
    title: 'Role',
    dataIndex: 'role',
    render: (value) => <div className='flex flex-col text-sm font-normal'>{value}</div>,
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

export const mockData: ReportTable[] = [
  {
    key: '1',
    image: 'https://via.placeholder.com/150',
    name: 'Mark Wilson',
    title: 'NHD tôi không meeting',
    status: 0,
    role: 'Student',
  },
  {
    key: '2',
    image: 'https://via.placeholder.com/150',
    name: 'Mark Wilson',
    title: 'NHD tôi không meeting',
    status: 1,
    role: 'Student',
  },
  {
    key: '3',
    image: 'https://via.placeholder.com/150',
    name: 'Mark Wilson',
    title: 'NHD tôi không meeting',
    status: 2,
    role: 'Student',
  },
];
