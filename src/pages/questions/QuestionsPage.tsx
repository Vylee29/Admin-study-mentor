import {
  CheckCircleOutlined,
  CheckOutlined,
  EyeOutlined,
  MoneyCollectOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query';
import { Button, Modal, Table, Tooltip } from 'antd';
import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ACTION_TITLE, PAYMENT_QUESTION } from '../../+core/constants/shared.contant';
import { QuestionStatus } from '../../+core/enums/question.enum';
import { usePagingFilter } from '../../+core/hooks/usePagingFilter';
import { GetQuestionResponseModel } from '../../+core/models/question.model';
import { StudentListFilter } from '../../+core/models/student.model';
import { getQuestionListApi, questionListKeys } from '../../+core/services/question.service';
import { MarkPayReq, markPaymentTutor } from '../../+core/services/user.service';
import { IPaginationInfo, initialPagingState } from '../../+core/types/paging.type';
import { formatPriceVND } from '../../+core/utilities/caculate-price.utility';
import { handleError } from '../../+core/utilities/failure-handler.utitlity';
import { toastSuccess } from '../../+core/utilities/toast.utility';
import ButtonPrimary from '../../components/ui/button/ButtonPrimary';
import { CustomTextInput } from '../../components/ui/form/CustomTextInput';
import DetailedQuestionModal from '../../components/ui/modal/DetailedQuestionModal';
import { PaginationCore } from '../../components/ui/pagination/pagination';
import BankAccountForm from './components/BankAccountForm';
import { columns as baseColumns } from './components/column';

export function QuestionsPage() {
  const [searchParams] = useSearchParams();
  const { initialPaging, initialFilter } = useMemo(() => {
    const initialFilter: StudentListFilter & { status?: 'DONE' } = {
      search: searchParams.get('search') || '',
    };
    const initialPaging: IPaginationInfo = {
      pageSize: +(searchParams.get('pageSize') || initialPagingState.pageSize),
      page: +(searchParams.get('page') || initialPagingState.page),
    };
    return { initialPaging, initialFilter };
  }, [searchParams]);

  const { filter, handlePageChange, handleFilterChange } = usePagingFilter({
    initialPaging,
    initialFilter,
    debounceTime: 500,
  });
  const [visible, setVisible] = useState(false);
  const [visiblePayment, setVisiblePayment] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<GetQuestionResponseModel>();

  const markPayMutation = useMutation({
    mutationFn: (body: MarkPayReq) => markPaymentTutor(body),
    onSuccess: () => {
      toastSuccess('Cập nhật trạng thái thành công');
    },
    onError: handleError,
    // onSettled: () => {
    //   levelListQuery.refetch();
    // },
  });

  const questionListQuery = useQuery({
    queryKey: questionListKeys.list(filter),
    queryFn: () => getQuestionListApi(filter as any),
    select: (resp) => {
      return {
        pagination: resp.data.paginationInfo,
        data: resp.data.data,
      };
    },
    placeholderData: keepPreviousData,
  });

  const handleViewDetail = (question: GetQuestionResponseModel, type: boolean = true) => {
    setSelectedQuestion(question);
    if (type) setVisible(true);
    else setVisiblePayment(true);
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
      if (col.title === PAYMENT_QUESTION) {
        return {
          ...col,
          render: (value: any, record: GetQuestionResponseModel) =>
            record.status === QuestionStatus.DONE ? (
              <div className='flex gap-2'>
                <Tooltip placement='top' title='Thông tin tài khoản ngân hàng'>
                  <Button
                    type='primary'
                    icon={<MoneyCollectOutlined />}
                    onClick={() => handleViewDetail(record, false)}
                  />
                </Tooltip>

                {record.isPaid ? (
                  <Tooltip placement='top' title={`Đã thanh toán`}>
                    <Button
                      type='primary'
                      icon={<CheckCircleOutlined />}
                      className='!bg-green-500'
                    />
                  </Tooltip>
                ) : (
                  <Tooltip
                    placement='top'
                    title={`Thanh toán - ${formatPriceVND(record.amountDue)}`}
                  >
                    <Button
                      type='primary'
                      icon={<CheckOutlined />}
                      className='!bg-orange-400'
                      onClick={() =>
                        markPayMutation.mutate({
                          questionId: record.questionId,
                          tutorId: record.tutor?.id || '',
                        })
                      }
                    />
                  </Tooltip>
                )}
              </div>
            ) : (
              <></>
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
      <Modal
        open={visiblePayment}
        onCancel={() => {
          setVisiblePayment(false);
        }}
        closeIcon={true}
        className='!w-2/3'
        footer={null}
      >
        <BankAccountForm
          idOfBanking={selectedQuestion?.tutor?.idOfBanking}
          nameOfBanking={selectedQuestion?.tutor?.nameOfBanking}
          numberOfBanking={selectedQuestion?.tutor?.numberOfBanking}
          nameUserOfBanking={selectedQuestion?.tutor?.nameUserOfBanking}
          money={selectedQuestion?.amountDue}
        />
      </Modal>
      <span className='text-[24px] font-bold text-black-800'>Câu hỏi</span>
      <div className='text-[16px] text-gray-500 pb-6'>
        {questionListQuery.data?.pagination?.total} kết quả tìm thấy
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
        <ButtonPrimary
          title={filter.status === 'DONE' ? 'Tất cả câu hỏi' : 'Câu hỏi cần thanh toán'}
          onClick={() => {
            handleFilterChange({ status: filter.status === 'DONE' ? undefined : 'DONE' });
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
