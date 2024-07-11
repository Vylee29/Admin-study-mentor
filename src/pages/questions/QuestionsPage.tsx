import { EyeOutlined, SearchOutlined } from '@ant-design/icons';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { Button, Table, Tooltip } from 'antd';
import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ACTION_TITLE } from '../../+core/constants/shared.contant';
import { usePagingFilter } from '../../+core/hooks/usePagingFilter';
import { GetQuestionResponseModel } from '../../+core/models/question.model';
import { StudentListFilter } from '../../+core/models/student.model';
import { getQuestionListApi, questionListKeys } from '../../+core/services/question.service';
import { IPaginationInfo, initialPagingState } from '../../+core/types/paging.type';
import { CustomTextInput } from '../../components/ui/form/CustomTextInput';
import DetailedQuestionModal from '../../components/ui/modal/DetailedQuestionModal';
import { PaginationCore } from '../../components/ui/pagination/pagination';
import { columns as baseColumns } from './components/column';

export function QuestionsPage() {
  const [searchParams] = useSearchParams();
  const { initialPaging, initialFilter } = useMemo(() => {
    const initialFilter: StudentListFilter = {
      search: searchParams.get('search') || '',
    };
    const initialPaging: IPaginationInfo = {
      pageSize: +(searchParams.get('pageSize') || initialPagingState.pageSize),
      page: +(searchParams.get('page') || initialPagingState.page),
    };
    return { initialPaging, initialFilter };
  }, [searchParams]);

  const { filter, handlePageChange, handleFilterChange } = usePagingFilter<StudentListFilter>({
    initialPaging,
    initialFilter,
    debounceTime: 500,
  });
  const [visible, setVisible] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<GetQuestionResponseModel>();

  const questionListQuery = useQuery({
    queryKey: questionListKeys.list(filter),
    queryFn: () => getQuestionListApi(filter),
    select: (resp) => {
      return {
        pagination: resp.data.paginationInfo,
        data: resp.data.data,
      };
    },
    placeholderData: keepPreviousData,
  });

  const handleViewDetail = (question: GetQuestionResponseModel) => {
    setSelectedQuestion(question);
    setVisible(true);
  };

  // Update the columns with action handlers
  const columns = useMemo(() => {
    return baseColumns(filter, handleFilterChange).map((col) => {
      if (col.title === ACTION_TITLE) {
        return {
          ...col,
          render: (value: any, record: GetQuestionResponseModel) => (
            <Tooltip placement='top' title='Xem chi tiết'>
              <Button
                type='primary'
                icon={<EyeOutlined />}
                onClick={() => handleViewDetail(record)}
              />
            </Tooltip>
          ),
        };
      }
      return col;
    });
  }, [handleViewDetail, filter, handleFilterChange]);

  return (
    <div>
      <DetailedQuestionModal
        setVisible={setVisible}
        title='Chi tiết câu hỏi'
        visible={visible}
        questionId={selectedQuestion?.questionId}
        status={selectedQuestion?.status}
      />
      <span className='text-[24px] font-bold text-black-800'>Questions</span>
      <div className='text-[16px] text-gray-500 pb-6'>
        {questionListQuery.data?.data.length} kết quả tìm thấy
      </div>
      <div className='flex justify-between w-full'>
        <CustomTextInput
          placeholder='Search'
          prefix={<SearchOutlined />}
          classNameForm='w-3/5 mb-3'
          onChange={(e: any) => {
            handleFilterChange({ search: e.target.value });
          }}
        />
      </div>
      <div className='flex flex-col py-8 rounded-md bg-white-900'>
        <Table
          columns={columns}
          dataSource={questionListQuery.data?.data || []}
          rowKey={(question) => question.questionId}
          loading={questionListQuery.isFetching}
          pagination={false}
        />
        <PaginationCore
          current={questionListQuery.data?.pagination.page || 1}
          pageSize={questionListQuery.data?.pagination.pageSize || 10}
          total={questionListQuery.data?.pagination.total || 0}
          onPageNumberChange={handlePageChange}
        />
      </div>
    </div>
  );
}
