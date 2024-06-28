import { Avatar, Image } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { UserResp } from '../../../+core/models/profile.model';
import { imageUtility } from '../../../+core/utilities/image.utility';

export const columns: ColumnsType<UserResp> = [
  {
    title: 'Tên học viên',
    dataIndex: 'fullName',
    render: (value, record) => {
      return (
        <div className='flex items-center gap-4'>
          <div className='w-[44px] h-[44px]'>
            <Avatar
              size={44}
              key={record.avatar?.fileKey}
              icon={
                <Image
                  alt={'image of question'}
                  loading='lazy'
                  src={imageUtility(record.avatar?.fileKey)}
                />
              }
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
    title: 'Trạng thái',
    dataIndex: 'status',
    render: (value) =>
      value === 0 ? (
        <div className='text-[#28A745]'>Active</div>
      ) : (
        <div className='text-[#F63F3F]'>Inactive</div>
      ),
  },
  {
    title: 'Hành động',
    dataIndex: 'action',
  },
];
