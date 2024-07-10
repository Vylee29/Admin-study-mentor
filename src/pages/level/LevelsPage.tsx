import { SearchOutlined } from '@ant-design/icons';
import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query';
import { Button, Table } from 'antd';
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { usePagingFilter } from '../../+core/hooks/usePagingFilter';
import { deleteLevel, getLevelListApi, levelListKeys } from '../../+core/services/level.service';
import { handleError } from '../../+core/utilities/failure-handler.utitlity';
import { toastSuccess } from '../../+core/utilities/toast.utility';
import ConfirmModal from '../../components/ui/button/ConfirmationModal';
import { CustomTextInput } from '../../components/ui/form/CustomTextInput';
import { MY_ROUTE } from '../../routes/route.constant';
import Columns, { LevelTable } from './components/columns';

export function LevelsPage() {
  // Hooks
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

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
  const [selectedLevelId, setSelectedLevelId] = useState('');

  //Api
  const levelListQuery = useQuery({
    queryKey: levelListKeys.list(filter),
    queryFn: () => getLevelListApi(filter),
    select: (resp) => {
      return resp.data.data.map((item) => ({
        key: item.id,
        name: item.levelName,
        description: item.description,
      }));
    },
    placeholderData: keepPreviousData,
  });

  const deleteVourcherMutation = useMutation({
    mutationFn: () => deleteLevel(selectedLevelId),
    onSuccess: () => {
      setSelectedLevelId('');
      setIsOpenModal(false);
      toastSuccess('Đã xóa mã cấp học thành công');
    },
    onError: handleError,
    onSettled: () => {
      levelListQuery.refetch();
    },
  });

  //Hanlers
  const handleDeleteLevel = (level: LevelTable) => {
    setSelectedLevelId(level.key);
    setIsOpenModal(true);
  };

  const handleOKDelete = () => {
    deleteVourcherMutation.mutate();
  };

  return (
    <div className='px-4'>
      <span className='text-[24px] font-bold text-black-800'>Cấp học</span>
      <div className='flex items-center justify-between pb-10'>
        <div className='text-[16px] text-gray-500 '>Quản lý cấp học của bạn</div>
        <Button
          type='primary'
          className='!h-10'
          onClick={() => {
            navigate(MY_ROUTE.LEVEL.CREATE);
          }}
        >
          Thêm cấp học
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
              handleDeleteLevel: handleDeleteLevel,
            }) as any
          }
          dataSource={levelListQuery.data || []}
          loading={levelListQuery.isFetching}
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
          setSelectedLevelId('');
        }}
        handleOk={handleOKDelete}
        isLoadingBtn={deleteVourcherMutation.isPending}
      >
        Bạn có chắc chắn muốn xóa mã khuyến mãi này?
      </ConfirmModal>
    </div>
  );
}
