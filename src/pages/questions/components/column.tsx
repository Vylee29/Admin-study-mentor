import { ColumnsType } from 'antd/es/table';
import { format } from 'date-fns';
import { DATE_FORMAT } from '../../../+core/constants/commons.constant';
import { QuestionStatus } from '../../../+core/enums/question.enum';
import { GetQuestionResponseModel } from '../../../+core/models/question.model';

const getQuestionStatus = (status: number) => {
  switch (status) {
    case QuestionStatus.NEW:
      return 'New';
    case QuestionStatus.ACCEPTED:
      return 'Accepted';
    case QuestionStatus.DONE:
      return 'Done';
    case QuestionStatus.REJECTED:
      return 'Rejected';
    case QuestionStatus.EXPIRED:
      return 'Expired';
    default:
      return '-';
  }
};

export const columns: ColumnsType<GetQuestionResponseModel> = [
  {
    title: 'Title',
    dataIndex: 'title',
    render: (value) => {
      return <div className='flex flex-col text-sm font-normal'>{value}</div>;
    },
  },
  {
    title: 'Ten hoc vien',
    dataIndex: 'studentName',
    render: (_, record) => (
      <div className='flex flex-col text-sm font-normal'>{record?.student?.fullName}</div>
    ),
  },
  {
    title: 'Ten nguoi huong dan',
    dataIndex: 'tutorName',
    render: (_, record) => (
      <div className='flex flex-col text-sm font-normal'>{record?.tutor?.fullName}</div>
    ),
  },
  {
    title: 'Thoi gian tao cau hoi',
    dataIndex: 'createdAt',
    render: (_, record) => (
      <div className='flex flex-col text-sm font-normal'>
        {format(record?.createdAt, DATE_FORMAT)}
      </div>
    ),
  },
  {
    title: 'Thoi gian tra loi',
    dataIndex: 'createdAt',
    render: (_, record) => (
      <div className='flex flex-col text-sm font-normal'>
        {format(record?.answerTime, DATE_FORMAT)}
      </div>
    ),
  },
  {
    title: 'Status',
    dataIndex: 'status',
    render: (_, record) => (
      <div className='flex flex-col text-sm font-normal'>{getQuestionStatus(record.status)}</div>
    ),
  },
  {
    title: 'Action',
    dataIndex: 'action',
  },
];
