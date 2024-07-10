import { SearchOutlined } from '@ant-design/icons';
import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query';
import { Button, Table } from 'antd';
import { useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { usePagingFilter } from '../../+core/hooks/usePagingFilter';
import { StudentListFilter } from '../../+core/models/student.model';
import { VoucherTable } from '../../+core/models/voucher.model';
import {
  convertVoucherListModelToTable,
  deleteVoucher,
  getVoucherListApi,
  voucherListKeys,
} from '../../+core/services/user.service';
import { IPaginationInfo, initialPagingState } from '../../+core/types/paging.type';
import { handleError } from '../../+core/utilities/failure-handler.utitlity';
import { toastSuccess } from '../../+core/utilities/toast.utility';
import ConfirmModal from '../../components/ui/button/ConfirmationModal';
import { CustomTextInput } from '../../components/ui/form/CustomTextInput';
import { PaginationCore } from '../../components/ui/pagination/pagination';
import Columns from './components/columns';

export function VouchersPage() {
  // Hooks
  const navigate = useNavigate();
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

  const { filter, handlePageChange, handleFilterChange } = usePagingFilter({
    initialPaging,
    initialFilter,
    debounceTime: 500,
  });

  //State
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedVoucherId, setSelectedVoucherId] = useState('');

  //Api
  const voucherListQuery = useQuery({
    queryKey: voucherListKeys.list(filter),
    queryFn: () => getVoucherListApi(filter),
    select: (resp) => {
      return {
        pagination: resp.data.paginationInfo,
        data: resp.data.data.map(convertVoucherListModelToTable),
      };
    },
    placeholderData: keepPreviousData,
  });

  const deleteVourcherMutation = useMutation({
    mutationFn: () => deleteVoucher(selectedVoucherId),
    onSuccess: () => {
      setSelectedVoucherId('');
      setIsOpenModal(false);
      toastSuccess('Đã xóa mã khuyến mãi');
    },
    onError: handleError,
    onSettled: () => {
      voucherListQuery.refetch();
    },
  });

  //Hanlers
  const handleDeleteVoucher = (voucher: VoucherTable) => {
    setSelectedVoucherId(voucher.key);
    setIsOpenModal(true);
  };

  const handleOKDelete = () => {
    deleteVourcherMutation.mutate();
  };

  return (
    <div className='px-4'>
      <span className='text-[24px] font-bold text-black-800'>Mã giảm giá</span>
      <div className='flex items-center justify-between pb-10'>
        <div className='text-[16px] text-gray-500 '>Manage your vouchers</div>
        <Button
          type='primary'
          className='!h-10'
          onClick={() => {
            navigate('/vouchers/create');
          }}
        >
          Thêm khuyến mãi
        </Button>
      </div>
      <div className='flex justify-between w-full'>
        <CustomTextInput
          placeholder='Search'
          prefix={<SearchOutlined />}
          onChange={(e: any) => {
            handleFilterChange({ search: e.target.value });
          }}
          classNameForm='w-2/5 mb-3'
        />
      </div>
      <div className='flex flex-col py-2 rounded-md bg-white-900'>
        <Table
          columns={Columns({
            handleDeleteVoucher: handleDeleteVoucher,
            filter,
            handleFilterChange,
          })}
          dataSource={voucherListQuery.data?.data || []}
          loading={voucherListQuery.isFetching}
          pagination={false}
        />
        <PaginationCore
          current={voucherListQuery.data?.pagination.page || 1}
          pageSize={voucherListQuery.data?.pagination.pageSize || 10}
          total={voucherListQuery.data?.pagination.total || 0}
          onPageNumberChange={handlePageChange}
        />
      </div>
      <ConfirmModal
        open={isOpenModal}
        handleCancel={() => {
          setIsOpenModal(false);
          setSelectedVoucherId('');
        }}
        handleOk={handleOKDelete}
        isLoadingBtn={deleteVourcherMutation.isPending}
      >
        Bạn có chắc chắn muốn xóa mã khuyến mãi này?
      </ConfirmModal>
    </div>
  );
}
