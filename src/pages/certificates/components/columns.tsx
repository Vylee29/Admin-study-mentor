import { ColumnsType } from 'antd/es/table';
import { ACTION_TITLE } from '../../../+core/constants/shared.contant';
import { CertificateNotApproved } from '../../../+core/models/tutor.model';

export const columns: ColumnsType<CertificateNotApproved> = [
  {
    title: 'Tên người hướng dẫn',
    dataIndex: 'fullName',
    render: (value) => <div className='flex flex-col text-sm font-normal'>{value}</div>,
  },
  {
    title: 'Email',
    dataIndex: 'email',
    render: (value) => <div className='flex flex-col text-sm font-normal'>{value}</div>,
  },
  {
    title: 'Môn học đăng ký',
    dataIndex: 'subjectIds',
    render: (_, record) => (
      <div className='flex flex-col text-sm font-normal'>
        {record.subjectIds.map((subject) => subject.name).join(', ')}
      </div>
    ),
  },
  // {
  //   title: 'File đính kèm',
  //   dataIndex: 'attachFiles',
  //   render: (value: FileReq[]) => (
  //     <div className='flex flex-col text-sm font-normal'>
  //       {Array.isArray(value) && value.length > 0 ? (
  //         value.map((item, index) => (
  //           <Link key={index} to={`${item.fileKey}`} className='text-[#0064FF] underline'>
  //             {item.fileName}
  //           </Link>
  //         ))
  //       ) : (
  //         <span>No attachments</span>
  //       )}
  //     </div>
  //   ),
  // },
  {
    title: ACTION_TITLE,
    dataIndex: 'action',
  },
];
