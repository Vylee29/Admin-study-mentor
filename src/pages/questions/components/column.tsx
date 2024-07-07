import { ColumnsType } from 'antd/es/table';
import { format } from 'date-fns';
import { DATE_FORMAT } from '../../../+core/constants/commons.constant';
import { ACTION_TITLE } from '../../../+core/constants/shared.contant';
import { GetQuestionResponseModel } from '../../../+core/models/question.model';
import { getQuestionStatus } from '../../../+core/utilities/question.utility';

export const columns: ColumnsType<GetQuestionResponseModel> = [
  {
    title: 'Tiêu đề câu hỏi',
    dataIndex: 'title',
    render: (value) => {
      return <div className='flex flex-col text-sm font-normal'>{value}</div>;
    },
  },
  {
    title: 'Tên học viên',
    dataIndex: 'studentName',
    render: (_, record) => (
      <div className='flex flex-col text-sm font-normal'>{record?.student?.fullName}</div>
    ),
  },
  {
    title: 'Tên người hướng dẫn',
    dataIndex: 'tutorName',
    render: (_, record) => (
      <div className='flex flex-col text-sm font-normal'>{record?.tutor?.fullName}</div>
    ),
  },
  {
    title: 'Thời gian tạo câu hỏi',
    dataIndex: 'createdAt',
    render: (_, record) => (
      <div className='flex flex-col text-sm font-normal'>
        {format(record?.createdAt, DATE_FORMAT)}
      </div>
    ),
  },
  {
    title: 'Thời gian trả lời',
    dataIndex: 'createdAt',
    render: (_, record) => (
      <div className='flex flex-col text-sm font-normal'>
        {format(record?.answerTime, DATE_FORMAT)}
      </div>
    ),
  },
  {
    title: 'Trạng thái',
    dataIndex: 'status',
    render: (_, record) => (
      <div className='flex flex-col text-sm font-normal'>{getQuestionStatus(record.status)}</div>
    ),
  },
  {
    title: ACTION_TITLE,
    dataIndex: 'action',
  },
];
