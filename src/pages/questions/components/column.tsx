import { ColumnsType } from 'antd/es/table';
import { format } from 'date-fns';
import { DATE_FORMAT } from '../../../+core/constants/commons.constant';
import { ACTION_TITLE, PAYMENT_QUESTION } from '../../../+core/constants/shared.contant';
import { GetQuestionResponseModel } from '../../../+core/models/question.model';
import { StudentListFilter } from '../../../+core/models/student.model';
import { getQuestionStatus } from '../../../+core/utilities/question.utility';

export const columns = (
  filter: StudentListFilter,
  handleFilterChange: (filter: StudentListFilter) => void,
): ColumnsType<GetQuestionResponseModel> => [
  {
    title: 'Tiêu đề câu hỏi',
    dataIndex: 'title',
    onHeaderCell: () => {
      return {
        className: 'cursor-pointer hover:!bg-gray-600',
        onClick: () => {
          handleFilterChange({
            sortDir: filter.sortBy === 'title' ? !filter.sortDir : true,
            sortBy: 'title',
          });
        },
      };
    },
    render: (value) => {
      return <div className='flex flex-col text-sm font-normal'>{value}</div>;
    },
  },
  {
    title: 'Tên học viên',
    dataIndex: 'studentName',
    onHeaderCell: () => {
      return {
        className: 'cursor-pointer hover:!bg-gray-600',
        onClick: () => {
          handleFilterChange({
            sortDir: filter.sortBy === 'studentName' ? !filter.sortDir : true,
            sortBy: 'studentName',
          });
        },
      };
    },
    render: (_, record) => (
      <div className='flex flex-col text-sm font-normal'>{record?.student?.fullName}</div>
    ),
  },
  {
    title: 'Tên người hướng dẫn',
    dataIndex: 'tutorName',
    onHeaderCell: () => {
      return {
        className: 'cursor-pointer hover:!bg-gray-600',
        onClick: () => {
          handleFilterChange({
            sortDir: filter.sortBy === 'tutorName' ? !filter.sortDir : true,
            sortBy: 'tutorName',
          });
        },
      };
    },
    render: (_, record) => (
      <div className='flex flex-col text-sm font-normal'>{record?.tutor?.fullName}</div>
    ),
  },
  {
    title: 'Thời gian tạo câu hỏi',
    dataIndex: 'createdAt',
    onHeaderCell: () => {
      return {
        className: 'cursor-pointer hover:!bg-gray-600',
        onClick: () => {
          handleFilterChange({
            sortDir: filter.sortBy === 'createdAt' ? !filter.sortDir : true,
            sortBy: 'createdAt',
          });
        },
      };
    },
    render: (_, record) => (
      <div className='flex flex-col text-sm font-normal'>
        {format(record?.createdAt, DATE_FORMAT)}
      </div>
    ),
  },
  {
    title: 'Thời gian trả lời',
    dataIndex: 'updatedAt',
    onHeaderCell: () => {
      return {
        className: 'cursor-pointer hover:!bg-gray-600',
        onClick: () => {
          handleFilterChange({
            sortDir: filter.sortBy === 'updateAte' ? !filter.sortDir : true,
            sortBy: 'updateAte',
          });
        },
      };
    },
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
  {
    title: PAYMENT_QUESTION,
    dataIndex: 'action',
  },
];
