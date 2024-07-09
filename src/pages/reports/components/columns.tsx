import { ColumnsType } from 'antd/es/table';
import { format } from 'date-fns';
import { DATE_FORMAT } from '../../../+core/constants/commons.constant';
import { ACTION_TITLE } from '../../../+core/constants/shared.contant';
import { ReportTable } from '../../../+core/models/report.model';

export const columns: ColumnsType<ReportTable> = [
  {
    title: 'Tiêu đề câu hỏi',
    dataIndex: 'questionTitle',
    render: (value) => <div className='flex flex-col text-sm font-normal'>{value}</div>,
  },
  {
    title: 'Người báo cáo',
    dataIndex: 'fullName',
    render: (value) => <div className='flex flex-col text-sm font-normal'>{value}</div>,
  },
  {
    title: 'Ngày báo cáo',
    dataIndex: 'createdAt',
    render: (value) => (
      <div className='flex flex-col text-sm font-normal'>{format(value, DATE_FORMAT)}</div>
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
    title: 'Trạng thái phản hổi',
    dataIndex: 'hasFeedback',
    render: (value) =>
      value ? (
        <div className='text-[#28A745] font-semibold'>Đã xong</div>
      ) : (
        <div className='text-[#F63F3F] font-semibold '>Chưa phản hồi</div>
      ),
  },
  {
    title: ACTION_TITLE,
    dataIndex: 'action',
  },
];
