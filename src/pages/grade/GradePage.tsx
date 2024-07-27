import { SearchOutlined } from '@ant-design/icons';
import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query';
import { Button, Table } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePagingFilter } from '../../+core/hooks/usePagingFilter';
import { deleteGrade, getGradeListApi, gradeListKeys } from '../../+core/services/level.service';
import { handleError } from '../../+core/utilities/failure-handler.utitlity';
import { toastSuccess } from '../../+core/utilities/toast.utility';
import ConfirmModal from '../../components/ui/button/ConfirmationModal';
import { CustomTextInput } from '../../components/ui/form/CustomTextInput';
import { MY_ROUTE } from '../../routes/route.constant';
import Columns, { GradeTable } from './components/columns';

type Props = {
  levelId: string;
};

export function GradesPage({ levelId }: Props) {
  // Hooks
  const navigate = useNavigate();

  // const { initialPaging } = useMemo(() => {
  //   const initialPaging: IPaginationInfo = {
  //     pageSize: +(searchParams.get('pageSize') || initialPagingState.pageSize),
  //     page: +(searchParams.get('page') || initialPagingState.page),
  //   };
  //   return { initialPaging };
  // }, [searchParams]);

  const { filter } = usePagingFilter({
    // initialPaging,
    debounceTime: 500,
  });

  //State
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedGradeId, setSelectedGradeId] = useState('');

  //Api
  const gradeListQuery = useQuery({
    queryKey: gradeListKeys.list({ ...filter, levelId }),
    queryFn: () => getGradeListApi(filter, levelId),
    select: (resp) => {
      return resp.data.data.map((item) => ({
        key: item.id,
        name: item.gradeName,
      }));
    },
    placeholderData: keepPreviousData,
  });

  const deleteVourcherMutation = useMutation({
    mutationFn: () => deleteGrade(selectedGradeId),
    onSuccess: () => {
      setSelectedGradeId('');
      setIsOpenModal(false);
      toastSuccess('Đã xóa mã cấp học thành công');
    },
    onError: handleError,
    onSettled: () => {
      gradeListQuery.refetch();
    },
  });

  //Hanlers
  const handleDeleteGrade = (level: GradeTable) => {
    setSelectedGradeId(level.key);
    setIsOpenModal(true);
  };

  const handleOKDelete = () => {
    deleteVourcherMutation.mutate();
  };

  return (
    <div className='px-4'>
      <span className='text-[24px] font-bold text-black-800'>Lớp học</span>
      <div className='flex items-center justify-between pb-10'>
        <div className='text-[16px] text-gray-500 '>Quản lý lớp học của bạn</div>
        <Button
          type='primary'
          className='!h-10'
          onClick={() => {
            navigate(MY_ROUTE.GRADE.CREATE_LEVEL(levelId));
          }}
        >
          Thêm lớp học
        </Button>
      </div>
      <div className='flex justify-between w-full'>
        <CustomTextInput
          placeholder='Search'
          prefix={<SearchOutlined />}
          classNameForm='w-2/5 mb-3'
        />
      </div>
      <div className='flex flex-col py-2 rounded-md bg-white-900'>
        <Table
          columns={
            Columns({
              handleDeleteLevel: handleDeleteGrade,
              levelId,
            }) as any
          }
          dataSource={gradeListQuery.data || []}
          loading={gradeListQuery.isFetching}
          pagination={false}
        />
        {/* <PaginationCore
          current={levelListQuery.data?.pagination.page || 1}
          pageSize={levelListQuery.data?.pagination.pageSize || 10}
          total={levelListQuery.data?.pagination.total || 0}
          onPageNumberChange={handlePageChange}
        /> */}
      </div>
      <ConfirmModal
        open={isOpenModal}
        handleCancel={() => {
          setIsOpenModal(false);
          setSelectedGradeId('');
        }}
        handleOk={handleOKDelete}
        isLoadingBtn={deleteVourcherMutation.isPending}
      >
        Bạn có chắc chắn muốn xóa mã khuyến mãi này?
      </ConfirmModal>
    </div>
  );
}
