import { Avatar, Image } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { TutorTable } from '../../../+core/models/tutor.model';
import { imageUtility } from '../../../+core/utilities/image.utility';

export const columns: ColumnsType<TutorTable> = [
  {
    title: 'Tên người hướng dẫn',
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
      value == 0 ? (
        <div className='text-[#28A745]'>Active</div>
      ) : (
        <div className='text-[#F63F3F]'>Inactive</div>
      ),
  },
  // {
  //   title: 'Certificate',
  //   dataIndex: 'certificate',
  //   render: (value: IFileAttachment[]) => (
  //     <div className='flex flex-col text-sm font-normal'>
  //       {Array.isArray(value) && value.length > 0 ? (
  //         value.map((item, index) => (
  //           <Link key={index} to={`${item.fileKey}`} className='text-[#0064FF] underline'>
  //             {item.fileName}
  //           </Link>
  //         ))
  //       ) : (
  //         <span>No certificates</span>
  //       )}
  //     </div>
  //   ),
  // },
  {
    title: 'Môn học',
    dataIndex: 'subject',
    render: (value) => <div className='text-[#0064FF] text-sm font-semibold'>{value}</div>,
  },
  {
    title: 'Hành động',
    dataIndex: 'action',
  },
];
