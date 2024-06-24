import { ColumnsType } from 'antd/es/table';
import { Link } from 'react-router-dom';
import { FileReq } from '../../../+core/models/file.model';
import { ReportTable } from '../../../+core/models/report.model';

export const columns: ColumnsType<ReportTable> = [
  {
    title: 'Question ID',
    dataIndex: 'questionId',
    render: (value) => <div className='flex flex-col text-sm font-semibold'>{value}</div>,
  },
  {
    title: 'Question name',
    dataIndex: 'questionName',
    render: (value) => <div className='flex flex-col text-sm font-normal'>{value}</div>,
  },
  {
    title: 'Content report',
    dataIndex: 'content',
    render: (value) => <div className='flex flex-col text-sm font-bold'>{value}</div>,
  },
  {
    title: 'Reporter',
    dataIndex: 'fullName',
    render: (value) => <div className='flex flex-col text-sm font-normal'>{value}</div>,
  },
  {
    title: 'Report date',
    dataIndex: 'createdAt',
    render: (value) => <div className='flex flex-col text-sm font-normal'>{value}</div>,
  },
  {
    title: 'Attachment',
    dataIndex: 'attachFiles',
    render: (value: FileReq[]) => (
      <div className='flex flex-col text-sm font-normal'>
        {Array.isArray(value) && value.length > 0 ? (
          value.map((item, index) => (
            <Link key={index} to={`${item.fileKey}`} className='text-[#0064FF] underline'>
              {item.fileName}
            </Link>
          ))
        ) : (
          <span>No attachments</span>
        )}
      </div>
    ),
  },
  {
    title: 'Respond status',
    dataIndex: 'hasFeedback',
    render: (value) =>
      value == true ? (
        <div className='text-[#28A745] font-semibold'>Done</div>
      ) : (
        <div className='text-[#F63F3F] font-semibold '>Not yet</div>
      ),
  },
  // {
  //   render: () => (
  //     <div className='flex gap-[15px]'>
  //       <EditOutlined />
  //       <DeleteOutlined />
  //     </div>
  //   ),
  // },
];
